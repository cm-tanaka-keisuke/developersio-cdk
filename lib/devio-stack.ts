import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from './resource/vpc';
import { Subnet } from './resource/subnet';
import { InternetGateway } from './resource/internetGateway';
import { ElasticIp } from './resource/elasticIp';
import { NatGateway } from './resource/natGateway';
import { RouteTable } from './resource/routeTable';
import { NetworkAcl } from './resource/networkAcl';
import { IamRole } from './resource/iamRole';
import { SecurityGroup } from './resource/securityGroup';
import { Ec2 } from './resource/ec2';
import { Alb } from './resource/alb';
import { SecretsManager } from './resource/secretsManager';
import { Rds } from './resource/rds';

export class DevioStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc();
    vpc.createResources(this);

    // Subnet
    const subnet = new Subnet(vpc.vpc);
    subnet.createResources(this);

    // Internet Gateway
    const internetGateway = new InternetGateway(vpc.vpc);
    internetGateway.createResources(this);

    // Elastic IP
    const elasticIp = new ElasticIp();
    elasticIp.createResources(this);

    // NAT Gateway
    const natGateway = new NatGateway(
      subnet.public1a,
      subnet.public1c,
      elasticIp.ngw1a,
      elasticIp.ngw1c
    );
    natGateway.createResources(this);

    // Route Table
    const routeTable = new RouteTable(
      vpc.vpc,
      subnet.public1a,
      subnet.public1c,
      subnet.app1a,
      subnet.app1c,
      subnet.db1a,
      subnet.db1c,
      internetGateway.igw,
      natGateway.ngw1a,
      natGateway.ngw1c
    );
    routeTable.createResources(this);

    // Network ACL
    const networkAcl = new NetworkAcl(
      vpc.vpc,
      subnet.public1a,
      subnet.public1c,
      subnet.app1a,
      subnet.app1c,
      subnet.db1a,
      subnet.db1c
    );
    networkAcl.createResources(this);

    // IAM Role
    const iamRole = new IamRole();
    iamRole.createResources(this);

    // Security Group
    const securityGroup = new SecurityGroup(vpc.vpc);
    securityGroup.createResources(this);

    // EC2
    const ec2 = new Ec2(
      subnet.app1a,
      subnet.app1c,
      iamRole.instanceProfileEc2,
      securityGroup.ec2
    );
    ec2.createResources(this);

    // ALB
    const alb = new Alb(
      vpc.vpc,
      subnet.public1a,
      subnet.public1c,
      securityGroup.alb,
      ec2.instance1a,
      ec2.instance1c
    );
    alb.createResources(this);

    // Secrets Manager
    const secretsManager = new SecretsManager();
    secretsManager.createResources(this);

    // RDS
    const rds = new Rds(
      subnet.db1a,
      subnet.db1c,
      securityGroup.rds,
      secretsManager.secretRdsCluster,
      iamRole.rds
    );
    rds.createResources(this);
  }
}
