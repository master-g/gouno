#!/usr/bin/env bash

# format
echo "==> Formatting..."
goreturns -w $(find .. -type f -name '*.go' -not -path "../vendor/*")

# mod
echo "==> Module tidy and vendor..."
go mod tidy
go mod vendor

# lint
echo "==> Linting..."
gometalinter	--vendor \
				--fast \
				--enable-gc \
				--tests \
				--aggregate \
				--disable=gotype \
				../

# build
echo "==> Building..."

PACKAGE=github.com/master-g/gouno/internal
COMMIT_HASH=$(git rev-parse --short HEAD)
BUILD_DATE=$(date +%Y-%m-%dT%TZ%z)

LD_FLAGS="-X ${PACKAGE}/buildinfo.CommitHash=${COMMIT_HASH} -X ${PACKAGE}/buildinfo.BuildDate=${BUILD_DATE}"

echo "${LD_FLAGS}"
go build ../cmd/gouno -ldflags "${LD_FLAGS}"
