import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ElasticIp } from '../resource/elastic-ip';
import { InternetGateway } from '../resource/internet-gateway';
import { NatGateway } from '../resource/nat-gateway';
import { Subnet } from '../resource/subnet';
import { Vpc } from '../resource/vpc';

export class VpcStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // VPC
        const vpc = new Vpc(this);

        // Subnet
        const subnet = new Subnet(this, vpc);

        // Internet Gateway
        new InternetGateway(this, vpc);

        // Elastic IP
        const elasticIp = new ElasticIp(this);

        // NAT Gateway
        new NatGateway(this, subnet, elasticIp);
    }
}
