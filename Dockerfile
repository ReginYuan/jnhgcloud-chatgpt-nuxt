#FROM harbor.jnhgsz.com/nginx/nginx:stable-new
FROM harbor.jnhgsz.com/nginx/nginx:stable-jnhgcloud-info

WORKDIR /usr/share/nginx/html

ENV TimeZone=Asia/Shanghai  
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone
RUN rm -rf /usr/share/nginx/html/*

COPY .output/public/ /usr/share/nginx/html

EXPOSE 61080

CMD ["nginx","-g","daemon off;"]
