#!/bin/sh
img_name='jameszbl/authmore-doc'
npm run docs:build
cat ./deploy/analyse.txt >> ./docs/index.html
docker build -f Dockerfile -t $img_name .
docker push $img_name
