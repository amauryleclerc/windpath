package fr.aleclerc.windpath.service.path.client;

import com.google.protobuf.Message;
import fr.aleclerc.windpath.service.path.api.*;
import fr.aleclerc.windpath.service.path.api.projection.MutinyPathProjectionGrpc;
import fr.aleclerc.windpath.service.path.api.projection.PathSession;
import io.quarkus.grpc.runtime.annotations.GrpcService;
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.QuarkusApplication;
import io.quarkus.runtime.annotations.QuarkusMain;

import javax.inject.Inject;
import java.util.UUID;

@QuarkusMain
public class PathClientMain implements QuarkusApplication {

    public static void main(String... args) {
        Quarkus.run(PathClientMain.class, args);
    }

    @Inject
    @GrpcService("command")
    MutinyPathGrpc.MutinyPathStub client;

    @Inject
    @GrpcService("projection")
    MutinyPathProjectionGrpc.MutinyPathProjectionStub streamClient;

    @Override
    public int run(String... args) throws Exception {
//
//        System.out.println("RUN");
//        UUID id = UUID.fromString("ebf2e5fc-1015-4705-9c13-07fea3a70238");
//      //  ProtoUUID id = UUIDUtils.randomProtoUUID();
////        System.out.println("id = " + UUIDUtils.toUUID(id));
//        PathCommand createCommand = PathCommand.newBuilder()
//                .setId(UUIDUtils.toProtoUUID(id))
//                .setCreatePathFromGpxCommand(CreatePathFromGpxCommand.newBuilder()
//                        .build())
//                .build();
//        PathCommand renameCommand = PathCommand.newBuilder()
//                .setId(UUIDUtils.toProtoUUID(id))
//                .setRenamePathCommand(RenamePathCommand.newBuilder()
//                        .setName("TATA")
//                        .build())
//                .build();
//
//       String message = client.apply(createCommand).await().indefinitely().toString();
//        System.out.println("message = " + message);
//        String messageRenamed = client.apply(renameCommand).await().indefinitely().toString();
//        System.out.println("messageRenamed = " + messageRenamed);

        System.out.println("run");
        PathSession session = PathSession.newBuilder().build();
        streamClient.getPathSummaryEventStream(session)
                .onItem().invoke(v -> System.out.println("v = " + v))
                .onFailure().invoke(v -> System.out.println("err = " + v))
                .collectItems().asList().await().indefinitely();
        System.out.println("end");
        return 10;
    }
}