
## 1. Check ECS Cluster from Cloudshell:

```bash
aws ecs describe-clusters --clusters <cluster_name>
```

## 2. Check ECS Task from Cloudshell:

```bash
aws ecs describe-tasks --cluster <cluster_name> --tasks <task_id>
```

## 3. Connect to a Running Container in an ECS Task
```bash
aws ecs execute-command --cluster your-cluster-name --task your-task-id --container your-container-name --interactive --command "/bin/sh"

```

## 4. Find the Running Task ID
```bash
aws ecs list-tasks --cluster your-cluster-name
```