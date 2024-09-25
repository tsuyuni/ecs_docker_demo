import { Stack, StackProps } from "aws-cdk-lib";
import { InterfaceVpcEndpointAwsService, Vpc } from "aws-cdk-lib/aws-ec2";
import { Repository } from "aws-cdk-lib/aws-ecr";
import {
  Cluster,
  ContainerImage,
  CpuArchitecture,
  FargateService,
  FargateTaskDefinition,
  OperatingSystemFamily,
} from "aws-cdk-lib/aws-ecs";
import {
  ApplicationLoadBalancer,
  ApplicationProtocol,
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import {
  Destination,
  DockerImageDeployment,
  Source,
} from "cdk-docker-image-deployment";
import { Construct } from "constructs";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

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

    const ecrRepository = new Repository(this, "ECRRepository", {
      repositoryName: "ecs-docker-demo-ecr-repository",
    });

    new DockerImageDeployment(this, "ExampleImageDeploymentWithTag", {
      source: Source.directory("./"),
      destination: Destination.ecr(ecrRepository, {
        tag: "latest",
      }),
    });

    const taskDefinition = new FargateTaskDefinition(this, "TaskDefinition", {
      runtimePlatform: {
        operatingSystemFamily: OperatingSystemFamily.LINUX,
        cpuArchitecture: CpuArchitecture.ARM64,
      },
    });

    taskDefinition.addContainer("AppContainer", {
      image: ContainerImage.fromEcrRepository(ecrRepository),
      portMappings: [
        {
          containerPort: 80,
        },
      ],
    });

    const cluster = new Cluster(this, "Cluster", {
      clusterName: "ecs-docker-demo-ecs-cluster",
      vpc,
    });

    const service = new FargateService(this, "Service", {
      cluster,
      taskDefinition,
    });

    const alb = new ApplicationLoadBalancer(this, "ApplicationLoadBalancer", {
      vpc: cluster.vpc,
      internetFacing: true,
    });

    const listener = alb.addListener("Listener", {
      port: 80,
    });

    const targetGroup = listener.addTargets("ECS", {
      protocol: ApplicationProtocol.HTTP,
      port: 80,
      targets: [service],
    });
  }
}
