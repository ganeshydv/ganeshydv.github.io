# 1. start localstack container
- docker run -d --rm -it -p 4566:4566 -p 4510-4559:4510-4559 --name localstack localstack/localstack
# 2. create s3 bucket in that localstack :to upload lambda in that
- aws --endpoint-url=http://localhost:4566 s3 mb s3://localstack-bucket --region us-west-2
- aws --endpoint-url=http://localhost:4566 s3 ls
# 3. create SQS in that localstack
- aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name MyQueue --region us-west-2
- aws --endpoint-url=http://localhost:4566 sqs list-queues
- aws --endpoint-url=http://localhost:4566 sqs get-queue-url --queue-name MyQueue

# 4. Build lambda functions
- remember to check node modules included or not
- sam build
- local invoke :sam builds docker image and runs the function: sam local invoke FunctionName

# 5. Upload lambda functions to localstack
- check: aws --endpoint-url=http://localhost:4566 lambda list-functions
- upload: sam upload
- sam deploy --config-file samconfig.toml
# 6. check the Event Source Mapping : relation between lambda and SQS
- aws --endpoint-url=http://localhost:4566 lambda list-event-source-mappings
# 7. Create the Event Source Mapping
- aws --endpoint-url=http://localhost:4566 lambda create-event-source-mapping \
    --function-name ConsumerFunction \
    --event-source-arn arn:aws:sqs:us-east-1:000000000000:MyQueue \
    --batch-size 5
# 8. Start lambda in local - this will start but not upload
- sam local start-lambda
