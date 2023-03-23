FROM harbor.jnhgsz.com/jenkins/jenkins-agent:jdk11-2.3

WORKDIR /jnhgcloud-info

ENV TimeZone=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone

COPY ./* ./
RUN npm cache clean -f && pnpm install

EXPOSE 3000

CMD pnpm run dev
