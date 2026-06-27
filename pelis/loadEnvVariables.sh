#!/bin/bash

JWT_SECRET=""
URL_DB=""
export JWT_SECRET=$JWT_SECRET
export URL_DB=$URL_DB

jwt=$(echo $JWT_SECRET)
db=$(echo $URL_DB)

echo "Variables creadas"
echo  "Jwt secret: ${jwt}"
echo  "UrlDb : ${db}"

