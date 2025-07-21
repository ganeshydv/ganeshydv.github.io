---
layout: post
title: "cmd : docker run d name myrediscontainer p 6379:6379 redis"
date: 2025-07-21
categories: [devops, redis-container-md]
tags: [javascript, docker]
author: "GGurkhude"
excerpt: "Learning notes on cmd : docker run d name myrediscontainer p 6379:6379 redis"
original_path: "4_Docker/Redis_container.md"
---


### cmd : docker run -d --name my-redis-container -p 6379:6379 redis
```yml

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```


### To connect with other conatiner:
1) run redis container
2) run node app container
   : docker run -d --name my-node-app-container -p 3000:3000 --link my-redis-container my-node-app
cmd to run cli : 
  docker exec -it apigateway-redis-1 redis-cli -a secret


### Redis cmds:
1) scan : gives keys
2) get key_value 
3) DEL key_value


