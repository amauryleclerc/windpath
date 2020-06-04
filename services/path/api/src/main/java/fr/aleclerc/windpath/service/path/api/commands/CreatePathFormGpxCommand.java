package fr.aleclerc.windpath.service.path.api.commands;

import com.topografix.gpx._1._0.Gpx;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.Objects;

public class CreatePathFormGpxCommand {
    @TargetAggregateIdentifier
    private String id;

    private Gpx gpx;

    public CreatePathFormGpxCommand(String id, Gpx gpx) {
        this.id = id;
        this.gpx = gpx;
    }

    public CreatePathFormGpxCommand() {
    }

    public String getId() {
        return id;
    }

    public Gpx getGpx() {
        return gpx;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreatePathFormGpxCommand that = (CreatePathFormGpxCommand) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(gpx, that.gpx);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, gpx);
    }

    @Override
    public String toString() {
        return "CreatePathFormGPXCommand{" +
                "id='" + id + '\'' +
                ", gpx=" + gpx +
                '}';
    }
}
