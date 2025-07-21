---
layout: post
title: "Commands and Explanations:"
date: 2025-07-21
categories: [devops, 2-docker-networking--md]
tags: [docker]
author: "GGurkhude"
excerpt: "Learning notes on commands and explanations:"
original_path: "4_Docker/2_docker_networking_.md"
---


### Commands and Explanations:

1. **Check available networks (`docker network ls`)**:
   This command lists all the Docker networks available on your system. It provides information such as the network ID, name, driver, and scope.

    ```bash
    docker network ls
    ```

2. **Inspect a network (`docker network inspect network_id`)**:
   This command allows you to inspect the details of a specific Docker network identified by its network ID. It provides detailed information about the network configuration, including subnet, gateway, connected containers, and more.

    ```bash
    docker network inspect network_id
    ```

3. **Create a new network (`docker network create name --subnet 10.0.0.0/24`)**:
   This command creates a new Docker network with the specified name and subnet. Replace `name` with the desired network name. The `--subnet` option specifies the subnet range that the network will use. In this example, it's set to `10.0.0.0/24`.

    ```bash
    docker network create name --subnet 10.0.0.0/24
    ```

4. **Add a container to the new network (`docker network connect network_name container_name`)**:
   This command connects an existing Docker container to a specified network. Replace `network_name` with the name of the network you want to connect the container to, and `container_name` with the name or ID of the container you want to connect.

    ```bash
    docker network connect network_name container_name
    ```

5. **Remove a container from the default network (`docker network disconnect network_name container_name`)**:
   This command disconnects a container from a specified network. It removes the container from the network specified by `network_name`. Replace `network_name` with the name of the network and `container_name` with the name or ID of the container you want to disconnect.

    ```bash
    docker network disconnect network_name container_name
    ```

These commands are useful for managing Docker networks, enabling communication between containers, and defining how containers are isolated from each other.

#
cmd :
ALL conatiners have DNS Provider

1 check network : docker network ls
2 inspect : docker network inspect network_id 
3 create Network :  
- docker create name --subnet 10.0.0.0/24
4 add container to this subnet of new network:
  docker network connect network_name container_name
5 remove containers from default network
-docker netwrok disconnect network_name conatiner_name