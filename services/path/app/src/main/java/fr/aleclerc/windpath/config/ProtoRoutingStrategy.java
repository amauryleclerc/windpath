package fr.aleclerc.windpath.config;

import org.axonframework.commandhandling.CommandMessage;
import org.axonframework.commandhandling.distributed.RoutingStrategy;

public class ProtoRoutingStrategy implements RoutingStrategy {
    @Override
    public String getRoutingKey(CommandMessage<?> command) {
        return command.getMetaData().get("id").toString();
    }
}
