#!/usr/bin/env bash

echo "==> Compiling to Go..."

# format .proto files with clang-format
find . -maxdepth 1 -iname "*.proto" | xargs clang-format -style=file -i

# temp dir
PKG=github.com/master-g/gouno/api/pb
mkdir -p pb
mkdir -p tmp
cp *.proto tmp
rm tmp/rpc_*.proto
protoeasy --gogo --gogo-plugin=gogofast --go-import-path=${PKG} tmp
cp tmp/${PKG}/* pb
rm -r tmp

# js and ts
echo "==> Compiling to JavaScript and TypeScript..."
pbjs -t static-module -w commonjs -o pb.js *.proto
pbts -o pb.d.ts pb.js
