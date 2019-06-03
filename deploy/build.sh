#!/bin/sh
img_name='registry.cn-beijing.aliyuncs.com/letec/authmore-doc'
npm run docs:build
cat ./deploy/analyse.txt >> ./docs/index.html
docker build -f Dockerfile -t $img_name .
docker push $img_name