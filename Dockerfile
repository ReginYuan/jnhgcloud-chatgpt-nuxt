FROM harbor.jnhgsz.com/nginx/nginx:stable-new

WORKDIR /usr/share/nginx/html

ENV TimeZone=Asia/Shanghai  
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone
RUN rm -rf /usr/share/nginx/html/*

COPY .output/public/ /usr/share/nginx/html

EXPOSE 3000
EXPOSE 80

CMD ["nginx","-g","daemon off;"]
