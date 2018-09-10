#!/usr/bin/env bash

PACKAGE=github.com/master-g/gouno
COMMIT_HASH=$(git rev-parse --short HEAD)
BUILD_DATE=$(date +%Y-%m-%dT%TZ%z)

LD_FLAGS="-X ${PACKAGE}/buildinfo.CommitHash=${COMMIT_HASH} -X ${PACKAGE}/buildinfo.BuildDate=${BUILD_DATE}"

echo "${LD_FLAGS}"
go build -ldflags "${LD_FLAGS}"
