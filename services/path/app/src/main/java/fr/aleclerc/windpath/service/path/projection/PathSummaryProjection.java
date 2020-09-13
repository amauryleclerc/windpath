package fr.aleclerc.windpath.service.path.projection;

import fr.aleclerc.windpath.service.path.api.IPathSummaryEventStream;
import fr.aleclerc.windpath.service.path.api.IPathSummaryService;
import fr.aleclerc.windpath.service.path.api.UUIDUtils;
import fr.aleclerc.windpath.service.path.api.common.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.domain.PathCreatedFromGpxEvent;
import fr.aleclerc.windpath.service.path.api.domain.PathRemovedEvent;
import fr.aleclerc.windpath.service.path.api.domain.PathRenamedEvent;
import fr.aleclerc.windpath.service.path.api.projection.*;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.operators.multi.processors.BroadcastProcessor;
import org.axonframework.eventhandling.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class PathSummaryProjection implements IPathSummaryEventStream, IPathSummaryService {

    private final static Logger LOGGER = LoggerFactory.getLogger(PathSummaryProjection.class);
    private final BroadcastProcessor<PathSummaryProjectionEvent> processor = BroadcastProcessor.create();
    private final Map<ProtoUUID, PathSummary> paths = new ConcurrentHashMap<>();

    @EventHandler
    public void handle(PathCreatedFromGpxEvent event) {
        LOGGER.info("PathCreatedFromGpxEvent {}", event.getTrack().getName());
        final PathSummary path = PathSummary.newBuilder()
                .setId(event.getId())
                .setName(event.getTrack().getName())
                .setTime(event.getTime())
                .setDistance(event.getDistance())
                .setDuration(event.getDuration())
                .setMaxSpeed(event.getMaxSpeedPoint().getSpeed())
                .setAverageSpeed(event.getAverageSpeed())
                .build();

        paths.put(event.getId(), path);
        processor.onNext(PathSummaryProjectionEvent.newBuilder()
                .setPathCreatedEvent(PathSummaryCreatedEvent.newBuilder()
                        .setPath(path))
                .build());
    }

    @EventHandler
    public void handle(PathRenamedEvent event) {
        LOGGER.info("PathRenamedEvent {}", event.getName());
        paths.computeIfPresent(event.getId(), (id, path) -> path.toBuilder().setName(event.getName()).build());
        processor.onNext(PathSummaryProjectionEvent.newBuilder()
                .setPathRenamedEvent(PathSummaryRenamedEvent.newBuilder()
                        .setId(event.getId())
                        .setName(event.getName()))
                .build());
    }

    @EventHandler
    public void handle(PathRemovedEvent event) {
        LOGGER.info("PathRemovedEvent {}", event.getId());
        paths.remove(event.getId());
        processor.onNext(PathSummaryProjectionEvent.newBuilder()
                .setPathRemovedEvent(PathSummaryRemovedEvent.newBuilder()
                        .setId(event.getId()))
                .build());
    }


    @Override
    public Multi<PathSummaryProjectionEvent> getEventStream() {
        LOGGER.info("paths size {}", paths.size());
        return Multi.createBy().concatenating().streams(
                Multi.createFrom().item(() -> PathSummaryProjectionEvent.newBuilder()
                        .setCurrentStateEvent(CurrentSummaryStateEvent.newBuilder().addAllPaths(paths.values())).build()), processor);
    }

    @Override
    public Uni<PathSummary> getSummary(ProtoUUID id) {
        return Uni.createFrom().optional(() -> Optional.ofNullable(paths.get(id)));
    }
}
