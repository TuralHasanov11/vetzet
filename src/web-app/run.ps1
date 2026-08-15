# Docker build and run
docker build -t vetzet/web-app:latest .
docker run -p 3000:3000 --name vetzet-web-app --env-file .env --add-host=host.docker.internal:host-gateway -e NUXT_PUBLIC_SUPABASE_URL=http://host.docker.internal:55421 -d vetzet/web-app:latest