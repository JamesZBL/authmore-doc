#!/bin/bash
mkdir -p archive
git archive --prefix=authmore-doc/ --format=zip --output archive/authmore-doc.zip \
 --remote=git@gitee.com:zbl1996/authmore-doc.git master