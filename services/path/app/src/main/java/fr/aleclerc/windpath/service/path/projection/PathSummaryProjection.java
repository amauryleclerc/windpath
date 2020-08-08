package fr.aleclerc.windpath.service.path.projection;

import fr.aleclerc.windpath.service.path.api.IPathSummaryEventStream;
import fr.aleclerc.windpath.service.path.api.PathCreatedFromGpxEvent;
import fr.aleclerc.windpath.service.path.api.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.projection.CurrentStateEvent;
import fr.aleclerc.windpath.service.path.api.projection.PathCreatedEvent;
import fr.aleclerc.windpath.service.path.api.projection.PathSummary;
import fr.aleclerc.windpath.service.path.api.projection.PathSummaryProjectionEvent;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.operators.multi.processors.BroadcastProcessor;
import net.openhft.chronicle.map.ChronicleMap;
import org.axonframework.eventhandling.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class PathSummaryProjection implements IPathSummaryEventStream {

    private final static Logger LOGGER = LoggerFactory.getLogger(PathSummaryProjection.class);
    private BroadcastProcessor<PathSummaryProjectionEvent> processor = BroadcastProcessor.create();
    private Map<ProtoUUID, PathSummary> paths = new HashMap<>();

    private Map<ProtoUUID, PathSummary> getMap() {
        if (paths == null) {
            try (ChronicleMap<ProtoUUID, PathSummary> map = createMap()) {
                paths = map;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return paths;
    }

    private ChronicleMap<ProtoUUID, PathSummary> createMap() throws IOException {
        return ChronicleMap
                .of(ProtoUUID.class, PathSummary.class)
                .name("path-summary")
                .entries(50_000)
                .averageKeySize(128)
                .averageValueSize(1_000)
                .maxBloatFactor(100)
                .keyMarshallers(new ProtoReader<>(ProtoUUID.parser()), new ProtoWriter<>())
                .valueMarshallers(new ProtoReader<>(PathSummary.parser()), new ProtoWriter<>())
                .createPersistedTo(new File("./path-summary1.db"));
    }


    @EventHandler
    public void handle(PathCreatedFromGpxEvent event) {
        LOGGER.info("PathCreatedFromGpxEvent {}", event.getName());
        final PathSummary path = PathSummary.newBuilder()
                .setId(event.getId())
                .setName(event.getName())
                .build();
        paths.put(event.getId(), path);
        processor.onNext(PathSummaryProjectionEvent.newBuilder()
                .setPathCreatedEvent(PathCreatedEvent.newBuilder()
                        .setPath(path))
                .build());
    }

    @Override
    public Multi<PathSummaryProjectionEvent> getEventStream() {
        LOGGER.info("paths size {}", paths.size());
        return Multi.createBy().concatenating().streams(
                Multi.createFrom().item(() -> PathSummaryProjectionEvent.newBuilder()
                        .setCurrentStateEvent(CurrentStateEvent.newBuilder().addAllPaths(paths.values())).build()));
    }
}
