https://www.serverless.com/framework/docs/providers/aws/guide/deploying

{
    1) Codebuild uses Docker container to run buildsepc.yml file 
    2) serverless framework creates IAM role for cloudFromation based on Resources in serverless.yml
    3) CloudFormtaion template is created by Serverless framework based on Serverless.yml 
    4) serverless framework creates ZIP of fucntion and Uploads it to S3 automatically
    5) CloudFormation : Infrastructure as COde (Infra as Code) - creates Resources mentioned in serverless.yml
       [ IAM role : serverless framework crates IAM Roles for CloudFormation]
}

1) serverless.yml file : this creates CloudFromtion Template
-Any IAM Roles, Functions, Events and Resources are added to the AWS CloudFormation template.
2) serverless uploads CloudFormation File to S3
3) --> uploads artifacts
4) --> uploads lambda functions ZIP file to S3
5) --> Upload custom CloudFormation resources
6) CloudFormtation : create Resources 

[ codebuild---> serverless--> (1){cloudformation --> resource generation} + (2) S3 ZIP Upload ]