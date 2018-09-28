#!/usr/bin/env bash

cat <<EOF | xargs go get -u
github.com/golang/protobuf/proto
github.com/golang/protobuf/protoc-gen-go
google.golang.org/grpc
github.com/gogo/protobuf/proto
github.com/gogo/protobuf/jsonpb
github.com/gogo/protobuf/protoc-gen-gogofast
github.com/gogo/protobuf/gogoproto
go.pedge.io/protoeasy/cmd/protoeasy
github.com/mwitkow/go-grpc-middleware
github.com/grpc-ecosystem/go-grpc-prometheus
EOF