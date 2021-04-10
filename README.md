# windpath project

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```
./mvnw compile quarkus:dev -pl fr.aleclerc.windpath:windpath-path-service-app --also-make -Ddebug=5005
./mvnw compile quarkus:dev -pl fr.aleclerc.windpath:windpath-user-service-app --also-make -Ddebug=5006
```



```
%JAVA_HOME%\bin\java.exe -agentlib:native-image-agent=config-output-dir=native-image,caller-filter-file=native-image-caller-filter-rules.json -jar target/quarkus-app/quarkus-run.jar
```


```
./mvnw package -Pnative -Dquarkus.native.container-build=true -Dquarkus.container-image.build=true
```

