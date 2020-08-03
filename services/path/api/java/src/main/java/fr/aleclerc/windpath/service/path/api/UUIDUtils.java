package fr.aleclerc.windpath.service.path.api;

import io.vertx.reactivex.ext.auth.oauth2.providers.GoogleAuth;

import java.util.UUID;

public class UUIDUtils {

    public static UUID toUUID(ProtoUUID protoUUID) {
        return new UUID(protoUUID.getMostSigBits(), protoUUID.getLeastSigBits());
    }

    public static ProtoUUID toProtoUUID(UUID id) {
        return ProtoUUID.newBuilder()
                .setMostSigBits(id.getMostSignificantBits())
                .setLeastSigBits(id.getLeastSignificantBits()).build();
    }

    public static ProtoUUID toProtoUUID(String id) {
        return toProtoUUID(UUID.fromString(id));
    }

    public static ProtoUUID randomProtoUUID() {
        return toProtoUUID(UUID.randomUUID());
    }
}
