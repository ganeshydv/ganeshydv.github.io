```
ECS : https://www.youtube.com/watch?v=ARGmrYFfv44
      https://www.youtube.com/watch?v=Oe7RlNRYEpI
      https://www.youtube.com/watch?v=ARGmrYFfv44
```
### 1) Cluster : have infrastructure - EC2 or Fargate ( like OS for running Code)
### 2) Services : are associated with TASK Defination 
- is always part of cluster
- One Task Defination for One Service 
- Can run multiple instances of container based on Task Defination's Image
- The service manages the lifecycle of tasks, ensuring that the desired number of tasks based on the specified task definition is running at all times.
### 3) Task : is always part of cluster only and run based on task Defination
- One Task Defination for one Task
- can run only one container
- The service handles tasks' deployment, scaling, and recovery
>VIMP:  task are responsible for running containers [ Image, Container Id]
 
- Task 1 :
- Task 2 :  -> Service ( Creates multiple Task based on Task Defination )
- Task 3 :


### - Task Defination : same for Task and Service 
-  but The difference lies in how tasks are managed and orchestrated, with services providing a higher-level abstraction for scalable and reliable deployment of containers.
- While the task definition structure is the same, when you use it within the context of a service, ECS provides additional capabilities for managing the deployment, scaling, and maintenance of tasks. The service handles the orchestration of tasks based on the specified task definitio
### - VIMP: 
1) if using Fargate : can not find releated container where it is running
2) if using EC2 : can find where it is running : cluser-> services-> Task -> selecet Task --> Ec2 Id
3) ECS uses Task for launching container to run on EC2 or ECS
  [ ONE TASK ==> ONE Container ]
4) clusters are used for orchestration ( auto deployment, creating Task,Service etc )
