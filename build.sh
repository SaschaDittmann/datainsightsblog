#!/bin/bash
docker run -it \
  --mount type=bind,source="$(pwd)"/,target=/srv/jekyll \
  --name jekyll-builder \
  --rm \
  -t jekyll/builder:latest \
  jekyll build
