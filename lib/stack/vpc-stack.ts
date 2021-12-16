import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Subnet } from '../resource/subnet';
import { Vpc } from '../resource/vpc';

export class VpcStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // VPC
        const vpc = new Vpc(this);

        // Subnet
        new Subnet(this, vpc);
    }
}
