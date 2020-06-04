package fr.aleclerc.windpath.service.path.api.events;

import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.Objects;

public class PathRenamedEvent {
    @TargetAggregateIdentifier
    private String id;

    private String name;

    public PathRenamedEvent(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public PathRenamedEvent() {
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PathRenamedEvent that = (PathRenamedEvent) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "RenamePathCommand{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
