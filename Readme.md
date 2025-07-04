# Project Documentation

## Index

### 0_AWS
- [## 1. Create User:](0_AWS/0_AWS_.md)
- [# 1. Check ECS Cluster from Cloudshell:](0_AWS/0_AWS_CMD.md)
- [# Other free Services:](0_AWS/0_AWS_Free_Tier.md)
- [# An IAM Role is a set of permissions that AWS services (like Lambda) assume to perform actions on other AWS resources.](0_AWS/0_IAM_ROLE_Policy_.md)
- [## Multi Factor Authentication](0_AWS/1.1_IAM_MFA.md)
- [3 Ways to access AWS :](0_AWS/1.2_user_access.md)
- [# Role:](0_AWS/1.3_IAM_Role.md)
- [1.4 IAM Security Tools](0_AWS/1.4_IAM_Security_Tools.md)
- [## IAM : Global service](0_AWS/1_IAM.md)
- [Serverless Deployment Automation](0_AWS/3_aws_cicd_serverless_.md)
- [# SSH : MAC/LINUX/windows10](0_AWS/3_SSH__.md)

### Api_Gateway
- [# AWS ApiGateway:](0_AWS/Api_Gateway/0_AWS_API_gateway_.md)
- [CI/CD and Container Orchestration with Amazon ECS](0_AWS/AWS_ECS_complete_cicd_.md)
- [## VPC ==> HAS security Group](0_AWS/AWS_Networking_VPC_SUBNET_SG.md)

### CICD
- [# CodePipeline:](0_AWS/CICD/0_aws_codePipeline_.md)
- [AWS CI/CD Pipeline Guide](0_AWS/CICD/2__aws_cicd__.md)
- [CloudWatch ](0_AWS/CloudWatch_.md)

### Cognito
- [0 cognito ](0_AWS/Cognito/0_cognito_.md)

### EC2
- [# EC2 :](0_AWS/EC2/0_EC2_.md)
- [# Security Groups : for Network security in AWS](0_AWS/EC2/1_EC2_SecutityGroups.md)

### ECS
- [🚀 How Scaling Works in ECS with EC2 (Launch Type)](0_AWS/ECS/0_How_ECS_auto_scales_.md)
- [# 1️⃣ Relationship Between ECS, EC2, and Tasks](0_AWS/ECS/0_How_ECS_EC2_Task_scales_.md)
- [1️⃣ How ALB Knows About ECS Tasks?](0_AWS/ECS/1_Scaling_and_ALB_.md)
- [ECS Cluster Architecture (EC2 Launch Type)](0_AWS/ECS/1_Scaling_Scenerio.md)
- [# Launch Docker Container = Launch ECS Tasks on ECS Cluster](0_AWS/ECS/How_ECS_instance_launched.md)
- [SuumaryOf ECS ](0_AWS/ECS/SuumaryOf_ECS_.md)
- [## 1) Cluster : have infrastructure - EC2 or Fargate ( like OS for running Code)](0_AWS/ECS/_ECS_.md)
- [General deployment process](0_AWS/General_deployment_process.md)
- [IAM Task TargetRole TargetGroup SecurityGroup](0_AWS/IAM_Task_TargetRole_TargetGroup_SecurityGroup.md)

### Lambda
- [🔹 Best Practices for Handling Database Connections in AWS Lambda](0_AWS/Lambda/0.1_db_connection_.md)
- [AWS Lambda Container Reuse](0_AWS/Lambda/0_how_lamdba_works_.md)
- [## Max Execution Time: 900 sec = 15 min](0_AWS/Lambda/0_lambda_limits_0.md)
- [🔹 AWS Lambda: Synchronous vs. Asynchronous Invocation](0_AWS/Lambda/0_lambda_limits_1_summary.md)
- [# Using a Singleton Approach (Recommended)](0_AWS/Lambda/1_ex_lambds.md)
- [1 step function](0_AWS/Lambda/1_step_function.md)
- [2 event mapping ](0_AWS/Lambda/2_event_mapping_.md)
- [# 1) When you create serverless application and deploy it on aws lambda you have to integrate awsApiGateWay to your lambda service :](0_AWS/Lambda/Lambda_awsApiGateWay.md)
- [# serverless.yml Templete](0_AWS/Lambda/Lambda_serverlessYml.md)
- [Readme](0_AWS/Readme.md)

### SQS
- [# Amazon SQS Message Limits](0_AWS/SQS/SQS_0_.md)
- [# Check Queue List:](0_AWS/SQS/SQS_SAM_.md)

### TagretGroup+ALB+ECS
- [0 TargetGroup](0_AWS/TagretGroup+ALB+ECS/0_TargetGroup.md)
- [✅ ECS + ALB Health Check Behavior: Failure Handling Scenarios](0_AWS/TagretGroup+ALB+ECS/2_AWS_Target_group_how_failure_handles_.md)
- [Target Groups:](0_AWS/TagretGroup+ALB+ECS/AWS_Target_Group_Health_check_Rolback.md)

### 0_AWS_SAM
- [What Is SAM?](0_AWS_SAM/0_sam_all_.md)
- [## So stack name is what cloudformation will use to decide which resource to be deleted if removed from template](0_AWS_SAM/0_sam_stack_creta_update_delete_.md)
- [SAM: Serverless Aplication Model [IaC - Infrastructure as Code]](0_AWS_SAM/0_sam_working_.md)
- [# How?](0_AWS_SAM/1.0_sam_deploy_cloudformation_.md)
- [How AWS SAM Handles IAM Roles & Policies](0_AWS_SAM/1.2_sam_IAM_VPC_SG_ACL.md)
- [🔍 How sam local invoke Works](0_AWS_SAM/1.2_sam_invoke_working_.md)
- [🛠 Example: Debugging Step-by-Step](0_AWS_SAM/2.1_sam_local_debug_.md)
- [# Check Queue List:](0_AWS_SAM/3.1_sam_sqs_cmd_.md)
- [🔹 AWS SAM Commands & Their Functions](0_AWS_SAM/3.2_sam_cmd_.md)
- [Layers & Deployment](0_AWS_SAM/3_sam_layers.md)

### example
- [# Steps:](0_AWS_SAM/example/0_create_sam_.md)

### 0_AWS_SAM_Localstack
- [## 1️⃣ sam build](0_AWS_SAM_Localstack/0_how_sam_deployes_SQS_lambda_in_localstack.md)
- [1. start localstack container](0_AWS_SAM_Localstack/0_sam_general_steps_.md)
- [# Build single function:](0_AWS_SAM_Localstack/1_sam_lambda_deploy.md)
- [✅ Running Both Lambda & SQS in LocalStack: CMD](0_AWS_SAM_Localstack/ex1_create_lambda_sqs_cmd.md)
- [✅ Best Approach: Using AWS SAM with LocalStack](0_AWS_SAM_Localstack/ex2_using_localstack_sam_.md)
- [🔹 AWS SQS + Lambda Setup: Manual AWS CLI vs. LocalStack + SAM](0_AWS_SAM_Localstack/localstack_approach_comparison.md)

### 0_AWS_sdk_v2_v3
- [0 aws sdk v2 vs v3](0_AWS_sdk_v2_v3/0_aws_sdk_v2_vs_v3.md)
- [Accessing AWS SQS using AWS SDK v2 and v3](0_AWS_sdk_v2_v3/1_aws_sdk_sqs_.md)
- [Accessing AWS DynamoDB using AWS SDK v2 and v3](0_AWS_sdk_v2_v3/2_aws_sdk_dynamodb_.md)
- [Accessing AWS RDS using AWS SDK v2 and v3](0_AWS_sdk_v2_v3/3_aws_sdk_rds_.md)
- [Accessing AWS S3 using AWS SDK v2 and v3](0_AWS_sdk_v2_v3/4_aws_sdk_s3.md)
- [Accessing AWS SES using AWS SDK v2 and v3](0_AWS_sdk_v2_v3/5_aws_sdk_ses_.md)
- [Accessing AWS Lambda using AWS SDK v2 and v3](0_AWS_sdk_v2_v3/6_aws_sdk_lambda_.md)
- [DynamoDB Upsert (Update or Insert) Guide](0_AWS_sdk_v2_v3/dynamodb_upsert_guide.md)

### 0_AWS_Serverless
- [0 how serverless deploy works](0_AWS_Serverless/0_how_serverless_deploy_works.md)
- [# How Serverless works?](0_AWS_Serverless/0_sls_.md)
- [# How?](0_AWS_Serverless/0_sls_sam_deployment_.md)
- [Serverless Overview](0_AWS_Serverless/1_serverless__.md)
- [# 1) install serverless](0_AWS_Serverless/SLS_Template.md)
- [# Required User Roles:](0_AWS_Serverless/sls_user_roles_.md)

### 1_OS
- [What is BIOS](1_OS/0.1__os__.md)
- [How an Operating System Loads](1_OS/0.2_How_OS_loads_.md)
- [Scheduler](1_OS/10.1_scheduler_.md)
- [Process Life Cycle](1_OS/10_states_of_process_.md)
- [11 Context switching ](1_OS/11_Context_switching_.md)
- [Understanding Processes and Threads](1_OS/3_multitask_multithread.md)
- [Operating System Components](1_OS/4_OS_components_.md)
- [System Calls](1_OS/5_system_calls_.md)
- [How the Operating System Boots Up](1_OS/6_OS_System_boot_up.md)
- [Understanding 32-bit and 64-bit Systems](1_OS/7-8_32_bit_64_bit_.md)
- [## so thread is part of process? and it get assigned stack will it also from process stack? : YES: created by OS in kernal SPace : yes](1_OS/9.1_Thread_.md)
- [Key Differences: Heap vs Stack](1_OS/9.2.0_Stack_vs_heap_.md)
- [9.2.1.1 how inter process comm ](1_OS/9.2.1.1_how_inter_process_comm_.md)
- [Heap Allocation and Sharing](1_OS/9.2.1_Heap_common_for_all_thread_exec_context.md)
- [Understanding Processes](1_OS/9_Process_.md)
- [Device Driver vs Controller](1_OS/difference_DeviceController_deviceDrivers_.md)
- [Node.js: Single Threaded Processing](1_OS/How_node_processes_millions_of_request_on_single_thread.md)
- [How OS Interacts with Devices](1_OS/How_OS_interacts_with_devices_.md)

### OS_by_Abraham_
- [0 os ](1_OS/OS_by_Abraham_/0_os_.md)
- [1 IO stru ](1_OS/OS_by_Abraham_/1_IO_stru_.md)

### 2_Networking
- [## How DNS is Resolved in Browser :](2_Networking/0_browser__.md)
- [0 dns  ](2_Networking/0_dns__.md)
- [0 Proxy  reverseProxy  ](2_Networking/0_Proxy__reverseProxy__.md)
- [General flow:](2_Networking/0_summary_.md)
- [## cmd](2_Networking/0_Tarck_ip__traceRoute__.md)
- [# Can you explain and TLS and what are the significance it has](2_Networking/0_TLS_Handshake__.md)
- [1  newroking  ](2_Networking/1__newroking__.md)
- [# Network Layers and Data Encapsulation](2_Networking/2__TCP_IP_newroking__.md)
- [# Q] how device know if destination ip is in local network or external netwrok](2_Networking/3.0_how_device_finds_if_destination_IP_in_local_or_external_network_.md)
- [so generally what happens is](2_Networking/3.1.1_process_request_TCP_PACKET_FRAME_IP_MAC_ARP_NAT.md)
- [Network Cycle](2_Networking/3.1.2_corrected_network_cycle.md)
- [DHCP, ARP, NAT in Router](2_Networking/3.1_DHCP_ARP_NAT.md)
- [Do router uses ARP](2_Networking/3.1_do_router_uses_ARP_.md)
- [## Process from app to server to app](2_Networking/3.2_how_devices_locates_ex_whatsapp_msg_.md)
- [3 practical networking ](2_Networking/3_practical_networking_.md)
- [Internal Network Communication](2_Networking/4_internal_network_.md)
- [Communication with External Network](2_Networking/5_external_network_.md)

### Examples
- [🚀 How `application/octet-stream` Works in Video Uploads](2_Networking/Examples/1_tcp_http_octet_upload_.md)
- [🚀 How HTTP Works with Multipart Form-Data Uploads (Behind the Scenes of TCP & HTTP)](2_Networking/Examples/2_tcp_http_mulipart_upload.md)
- [index](2_Networking/index.md)

### Nvidia_coursera_network
- [Introduction to Network](2_Networking/Nvidia_coursera_network/1_intro_to_network.md)
- [Welcome to TCP/IP Protocol Suite Course](2_Networking/Nvidia_coursera_network/2_TCP_IP_.md)
- [7] Application Layer Protocols:](2_Networking/Nvidia_coursera_network/2_TCP_IP_protocols.md)

### Packet_Tracing
- [Packet Routing Process](2_Networking/Packet_Tracing/1_packet__to_destiantion_.md)
- [## ARP: IP address to MAC address mapping](2_Networking/Packet_Tracing/2_ARP_.md)
- [Subnettting: dividing Ip address into sub addresses](2_Networking/Packet_Tracing/3_subnetting_.md)
- [Readme](2_Networking/Readme.md)

### summary
- [📡 Packet Routing Process](2_Networking/summary/0_packet_routing_.md)

### 3_SystemDesign
- [Deployment Strategies](3_SystemDesign/1__deployment_strategies__.md)
- [Network Communication Process](3_SystemDesign/1__newroking__.md)
- [Network Encapsulation Process](3_SystemDesign/2__newroking__.md)
- [Rate Limiting:](3_SystemDesign/2__rate_limiting__.md)
- [# ACID](3_SystemDesign/ACID_0.md)
- [⚙ A — Atomicity](3_SystemDesign/ACID_1_.md)
- [# ✅ Lock Conflicts in SQL Databases](3_SystemDesign/ACID_2_I_lock_1.md)
- [# Eaxmple booking systems](3_SystemDesign/ACID_2_I_Lock_2.md)

### BatchProcessing
- [# What needs to process? - object, system analysis](3_SystemDesign/BatchProcessing/0_Analysis_.md)
- [Objective: Design Course assignment System](3_SystemDesign/BatchProcessing/1_requirement_.md)
- [# 💡 Note on SQL Databases](3_SystemDesign/CAP_0.md)
- [# ✅ What is Partition Tolerance?](3_SystemDesign/CAP_AP_0.md)
- [# 💡 Key Concepts That Make AP Possible:](3_SystemDesign/CAP_AP_1.md)
- [# How Consistency is managed? (CP system)](3_SystemDesign/CAP_CP_0.md)
- [# 🔁 Quick Comparison: CP vs AP](3_SystemDesign/CAP_CP_VS_AP.md)
- [# Distributed system](3_SystemDesign/CAP_Theorem.md)
- [# in cloud computing:](3_SystemDesign/Cloud_Server_.md)

### DB
- [SHARDING : to Optimize](3_SystemDesign/DB/1_SHARDING__.md)
- [# Sharding and Consistent Hashing Explained](3_SystemDesign/DB/2_Consistent_Hashing_.md)

### demo

### src

### main

### java

### com

### LLD

### Patterns

### ObserverPattern
- [Patterns](3_SystemDesign/demo/src/main/java/com/LLD/Patterns/ObserverPattern/Patterns.md)

### target

### classes

### com

### LLD

### Patterns

### ObserverPattern
- [Patterns](3_SystemDesign/demo/target/classes/com/LLD/Patterns/ObserverPattern/Patterns.md)

### HLD
- [# Topics To  Cover :](3_SystemDesign/HLD/Readme.md)

### SNS_Push_notifications
- [# Push Notifications General Flow :](3_SystemDesign/HLD/SNS_Push_notifications/SNS_Push_Notifications.md)

### spotify
- [Spotify Design](3_SystemDesign/HLD/spotify/Spotify_design.md)
- [# **1. Requirements Gathering**](3_SystemDesign/HLD/stock_market_design.md)

### VideoStreamApp
- [# Requirement](3_SystemDesign/HLD/VideoStreamApp/Design_.md)

### VideoUpload
- [🚀 Efficient & Fast Video Upload Approaches](3_SystemDesign/HLD/VideoUpload/0_vdo_upload.md)
- [# **🔹 Uploading Large Files to S3 Using Pre-Signed URLs and Multipart Upload**](3_SystemDesign/HLD/VideoUpload/1_vdo_large_file_upload_s3_presigned.md)
- [Large File Upload to S3 Using Pre-Signed URLs & Processing with Lambda](3_SystemDesign/HLD/VideoUpload/2_vdo_large_file_upload_s3_lambda_.md)
- [#](3_SystemDesign/how_request_works__dns_.md)

### LLD_Design_Patterns
- [# Chain Of Responibilty Pattern](3_SystemDesign/LLD_Design_Patterns/3_ChainOfResponsibiltyPattern_logging.md)
- [index](3_SystemDesign/LLD_Design_Patterns/index.md)
- [# Creations](3_SystemDesign/LLD_Design_Patterns/overview.md)

### OAuth2-cognito
- [# ✅ What Is a Cognito User Pool?](3_SystemDesign/OAuth2-cognito/Cognito_.md)
- [# Cognito Sign Up](3_SystemDesign/OAuth2-cognito/Cognito_1_sign_up_.md)
- [# ✅ Architecture: Amplify + Cognito (Frontend Auth) + Backend (Token Verification)](3_SystemDesign/OAuth2-cognito/Cognito_2.1_sign_in.md)
- [# Cognito Sign In:](3_SystemDesign/OAuth2-cognito/Cognito_2_sing_in_.md)
- [# ✅ What is JWKS?](3_SystemDesign/OAuth2-cognito/JWKS_.md)
- [Project Shortcuts](3_SystemDesign/Readme.md)
- [# 1. Single Responsibility Principle](3_SystemDesign/SOLID_.md)
- [# SSO](3_SystemDesign/SSO_.md)
- [1. Docker](3_SystemDesign/topics.md)
- [Upload site to s3](3_SystemDesign/Upload_site_to_s3.md)
- [  Proxy  reverseProxy  ](3_SystemDesign/__Proxy__reverseProxy__.md)
- [Transport Layer Security (TLS)](3_SystemDesign/__TLS_Handshake__.md)

### 4_DataBase_RDS_DynamoDB

### DynamoDB
- [1️⃣ How Does LSI Work?](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.1.1_GSI_LSI_.md)
- [# Link [GSI VS LSI](https://www.dynamodbguide.com/local-or-global-choosing-a-secondary-index-type-in-dynamo-db/)](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.1.1_GSI_VS_LSI_.md)
- [1️⃣ What If an Item Doesn’t Have a Sort Key?](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.1.2_Questions_.md)
- [# How Partion key, composite key, sort key, GSI and LSI is used](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.1_keys_.md)
- [DynamoDB Query Processing: Hashing & Indexing Explained](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.2.1_Internals_.md)
- [How data is stored in DynamoDB](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.2_How_Data_Stored_.md)
- [# ✅ DynamoDB Performance: No Issues If WCU & RCU Are Sufficient](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_1.2_limit.md)
- [1. Capacity & Throughput Limits](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_1_limits.md)
- [🔹 DynamoDB Read & Write Operations - Full Comparison Table](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_2.0_read_write_cmds_.md)
- [📌 Getting Data from DynamoDB: Two Main Methods](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_2.1_get_.md)
- [🛠️ Why Both Transactions and BatchWriteItem in DynamoDB?](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_2.2_update_batchWrite_vs_transaction_.md)
- [DynamoDB RCU & WCU Calculation](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_2_RCU_WCU_cal_.md)
- [🛠 Best Practices for System Design](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_3_sd.md)
- [# DynamoDB](4_DataBase_RDS_DynamoDB/DynamoDB/Dynamodb_4_cost_.md)
- [# DynamoDB Command Support Matrix](4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_5_cmd_.md)
- [EntityRelations](4_DataBase_RDS_DynamoDB/EntityRelations.md)
- [# 1. Storage Limits](4_DataBase_RDS_DynamoDB/RDS_0.md)
- [# Key Differences: Data API vs. Traditional HTTP-DB Request](4_DataBase_RDS_DynamoDB/RDS_API_1.md)
- [# DynamoDB vs. RDS (MySQL Default) Comparison](4_DataBase_RDS_DynamoDB/RDS_VS_DynamoDB_.md)
- [# Check indexes Query:](4_DataBase_RDS_DynamoDB/SQL_.md)

### 4_Docker
- [## Commands and Explanations:](4_Docker/2_docker_networking_.md)
- [#          Docker Image + Container Commands](4_Docker/docker.md)
- [## cmd : docker run -d --name my-redis-container -p 6379:6379 redis](4_Docker/Redis_container.md)
- [  how docker works  ](4_Docker/__how_docker_works__.md)

### 5_Auth_JWT
- [# 1. Register on Cognito](5_Auth_JWT/CognitoAuth.md)

### 6_Node_Dev
- [# What Happens when run cmd `node app.js`?](6_Node_Dev/0_how_node_start_exe_func.md)
- [How V8 works:](6_Node_Dev/0_Node_.md)
- [# Node = V8 engine + Libuv](6_Node_Dev/0_Node_Details.md)
- [# Resident Set Size:](6_Node_Dev/0_Node_rss_memory.md)
- [# CommonJS Modules vs ES Modules](6_Node_Dev/1_node_.md)
- [✅ Does V8 Manage the Event Loop? No! libuv Does! 🚀](6_Node_Dev/2_node_event_loop_.md)
- [# Do event loop is part of libuv?](6_Node_Dev/3_node_event_loop_libuv.md)
- [📌 Event Queues in JavaScript: Microtask & Macrotask Queues](6_Node_Dev/4_node_event_loop_queue_.md)
- [🛠 How Node.js Resolves Modules (require & import)](6_Node_Dev/5.1_require_import_.md)
- [4️⃣ Comparison: `require()` vs `import()` for Lazy Loading](6_Node_Dev/5.2_require_vs_import_.md)
- [CommonJS vs. ES Modules in Node.js](6_Node_Dev/5_commonJs_vs_ESM_.md)
- [## 1. check outdated pkg and lates version](6_Node_Dev/Node_CMD.md)
- [# 1. How vdo,music,docs,img : read-write works](general.md)
- [How git works?](git.md)
- [Branch](git_cmds_.md)
- [# What if have 2 account ?](git_cmds_account_.md)
- [# Merge Strategy:](git_merge_strategy_.md)

### JAVA
- [# Streams :](JAVA/0_Streams_.md)
- [# Maven Life Cycle :](JAVA/1.1.2_maven_lifecycle_.md)
- [# POM : Project Object Model](JAVA/1.1_pom_.md)
- [# Why Can't the Main Module Be Packaged as JAR?](JAVA/1.2_maven_module_structure_.md)
- [# Maven :](JAVA/1_maven_.md)
- [# JDBC :](JAVA/2_JDBC_.md)
- [# Hibernate Structure :](JAVA/3.0_Hibernate_Arch_.md)
- [# JPA : Java Persistence API](JAVA/3.1.0_JPA_.md)
- [# Hibernate with JPA](JAVA/3.1.1_Hibernate_JPA_.md)
- [# ! Mapping of POJO clasess/Entity Bean Class Using Annotation](JAVA/3.1.2_Hibernate_JPA_Mapping_.md)
- [# Hibernate](JAVA/3_Hibernate_.md)
- [# Depnedency](JAVA/4_Server_Config_.md)

### SpringBoot
- [# ✅ **Spring Ecosystem Evolution Overview**](JAVA/SpringBoot/0_before_spring_boot.md)
- [# Spring Boot](JAVA/SpringBoot/1_spring_boot.md)
- [@Valid: for validations](JAVA/SpringBoot/2.1_spring_boot_request_validation_.md)
- [@Controller](JAVA/SpringBoot/2_spring_boot_request_handling.md)
- [# Request:](JAVA/what_when_.md)

### JMeter
- [# How to install JMeter?](JMeter/1_Setup.md)
- [# JMeter : working](JMeter/Jmeter.md)
- [📌 Possible Failure Scenarios in Load Testing](JMeter/SystemFailure.md)

### keycloak_
- [1 keycloak TLS config](keycloak_/1_keycloak_TLS_config.md)
- [# steps:](keycloak_/keyclaok.md)

### NestJs
- [# What is NestJS?](NestJs/0_nestJs_.md)
- [# Order of Execution](NestJs/execution_order.md)
- [# Divide in 3 Parts:](NestJs/NestJs_structure.md)
- [## IMP CMD](NestJs/NestJs_Typescript.md)
- [# Onet-to-Many :](NestJs/TypeOrm_.md)
- [# so mockImplementation actually do not run original method but directly return value we provide in that arrow function](NestJs/unit_test..md)
- [## NPM vs NPX](NPM_VS_NVM.md)
- [# 1. Install WSL :](NVM_in_WSL_.md)

### React_Angular

### Angular

### AngularTesting
- [# How Testing Works in Angulat ?](React_Angular/Angular/AngularTesting/0_angular_test_.md)
- [# Mocking API:](React_Angular/Angular/AngularTesting/1_angular_test_mock_api.md)
- [# Structure :](React_Angular/Angular/Angular_0.md)
- [# How Angualr works?](React_Angular/Angular/Angular_1_basic.md)
- [# Possible ways to create Angular](React_Angular/Angular/Angular_2.md)
- [Auth Guard :](React_Angular/Angular/Angular_3.md)
- [Angular 4 Observable Promise](React_Angular/Angular/Angular_4_Observable_Promise.md)
- [# Observable vs ReplaySubject](React_Angular/Angular/Angular_4_Observable_ReplySubject.md)
- [# React : Library + SPA](React_Angular/React.md)
- [Project Documentation](Readme.md)
- [# Roadmap for year 2024](Roadmap.md)
- [# Daily: 4 Hr](routine.md)

### RustEx

### Rust_theory
- [3 preload ](RustEx/Rust_theory/3_preload_.md)

### SonarQube
- [general](SonarQube/general.md)
- [striker](striker.md)

### Testing
- [Jest Karma mocha](Testing/Jest_Karma_mocha.md)
- [# Karma : for testing in Browser](Testing/jest_vs_karma.md)

### VideoProcessing
- [What is MP4?](VideoProcessing/0.1_basic_mp4_.md)
- [🔍 How Does a Video Player Read MP4?](VideoProcessing/0.2_how_video_player_reads_.md)
- [🎥 Why MP4 is Better for Streaming](VideoProcessing/0.2_mp4_vs_mkv_stream.md)
- [DASH vs. HLS: Key Differences](VideoProcessing/0.3_HLS_DASH_.md)
- [Video-Related Terms Explained](VideoProcessing/0_vdo_terms.md)
- [Components of a Video File](VideoProcessing/1_steps_.md)
- [# Understanding Container Formats](VideoProcessing/2_Parse_Video_container_format.md)

### MediaPlayer
- [## Hierarchical Structure:](VideoProcessing/MediaPlayer/1_parsing_video_meta_data_.md)
- [📌 How to Identify the Type of Data in a Media File](VideoProcessing/MediaPlayer/3_atom_audio_vdo_.md)
- [🚀 How HTTP Works with Multipart Form-Data Uploads (Behind the Scenes of TCP & HTTP)](VideoProcessing/tcp_http_mulipart_upload.md)

### VideoUpload
- [🚀 Efficient & Fast Video Upload Approaches](VideoProcessing/VideoUpload/0_vdo_upload.md)
- [# **🔹 Uploading Large Files to S3 Using Pre-Signed URLs and Multipart Upload**](VideoProcessing/VideoUpload/1_vdo_large_file_upload_s3_presigned.md)
- [Large File Upload to S3 Using Pre-Signed URLs & Processing with Lambda](VideoProcessing/VideoUpload/2_vdo_large_file_upload_s3_lambda_.md)

### _DSA_NeetCode
- [Bubble sort : swap each time if max](_DSA_NeetCode/sort.md)
- [EXOR : use for canceling same elements](_DSA_NeetCode/tips.md)

### _JsTutorials
- [JavasriptTopics](_JsTutorials/JavasriptTopics.md)

### PromisesAndAsync
- [**Understanding Promises in Node.js**](_JsTutorials/PromisesAndAsync/0_Promise_in_node_.md)
- [use strict](_JsTutorials/use_strict.md)

### _Ts
- [## 1. extends :](_Ts/0_extends_.md)
- [0 Practice ](_Ts/0_Practice_.md)
