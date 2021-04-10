## Stage 1 : build with maven builder image with native capabilities
FROM quay.io/quarkus/ubi-quarkus-native-image:21.0.0-java11 AS build
COPY . /usr/src/app/
RUN mvn -f /usr/src/app/pom.xml --projects :windpath-path-service-app --also-make -B de.qaware.maven:go-offline-maven-plugin:1.2.5:resolve-dependencies
USER root
RUN chown -R quarkus /usr/src/app
USER quarkus
RUN mvn -f /usr/src/app/pom.xml --projects :windpath-path-service-app --also-make -Pnative clean package

## Stage 2 : create the docker final image
FROM registry.access.redhat.com/ubi8/ubi-minimal
WORKDIR /work/
COPY --from=build /usr/src/app/services/path/app/target/*-runner /work/application

# set up permissions for user `1001`
RUN chmod 775 /work /work/application \
  && chown -R 1001 /work \
  && chmod -R "g+rwX" /work \
  && chown -R 1001:root /work

EXPOSE 9000
USER 1001

CMD ["./application"]