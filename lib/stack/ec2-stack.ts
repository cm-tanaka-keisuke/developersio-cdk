import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Instance } from '../resource/instance';
import { SecurityGroup } from '../resource/security-group';
import { TargetGroup } from '../resource/target-group';
import { IamStack } from './iam-stack';
import { VpcStack } from './vpc-stack';

export class Ec2Stack extends Stack {
    constructor(
        scope: Construct,
        id: string,
        vpcStack: VpcStack,
        iamStack: IamStack,
        props?: StackProps
    ) {
        super(scope, id, props);

        // Security Group
        const securityGroup = new SecurityGroup(this, vpcStack.vpc);

        // Instance
        const instance = new Instance(this, vpcStack.subnet, iamStack.role, securityGroup);

        // Target Group
        const targetGroup = new TargetGroup(this, vpcStack.vpc, instance);
    }
}
