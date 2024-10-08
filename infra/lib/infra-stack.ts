import * as cdk from "aws-cdk-lib";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { InterfaceVpcEndpointAwsService, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, "CognitoUserPool", {
      userPoolName: "ecs-docker-demo",
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireDigits: true,
        requireLowercase: true,
        requireUppercase: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
        givenName: {
          required: true,
          mutable: true,
        },
      },
    });

    userPool.addClient("CognitoUserPoolClient", {
      userPoolClientName: "ecs-docker-demo-client",
    });

    const vpc = new Vpc(this, "VPC", {
      maxAzs: 2,
      vpcName: "ecs-docker-demo-vpc",
    });

    vpc.addInterfaceEndpoint("ECR-endpoint", {
      service: InterfaceVpcEndpointAwsService.ECR,
    });
    vpc.addInterfaceEndpoint("ECR-Docker-endpoint", {
      service: InterfaceVpcEndpointAwsService.ECR_DOCKER,
    });
  }
}
