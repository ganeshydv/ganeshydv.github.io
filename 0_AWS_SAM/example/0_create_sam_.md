## Steps:
### 1. Initialize
```sh
sam init
```
- This will prompt you to choose:

1. Template source → Select AWS Quick Start Templates.
1. Runtime → Choose nodejs18.x.
1. Choose zip or Image
1. Application template → Select SQS Processor for an SQS-triggered Lambda.
1. Project name → Provide a name like lambda-sqs-app.
- After running this, SAM will generate a project with a template.yaml file.
