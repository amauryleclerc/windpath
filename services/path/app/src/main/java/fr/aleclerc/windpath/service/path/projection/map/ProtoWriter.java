package fr.aleclerc.windpath.service.path.projection.map;

import com.google.protobuf.Message;
import fr.aleclerc.windpath.service.path.projection.PathSummaryProjection;
import net.openhft.chronicle.bytes.Bytes;
import net.openhft.chronicle.hash.serialization.BytesWriter;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class ProtoWriter<T extends Message> implements BytesWriter<T> {
    private final static Logger LOGGER = LoggerFactory.getLogger(PathSummaryProjection.class);

    @Override
    public void write(Bytes out, @NotNull T toWrite) {
        try {
            toWrite.writeDelimitedTo(out.outputStream());
        } catch (IOException e) {
            LOGGER.error("Error on write {}", toWrite, e);
        }
    }
}
