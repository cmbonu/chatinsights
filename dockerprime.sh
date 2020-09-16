docker build --tag gcr.io/chatanalysis-270612/chatauiserver:v1 .
docker run --publish 80:80 --detach --name chatui gcr.io/chatanalysis-270612/chatauiserver:v1
docker push gcr.io/chatanalysis-270612/chatauiserver:v1