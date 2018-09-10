#!/usr/bin/env bash

# format .proto files with clang-format
find . -maxdepth 1 -iname "*.proto" | xargs clang-format -style=file -i

# temp dir
PKG=github.com/master-g/gouno/proto/pb
mkdir -p pb
mkdir -p tmp
cp *.proto tmp
rm tmp/rpc_*.proto
protoeasy --gogo --gogo-plugin=gogofast --go-import-path=${PKG} tmp
cp tmp/${PKG}/* pb
rm -r tmp
