package fr.aleclerc.windpath.service.path.app.handler;


import com.google.protobuf.Message;
import fr.aleclerc.windpath.service.path.api.common.GenericResponse;
import fr.aleclerc.windpath.service.path.api.common.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.domain.MutinyPathGrpc;
import fr.aleclerc.windpath.service.path.api.domain.PathCommand;
import fr.aleclerc.windpath.service.path.api.UUIDUtils;
import fr.aleclerc.windpath.service.path.app.config.IPathCommandGateway;
import io.smallrye.mutiny.Uni;
import org.axonframework.commandhandling.CommandBus;
import org.axonframework.commandhandling.GenericCommandMessage;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Singleton
public class PathCommandHandler extends MutinyPathGrpc.PathImplBase {
    private final static Logger LOGGER = LoggerFactory.getLogger(PathCommandHandler.class);
    @Inject
    IPathCommandGateway gateway;

    @Inject
    CommandBus bus;

    @Override
    public Uni<GenericResponse> apply(PathCommand command) {
        LOGGER.info("Command {}", command);
        return Uni.createFrom().optional(() -> command.getAllFields().values()
                .stream()
                .filter(v -> !(v instanceof ProtoUUID))
                .filter(v -> v instanceof Message)
                .map(v -> (Message) v)
                .findAny())
                .flatMap(v -> send(v, command.getId()))
                .map(message -> {
                    final GenericResponse.Builder builder = GenericResponse.newBuilder().setSuccess(true);
                    if (message != null) {
                        builder.setMessage(message);
                    }
                    return builder.build();
                })
                .onFailure()
                .invoke(e -> LOGGER.error("Erreur sur l'application de la command {}", command, e))
                .onFailure()
                .recoverWithItem(e -> GenericResponse.newBuilder()
                        .setSuccess(false)
                        .setMessage(e.getMessage())
                        .build());
    }


    private Uni<String> send(Message command, ProtoUUID id) {
        return Uni.createFrom().emitter(uniEmitter -> {
            bus.dispatch(GenericCommandMessage.asCommandMessage(command).andMetaData(Map.of("id", UUIDUtils.toUUID(id))), (m, r) -> {
                if (r.isExceptional()) {
                    uniEmitter.fail(r.exceptionResult());
                } else {
                    uniEmitter.complete(r.getIdentifier());
                }
            });
        });
    }

}
