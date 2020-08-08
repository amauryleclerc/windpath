package fr.aleclerc.windpath.service.path.domain;

import fr.aleclerc.windpath.service.path.api.*;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.messaging.annotation.MetaDataValue;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.modelling.command.AggregateRoot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;

@AggregateRoot
public class PathAggregate {
    private final static Logger LOGGER = LoggerFactory.getLogger(PathAggregate.class);
    @AggregateIdentifier
    private String id;

    private String name;

    @CommandHandler
    public PathAggregate(CreatePathFromGpxCommand command, @MetaDataValue("id") UUID id) {
        command.getGpx().getTracksList().forEach(track-> {
            AggregateLifecycle.apply(PathCreatedFromGpxEvent.newBuilder()
                    .setId(UUIDUtils.toProtoUUID(id))
                    .setName(track.getName()).build());
        });
    }

    @CommandHandler
    public void handle(RenamePathCommand command) {
        AggregateLifecycle.apply(PathRenamedEvent.newBuilder()
                .setId(UUIDUtils.toProtoUUID(id))
                .setName(command.getName()).build());
    }

    @EventSourcingHandler
    public void on(PathCreatedFromGpxEvent evt) {
        id = UUIDUtils.toUUID(evt.getId()).toString();
        name = evt.getName();
        LOGGER.info("Path {} with name {} created", id, name);
    }

    @EventSourcingHandler
    public void on(PathRenamedEvent evt) {
        name = evt.getName();
        LOGGER.info("Path {} renamed {}", id, name);
    }

    public PathAggregate() {
    }
}
