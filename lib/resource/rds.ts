import * as cdk from '@aws-cdk/core';
import { CfnDBSubnetGroup } from '@aws-cdk/aws-rds';
import { CfnSubnet } from '@aws-cdk/aws-ec2';
import { Resource } from './abstract/resource';

export class Rds extends Resource {
    private readonly subnetDb1a: CfnSubnet;
    private readonly subnetDb1c: CfnSubnet;

    constructor(
        subnetDb1a: CfnSubnet,
        subnetDb1c: CfnSubnet,
    ) {
        super();
        this.subnetDb1a = subnetDb1a;
        this.subnetDb1c = subnetDb1c;
    };

    createResources(scope: cdk.Construct) {
        this.createSubnetGroup(scope);
    }

    private createSubnetGroup(scope: cdk.Construct): CfnDBSubnetGroup {
        const subnetGroup = new CfnDBSubnetGroup(scope, 'SubnetGroupRds', {
            dbSubnetGroupDescription: 'Subnet Group for RDS',
            subnetIds: [this.subnetDb1a.ref, this.subnetDb1c.ref],
            dbSubnetGroupName: this.createResourceName(scope, 'sng-rds')
        });

        return subnetGroup;
    }
}
