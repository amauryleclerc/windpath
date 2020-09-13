del /S /F /Q src\app\proto-gen\*
node_modules\protoc\protoc\bin\protoc --plugin=protoc-gen-ts=node_modules\.bin\protoc-gen-ts.cmd --js_out=import_style=commonjs,binary:./src/app/proto-gen --ts_out=service=grpc-web:./src/app/proto-gen -I ./target/proto/ ./target/proto/*.proto
