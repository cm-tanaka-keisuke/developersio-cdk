import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RdsSubnetGroup } from '../resource/rds-subnet-group';
import { VpcStack } from './vpc-stack';

export class RdsStack extends Stack {
    constructor(scope: Construct, id: string, vpcStack: VpcStack, props?: StackProps) {
        super(scope, id, props);

        // Subnet Group
        const subnetGroup = new RdsSubnetGroup(this, vpcStack.subnet);
    }
}
