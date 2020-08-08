package fr.aleclerc.windpath.service.path.config;

import com.google.protobuf.Message;
import org.axonframework.commandhandling.gateway.Timeout;
import org.axonframework.messaging.annotation.MetaDataValue;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public interface PathCommandGateway {

    @Timeout(value = 10, unit = TimeUnit.SECONDS)
    CompletableFuture<String> sendCommand(Message command, @MetaDataValue("id") UUID aggregateId);
}
