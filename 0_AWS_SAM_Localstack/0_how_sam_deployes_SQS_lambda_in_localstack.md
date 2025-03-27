 ## 🎯 SAM actually deploys Lambda and SQS to LocalStack when you use sam build and sam local start-api.
 ## 🔹 How SAM Deploys to LocalStack
When using SAM with LocalStack, here’s what happens step by step:

### 1️⃣ sam build
```sh
sam build
```
- Builds the Lambda function based on template.yaml.
- Packages dependencies (node_modules) inside .aws-sam/build/.
### 2️⃣ sam local start-api (for API Gateway) or sam deploy (for full LocalStack deployment)
```sh
sam local start-api --docker-network host
```
- or
```sh
sam deploy --config-env local
```
- Deploys the Lambda function into LocalStack.
- Creates SQS queues in LocalStack.
- Links SQS to Lambda automatically (via Event Source Mapping).
## ✅ How SAM Deploys to LocalStack

## Create Queue:
- `aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name MyQueue`

## Check Queue List:
- `aws --endpoint-url=http://localhost:4566 sqs list-queues`
## Receive Queue:
- `aws --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/MyQueue --region us-west-2`

## Delete Queue:
- `aws --endpoint-url=http://localhost:4566 sqs delete-queue --queue-url http://localhost:4566/000000000000/MyQueue`

## Check Queue ARN:
- `aws --endpoint-url=http://localhost:4566 sqs get-queue-attributes  --queue-url http://localhost:4566/000000000000/MyQueue  --attribute-name QueueArn`

## Check Lambda Event mapping: check sqs is event for lambda
- `aws --endpoint-url=http://localhost:4566 lambda list-event-source-mappings`
