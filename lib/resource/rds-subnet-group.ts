import { CfnDBSubnetGroup } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";
import { Subnet } from "./subnet";

export class RdsSubnetGroup extends BaseResource {
    public readonly subnetGroup: CfnDBSubnetGroup;

    constructor(scope: Construct, subnet: Subnet) {
        super();

        this.subnetGroup = new CfnDBSubnetGroup(scope, 'RdsDbSubnetGroup', {
            dbSubnetGroupDescription: 'Subnet Group for RDS',
            subnetIds: [subnet.db1a.ref, subnet.db1c.ref],
            dbSubnetGroupName: this.createResourceName(scope, 'rds-sng')
        });
    }
}
