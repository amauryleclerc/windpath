package fr.aleclerc.windpath.service.path.projection;

import fr.aleclerc.windpath.service.path.api.IPathService;
import fr.aleclerc.windpath.service.path.api.common.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.domain.PathCreatedFromGpxEvent;
import fr.aleclerc.windpath.service.path.api.domain.PathRemovedEvent;
import fr.aleclerc.windpath.service.path.api.domain.PathRenamedEvent;
import fr.aleclerc.windpath.service.path.api.gpx.Bounds;
import fr.aleclerc.windpath.service.path.api.gpx.Point;
import fr.aleclerc.windpath.service.path.api.projection.Path;
import fr.aleclerc.windpath.service.path.api.projection.PathSegment;
import fr.aleclerc.windpath.service.path.api.projection.Position;
import io.smallrye.mutiny.Uni;
import org.axonframework.eventhandling.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

public class PathProjection implements IPathService {
    private final static Logger LOGGER = LoggerFactory.getLogger(PathProjection.class);
    private final Map<ProtoUUID, Path> paths = new ConcurrentHashMap<>();

    @EventHandler
    public void handle(PathCreatedFromGpxEvent event) {
        LOGGER.info("PathCreatedFromGpxEvent {}", event.getTrack().getName());
        final Path.Builder path = Path.newBuilder()
                .setId(event.getId())
                .setName(event.getTrack().getName())
                .setDistance(event.getDistance())
                .setDuration(event.getDuration())
                .setMaxSpeedPositon(convert(event.getMaxSpeedPoint()))
                .setAverageSpeed(event.getAverageSpeed())
                .setTime(event.getTime());

        if(event.hasBounds()){
            path.setBounds(convert(event.getBounds()));
        }

        AtomicReference<Position> point = new AtomicReference<>();
        event.getTrack().getSegmentsList()
                .stream()
                .flatMap(s -> s.getPointsList().stream())
                .map(this::convert)
                .forEach(p -> {
                    Position old = point.getAndSet(p);
                    if (old != null) {
                        path.addSegments(PathSegment.newBuilder()
                                .setPointA(old)
                                .setPointB(p)
                                .setSpeed((p.getSpeed() + old.getSpeed()) / 2)
                                .build());
                    }
                });
        paths.put(event.getId(), path.build());
    }

    private Position convert(Point p) {
        return Position.newBuilder().setLat(p.getLat()).setLon(p.getLon()).setSpeed(p.getSpeed()).build();
    }

    private fr.aleclerc.windpath.service.path.api.projection.Bounds convert(Bounds b) {
        return fr.aleclerc.windpath.service.path.api.projection.Bounds.newBuilder()
                .setCornerA(Position.newBuilder()
                        .setLat(b.getMinlat())
                        .setLon(b.getMinlon()))
                .setCornerB(Position.newBuilder()
                        .setLat(b.getMaxlat())
                        .setLon(b.getMaxlon()))
                .build();
    }

    @EventHandler
    public void handle(PathRenamedEvent event) {
        LOGGER.info("PathRenamedEvent {}", event.getName());
        paths.computeIfPresent(event.getId(), (id, path) -> path.toBuilder().setName(event.getName()).build());
    }

    @EventHandler
    public void handle(PathRemovedEvent event) {
        LOGGER.info("PathRemovedEvent {}", event.getId());
        paths.remove(event.getId());
    }

    @Override
    public Uni<Path> getPath(ProtoUUID id) {
        return Uni.createFrom().optional(() -> Optional.ofNullable(paths.get(id)));
    }
}
