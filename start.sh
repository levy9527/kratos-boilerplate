# !/bin/sh
c_name=levy_nginx

#docker container stop $c_name
docker rm -f $c_name &> /dev/null

# 如果报错，可以使用 -ti 代替 -d 来查看报错信息
docker container run --rm \
-d \
-v "`pwd`/build":/usr/share/nginx/html \
-v "`pwd`/nginx":/etc/nginx \
-p 8080:80 \
--name $c_name \
nginx 
