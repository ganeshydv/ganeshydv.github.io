### So stack name is what cloudformation will use to decide which resource to be deleted if removed from template

Yes, the stack name is the unique identifier that CloudFormation uses to manage all resources in a deployment.

- When you run sam deploy (or aws cloudformation deploy), you specify a stack name.
- CloudFormation keeps track of all resources it created for that stack, using the logical IDs in your template.
- If you remove a resource from the template and redeploy with the same stack name, CloudFormation will:
  - See that the resource is no longer defined in the template.
  - Delete that resource from AWS (unless it has a Retain deletion policy).


# AWS SAM Resource Update Behaviors

This table outlines how different AWS SAM resources behave during stack updates, based on their presence and changes in the stack.

| Resource Type                 | If Not Exists in Stack | If Exists & Changed                        | If Exists & Unchanged | If Removed from Template |
|-------------------------------|------------------------|--------------------------------------------|-----------------------|--------------------------|
| AWS::Serverless::Api          | Created                | Updated (in-place or replaced)             | No action             | Deleted                  |
| AWS::Serverless::Function     | Created                | Updated (code/config change)               | No action             | Deleted                  |
| AWS::Serverless::LayerVersion | Created                | Updated (new version created)              | No action             | Deleted                  |
| AWS::Serverless::SimpleTable  | Created                | Replacement (if schema changes)            | No action             | Deleted                  |
| AWS::Serverless::StateMachine | Created                | Updated (definition/config change)         | No action             | Deleted                  |
| AWS::Serverless::Application  | Created                | Updated (if nested app changes)            | No action             | Deleted                  |
| AWS::ApiGateway::VpcLink      | Created                | Updated                                    | No action             | Deleted                  |
| AWS::Logs::LogGroup           | Created                | Updated (e.g., retention)                  | No action             | Deleted                  |
| AWS::SQS::Queue               | Created                | Updated (some props, some require replacement) | No action          | Deleted                  |
| AWS::SNS::Topic               | Created                | Updated (e.g., display name)               | No action             | Deleted                  |
| AWS::DynamoDB::Table          | Created                | Replacement (if key schema changes)        | No action             | Deleted                  |
| AWS::SSM::Parameter           | Created                | Updated (value change)                     | No action             | Deleted                  |
| AWS::IAM::Role                | Created                | Updated (policy/permissions change)        | No action             | Deleted                  |
| AWS::CloudWatch::Alarm        | Created                | Updated (thresholds, metrics)              | No action             | Deleted                  |
| AWS::StepFunctions::StateMachine | Created             | Updated (definition/config change)         | No action             | Deleted                  |


##  if sam deploy fails for some resources does it means it will rollback for all resources
- Yes, if sam deploy (which uses AWS CloudFormation) fails for any resource during deployment or update, CloudFormation will attempt to roll back the entire stack to its previous stable state.

- What does this mean?
   - All resources created or updated in the failed deployment will be rolled back (deleted or reverted to their previous state).
   - Resources that were not changed in this deployment will remain as they were.
   - If this is a new stack creation and it fails, all resources created so far will be deleted.
   - If this is an update to an existing stack, CloudFormation will try to revert all changes made during this deployment.

- Exceptions
   - If rollback itself fails (e.g., due to permissions issues), the stack may end up in a ROLLBACK_FAILED or UPDATE_ROLLBACK_FAILED state and require manual intervention.