import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecurityGroup } from '../resource/security-group';
import { VpcStack } from './vpc-stack';

export class Ec2Stack extends Stack {
    constructor(scope: Construct, id: string, vpcStack: VpcStack, props?: StackProps) {
        super(scope, id, props);

        // Security Group
        const securityGroup = new SecurityGroup(this, vpcStack.vpc);
    }
}
