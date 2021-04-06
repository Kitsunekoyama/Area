FROM node:10-alpine AS alpine
WORKDIR /App
RUN npm install -g expo-cli
ADD . /App
RUN npm install
#ENV REACT_NATIVE_PACKAGER_HOSTNAME=${REACT_HOSTNAME}
#RUN apk update && apk add bash
#RUN npm install expo
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
#CMD ["expo", "start", "-s", "guillaume.brassard@gmail.com"]