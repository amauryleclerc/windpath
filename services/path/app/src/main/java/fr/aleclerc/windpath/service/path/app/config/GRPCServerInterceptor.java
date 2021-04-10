package fr.aleclerc.windpath.service.path.app.config;

import io.grpc.*;

public class GRPCServerInterceptor implements ServerInterceptor {


    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(ServerCall<ReqT, RespT> call, Metadata headers, ServerCallHandler<ReqT, RespT> next) {

        final String auth_token = headers.get(Metadata.Key.of("auth_token", Metadata.ASCII_STRING_MARSHALLER));

        if (auth_token == null || !auth_token.equals("valid_token")) {
            throw new StatusRuntimeException(Status.FAILED_PRECONDITION);
        }

        return next.startCall(call, headers);
    }
}
