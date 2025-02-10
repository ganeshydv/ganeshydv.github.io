#
Keyclaok structure: Realm <-- [usr1,user2,...use_n]
 - one ralm has mulitple users

#

## steps: 
1) build docker image
2) remember to persist data use volume or external database
3) run container with configs such as db
4) in AuthServer integrate this by using admin credentials or USer with
   specific access to keycloak.
#

## cmd:

1) RUN container: docker run --name keycloak_v1 -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin image_id start-dev

2) 