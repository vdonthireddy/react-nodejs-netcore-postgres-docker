#Stop the existing containers if running (Ignore errors if not found)
docker stop vj-micro-app-container
docker stop vj-micro-service-container
docker stop vj-postgresql-db

#Remove the containers if exist (Ignore errors if not found)
docker rm -f vj-micro-app-container
docker rm -f vj-micro-service-container
docker rm -f vj-postgresql-db

#remove the images if exist (Ignore errors if not found)
docker rmi -f vj-micro-service-image
docker rmi -f vj-micro-app-image

#remove dangling images if exist
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

#Build images and create containers
docker-compose up -d

#Let the containers start and execute the seed data (including creating database and table in PostgreSQL)
echo 'creating seed data...'
for i in {10..1}
do
    sleep 1s
    echo "$i..."
done
curl http://localhost:8080/create-schema
