#!/bin/bash



export JWT_SECRET
export URL_DB

jwt=$(echo $JWT_SECRET)
db=$(echo $URL_DB)

echo "Variables creadas"
echo  "Jwt secret: ${jwt}"
echo  "UrlDb : ${db}"

