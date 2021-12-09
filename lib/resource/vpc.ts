import { Construct } from 'constructs';
import { CfnVPC } from 'aws-cdk-lib/aws-ec2';
import { Resource } from './abstract/resource';

export class Vpc extends Resource {
    public vpc: CfnVPC;

    constructor() {
        super();
    };

    createResources(scope: Construct) {
        this.vpc = new CfnVPC(scope, 'Vpc', {
            cidrBlock: '10.0.0.0/16',
            tags: [{
                key: 'Name',
                value: this.createResourceName(scope, 'vpc')
            }]
        });
    }
}
