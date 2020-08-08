package fr.aleclerc.windpath.service.path.config;

import com.google.protobuf.Message;
import org.axonframework.serialization.*;
import org.axonframework.serialization.json.JacksonSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ProtoSerializer implements Serializer {
    private final static Logger LOGGER = LoggerFactory.getLogger(ProtoSerializer.class);
    private static final String PARSE_FROM = "parseFrom";
    private final Converter converter;
    private final JacksonSerializer jsonSerializer;

    public ProtoSerializer() {
        this.converter = new ChainingConverter();
        this.jsonSerializer = JacksonSerializer.defaultSerializer();
    }

    @Override
    public <T> SerializedObject<T> serialize(Object object, Class<T> expectedRepresentation) {
        LOGGER.trace("Serialize {}", object.getClass());
        if (object instanceof Message && expectedRepresentation.isAssignableFrom(byte[].class)) {
            final byte[] serializedBytes = ((Message) object).toByteArray();
            final T serializedContent = converter.convert(serializedBytes, expectedRepresentation);
            return new SimpleSerializedObject<>(serializedContent, expectedRepresentation, typeForClass(object.getClass()));
        }
        return jsonSerializer.serialize(object, expectedRepresentation);
    }


    @Override
    public <T> boolean canSerializeTo(Class<T> aClass) {
        return aClass.isAssignableFrom(byte[].class);
    }

    @Override
    public <S, T> T deserialize(SerializedObject<S> serializedObject) {
        final Class<T> clazz = classForType(serializedObject.getType());
        LOGGER.trace("deserialize {} from {}", clazz, serializedObject.getContentType());
        if (Message.class.isAssignableFrom(clazz) && serializedObject.getContentType().isAssignableFrom(byte[].class)) {
            try {
                final Method method = clazz.getDeclaredMethod(PARSE_FROM, byte[].class);
                return (T) method.invoke(null, serializedObject.getData());
            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
                e.printStackTrace();
                throw new SerializationException("Error while deserializing object "+clazz+" form "+serializedObject.getContentType(), e);
            }
        }
        try {
            return jsonSerializer.deserialize(serializedObject);
        }catch (Exception e){
            LOGGER.error("deserializing json {} from {}",clazz,serializedObject.getContentType(), e);
            throw e;
        }

    }

    @Override
    public Class classForType(SerializedType serializedType) {
        try {
            return Class.forName(serializedType.getName());
        } catch (ClassNotFoundException e) {
            LOGGER.error("UnknownSerializedType : ", e);
            return UnknownSerializedType.class;
        }
    }

    @Override
    public SerializedType typeForClass(Class aClass) {
        return new SimpleSerializedType(aClass.getName(), null);
    }

    @Override
    public Converter getConverter() {
        return converter;
    }
}
