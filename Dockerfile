FROM gitlab.jnhgsz.com/jenkins/node-ubuntu:latest

WORKDIR /jnhgcloud-info

ENV TimeZone=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone

COPY .output ./output
EXPOSE 3000

CMD node ./output/server/index.mjs
