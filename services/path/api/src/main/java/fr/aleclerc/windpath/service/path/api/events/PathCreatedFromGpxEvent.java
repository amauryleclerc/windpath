package fr.aleclerc.windpath.service.path.api.events;

import com.topografix.gpx._1._0.Gpx;

import java.util.Objects;

public class PathCreatedFromGpxEvent {

    private String id;

    private Gpx gpx;

    public PathCreatedFromGpxEvent(String id, Gpx gpx) {
        this.id = id;
        this.gpx = gpx;
    }

    public PathCreatedFromGpxEvent() {
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
        PathCreatedFromGpxEvent that = (PathCreatedFromGpxEvent) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(gpx, that.gpx);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, gpx);
    }


    @Override
    public String toString() {
        return "PathCreatedFromGpxEvent{" +
                "id='" + id + '\'' +
                ", gpx=" + gpx +
                '}';
    }
}
