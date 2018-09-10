#!/usr/bin/env bash

# build project first
sh ./build.sh

# --net=host does not work properly on OSX
# since docker runs in a virtual machine on OSX
# omit --net=host and use OSX's real IP address can bypass this problem
NETHOST=--net=host
case "$(uname -s)" in
Darwin)
  NETHOST=''
  IPADDR=$(ifconfig en0 | grep "inet " | cut -d " " -f2)

  cp config.debug.toml config.osx.toml
  sed -i '' s/localhost/${IPADDR}/g config.osx.toml
  ;;
esac

gouno.exe serve --config ./config.osx.toml