#FROM harbor.jnhgsz.com/nginx/nginx:stable-new
#FROM harbor.jnhgsz.com/nginx/nginx:stable-jnhgcloud-info
FROM harbor.jnhgsz.com/jenkins/node-ubuntu:latest

WORKDIR /jnhgcloud

ENV TimeZone=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone

COPY ./ ./

EXPOSE 3000

CMD pnpm run dev .output
