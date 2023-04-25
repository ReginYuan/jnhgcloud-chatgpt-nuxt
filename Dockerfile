#FROM harbor.jnhgsz.com/jenkins/node-ubuntu:latest
#
#WORKDIR /jnhgcloud
#
#ENV TimeZone=Asia/Shanghai
#RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone
#
#COPY ./ ./
#
#EXPOSE 3000
#
#CMD cd .output && pnpm run dev

#FROM registory.jnhgsz.com:8090/jenkins/node-ubuntu:latest
FROM gitlab.jnhgsz.com/jenkins/node-ubuntu:latest

WORKDIR /arch-hgsz

ENV TimeZone=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone

COPY .output ./output
EXPOSE 3000

CMD node ./output/server/index.mjs
