import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Role } from '../resource/role';

export class IamStack extends Stack {
    public readonly role: Role;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Role
        this.role = new Role(this);
    }
}
