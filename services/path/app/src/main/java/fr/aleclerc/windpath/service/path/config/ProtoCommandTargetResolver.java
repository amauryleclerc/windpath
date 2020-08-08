package fr.aleclerc.windpath.service.path.config;

import org.axonframework.commandhandling.CommandMessage;
import org.axonframework.modelling.command.CommandTargetResolver;
import org.axonframework.modelling.command.VersionedAggregateIdentifier;

import java.util.UUID;

public class ProtoCommandTargetResolver implements CommandTargetResolver {


    @Override
    public VersionedAggregateIdentifier resolveTarget(CommandMessage<?> command) {
        UUID id = (UUID) command.getMetaData().get("id");
        System.out.println("id = " + id);
        return new VersionedAggregateIdentifier(id.toString(), null);
//        try {
//            command.getMetaData().
//                    Method method = command.getPayload().getClass().getMethod(GET_ID);
//            String id = UUIDUtils.toString((Types.BinaryUUID) method.invoke(command.getPayload()));
//            return new VersionedAggregateIdentifier(id, null);
//        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
//            e.printStackTrace();
//            throw new IllegalArgumentException(e);
//        }
    }
}
