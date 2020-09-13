package fr.aleclerc.windpath.service.path.domain;

import com.google.protobuf.Duration;
import com.google.protobuf.Timestamp;
import com.google.protobuf.util.Durations;
import com.google.protobuf.util.Timestamps;
import fr.aleclerc.windpath.service.path.api.UUIDUtils;
import fr.aleclerc.windpath.service.path.api.domain.*;
import fr.aleclerc.windpath.service.path.api.gpx.Point;
import fr.aleclerc.windpath.service.path.api.gpx.Segment;
import fr.aleclerc.windpath.service.path.api.gpx.Track;
import net.sf.geographiclib.Geodesic;
import net.sf.geographiclib.GeodesicData;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.messaging.annotation.MetaDataValue;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.modelling.command.AggregateRoot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Comparator;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.IntStream;

@AggregateRoot
public class PathAggregate {
    private final static Logger LOGGER = LoggerFactory.getLogger(PathAggregate.class);
    @AggregateIdentifier
    private String id;

    private String name;

    public PathAggregate() {
    }

    @CommandHandler
    public PathAggregate(CreatePathFromGpxCommand command, @MetaDataValue("id") UUID id) {
        PathCreatedFromGpxEvent.Builder event = PathCreatedFromGpxEvent.newBuilder()
                .setId(UUIDUtils.toProtoUUID(id))
                .setTrack(command.getTrack())
                .setTime(command.getTime());
        if(command.hasBounds()){
            event.setBounds(command.getBounds());
        }
        event.setAverageSpeed(getAverageSpeed(command.getTrack()));
        event.setDuration(getDuration(command.getTrack()));
        event.setDistance(getDistance(command.getTrack()));
        getMaxSpeedPoint(command.getTrack()).ifPresent(event::setMaxSpeedPoint);

        AggregateLifecycle.apply(event.build());
    }

    @CommandHandler
    public void handle(RenamePathCommand command) {
        AggregateLifecycle.apply(PathRenamedEvent.newBuilder()
                .setId(UUIDUtils.toProtoUUID(id))
                .setName(command.getName()).build());
    }

    @CommandHandler
    public void handle(RemovePathCommand command) {
        AggregateLifecycle.markDeleted();
        AggregateLifecycle.apply(PathRemovedEvent.newBuilder()
                .setId(UUIDUtils.toProtoUUID(id)).build());
    }

    @EventSourcingHandler
    public void on(PathCreatedFromGpxEvent evt) {
        id = UUIDUtils.toUUID(evt.getId()).toString();
        name = evt.getTrack().getName();
        LOGGER.info("Path {} with name {} created", id, name);
    }

    @EventSourcingHandler
    public void on(PathRenamedEvent evt) {
        name = evt.getName();
        LOGGER.info("Path {} renamed {}", id, name);

    }

    private Duration getDuration(Track track) {
        return getMinTime(track)
                .flatMap(min -> getMaxTime(track)
                        .map(max -> Timestamps.between(min, max)))
                .orElseGet(() -> Durations.fromSeconds(0));
    }

    private Optional<Timestamp> getMaxTime(Track track) {
        return track.getSegmentsList().stream()
                .flatMap(s -> s.getPointsList().stream())
                .map(Point::getTime)
                .max(Timestamps.comparator());
    }

    private Optional<Timestamp> getMinTime(Track track) {
        return track.getSegmentsList().stream()
                .flatMap(s -> s.getPointsList().stream())
                .map(Point::getTime)
                .min(Timestamps.comparator());
    }

    private Optional<Point> getMaxSpeedPoint(Track track) {
        return track.getSegmentsList().stream()
                .flatMap(s -> s.getPointsList().stream())
                .max(Comparator.comparingDouble(Point::getSpeed));
    }

    private double getAverageSpeed(Track track) {
        return track.getSegmentsList().stream()
                .flatMap(s -> s.getPointsList().stream())
                .mapToDouble(Point::getSpeed)
                .average()
                .orElse(0d);
    }

    private double getDistance(Track track) {
        return track.getSegmentsList().stream()
                .mapToDouble(this::getDistance)
                .sum();
    }

    private double getDistance(Segment segment) {
        return IntStream.range(0, segment.getPointsCount() - 1)
                .mapToDouble(index -> getDistance(segment.getPoints(index), segment.getPoints(index + 1)))
                .sum();
    }

    private double getDistance(Point p1, Point p2) {
        GeodesicData g = Geodesic.WGS84.Inverse(p1.getLat(), p1.getLon(), p2.getLat(), p2.getLon());
        return g.s12;  // distance in metres
    }

}
