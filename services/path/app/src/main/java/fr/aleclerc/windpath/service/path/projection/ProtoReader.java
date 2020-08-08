package fr.aleclerc.windpath.service.path.projection;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.Parser;
import net.openhft.chronicle.bytes.Bytes;
import net.openhft.chronicle.hash.serialization.BytesReader;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProtoReader<T extends Message> implements BytesReader<T> {
    private final static Logger LOGGER = LoggerFactory.getLogger(ProtoReader.class);

    private final Parser<T> parser;

    public ProtoReader(Parser<T> parser){
        this.parser = parser;
    }

    @NotNull
    @Override
    public T read(Bytes in, @Nullable T using) {
        try {
            return parser.parseDelimitedFrom(in.inputStream());
        } catch (InvalidProtocolBufferException e) {
            LOGGER.error("Error on read",e);
            throw new IllegalStateException(e);
        }
    }
}
