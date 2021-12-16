import { CfnVPC } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";

export class Vpc extends BaseResource {
    public readonly vpc: CfnVPC;

    constructor(scope: Construct) {
        super();

        this.vpc = new CfnVPC(scope, 'Vpc', {
            cidrBlock: '10.0.0.0/16',
            tags: [{
                key: 'Name',
                value: this.createResourceName(scope, 'vpc')
            }]
        });
    }
}
