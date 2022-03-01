import { CfnDBClusterParameterGroup, CfnDBParameterGroup } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";

export class RdsParameterGroup extends BaseResource {
    public readonly cluster: CfnDBClusterParameterGroup;
    public readonly instance: CfnDBParameterGroup;

    constructor(scope: Construct) {
        super();

        this.cluster = new CfnDBClusterParameterGroup(scope, 'RdsDbClusterParameterGroup', {
            description: 'Cluster Parameter Group for RDS',
            family: 'aurora-mysql5.7',
            parameters: { time_zone: 'UTC' }
        });

        this.instance = new CfnDBParameterGroup(scope, 'RdsDbParameterGroup', {
            description: 'Parameter Group for RDS',
            family: 'aurora-mysql5.7'
        });
    }
}
