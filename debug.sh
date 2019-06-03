#!/bin/bash
gulp
docker run -it \
  --mount type=bind,source="$(pwd)"/,target=/srv/jekyll \
  -p 4000:4000 \
  --name jekyll-builder \
  --rm \
  -t jekyll/builder:latest \
  jekyll serve --watch