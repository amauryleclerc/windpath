package fr.aleclerc.windpath.service.path.app.config;

import org.axonframework.commandhandling.CommandMessage;
import org.axonframework.commandhandling.distributed.RoutingStrategy;

import java.util.UUID;

public class ProtoRoutingStrategy implements RoutingStrategy {
    @Override
    public String getRoutingKey(CommandMessage<?> command) {
        System.out.println("command = " + command.getMetaData());
        if(command.getMetaData().containsKey("id")){
            return command.getMetaData().get("id").toString();
        }
        return UUID.randomUUID().toString();
    }
}
