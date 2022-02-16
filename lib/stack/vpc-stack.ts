import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ElasticIp } from '../resource/elastic-ip';
import { InternetGateway } from '../resource/internet-gateway';
import { NatGateway } from '../resource/nat-gateway';
import { NetworkAcl } from '../resource/network-acl';
import { RouteTable } from '../resource/route-table';
import { Subnet } from '../resource/subnet';
import { Vpc } from '../resource/vpc';

export class VpcStack extends Stack {
    public readonly vpc: Vpc;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // VPC
        this.vpc = new Vpc(this);

        // Subnet
        const subnet = new Subnet(this, this.vpc);

        // Internet Gateway
        const internetGateway = new InternetGateway(this, this.vpc);

        // Elastic IP
        const elasticIp = new ElasticIp(this);

        // NAT Gateway
        const natGateway = new NatGateway(this, subnet, elasticIp);

        // Route Table
        new RouteTable(this, this.vpc, subnet, internetGateway, natGateway);

        // Network ACL
        new NetworkAcl(this, this.vpc, subnet);
    }
}
