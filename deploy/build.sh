#!/bin/sh
npm run docs:build
img_name='registry.cn-beijing.aliyuncs.com/letec/authmore-doc'
docker build -f Dockerfile -t $img_name .
docker push $img_name