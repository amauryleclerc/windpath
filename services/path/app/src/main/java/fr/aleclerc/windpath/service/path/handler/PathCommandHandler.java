package fr.aleclerc.windpath.service.path.handler;


import com.google.protobuf.Message;
import fr.aleclerc.windpath.service.path.api.common.GenericResponse;
import fr.aleclerc.windpath.service.path.api.common.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.domain.MutinyPathGrpc;
import fr.aleclerc.windpath.service.path.api.domain.PathCommand;
import fr.aleclerc.windpath.service.path.config.AxonConfig;
import fr.aleclerc.windpath.service.path.config.PathCommandGateway;
import fr.aleclerc.windpath.service.path.api.*;
import io.smallrye.mutiny.Uni;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class PathCommandHandler extends MutinyPathGrpc.PathImplBase {
    private final static Logger LOGGER = LoggerFactory.getLogger(PathCommandHandler.class);
    @Inject
    PathCommandGateway gateway;

    @Override
    public Uni<GenericResponse> apply(PathCommand command) {
        LOGGER.info("Command {}", command);
        return Uni.createFrom().optional(() -> command.getAllFields().values()
                .stream()
                .filter(v -> !(v instanceof ProtoUUID))
                .filter(v -> v instanceof Message)
                .map(v -> (Message) v)
                .findAny())
                .flatMap(v -> Uni.createFrom().completionStage(gateway.sendCommand(v, UUIDUtils.toUUID(command.getId()))))
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


}
