#!/bin/bash
docker run -it \
  --mount type=bind,source="$(pwd)"/,target=/srv/jekyll \
  -p 8080:4000 \
  --name jekyll-builder \
  --rm \
  -t jekyll/builder:latest \
  jekyll serve --watch --trace
