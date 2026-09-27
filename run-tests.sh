#!/usr/bin/env bash
# Runs every ZineIt test suite in order. From the repo root: ./run-tests.sh
set -e
echo "=== Lightroom plug-in: Lua syntax ==="
for f in lightroom/zineit.lrplugin/*.lua; do luac5.4 -p "$f" && echo "  ok  $f"; done
echo
echo "=== Lightroom plug-in: unit tests ==="
lua5.4 lightroom/tests/run-lua-tests.lua | tail -3
echo
echo "=== Contract fixture: regenerate from plug-in code ==="
lua5.4 lightroom/tests/make-fixture.lua
echo
echo "=== ZineIt app + plug-in contract ==="
cd tests && npm test --silent | tail -3
