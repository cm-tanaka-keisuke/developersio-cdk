import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Secret } from '../resource/secret';

export class SecretsManagerStack extends Stack {
    public readonly secret: Secret;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Secret
        this.secret = new Secret(this);
    }
}
