package fr.aleclerc.windpath.service.path.domain;

import com.topografix.gpx._1._0.Gpx;
import fr.aleclerc.windpath.service.path.api.commands.CreatePathFormGpxCommand;
import fr.aleclerc.windpath.service.path.api.commands.RenamePathCommand;
import fr.aleclerc.windpath.service.path.api.events.PathCreatedFromGpxEvent;
import fr.aleclerc.windpath.service.path.api.events.PathRenamedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.modelling.command.AggregateRoot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.stream.Collectors;

@AggregateRoot
public class PathAggregate {
    private final static Logger LOGGER = LoggerFactory.getLogger(PathAggregate.class);
    @AggregateIdentifier
    private String id;

    private String name;

    @CommandHandler
    public PathAggregate(CreatePathFormGpxCommand command) {
        AggregateLifecycle.apply(new PathCreatedFromGpxEvent(command.getId(), command.getGpx()));
    }

    @CommandHandler
    public void handle(RenamePathCommand cmd) {
        AggregateLifecycle.apply(new PathRenamedEvent(id, cmd.getName()));
    }

    @EventSourcingHandler
    public void on(PathCreatedFromGpxEvent evt) {
        id = evt.getId();
        name = evt.getGpx().getTrk().stream().map(Gpx.Trk::getName).collect(Collectors.joining("/"));
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
