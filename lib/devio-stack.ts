import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IamStack } from './stack/iam-stack';
import { VpcStack } from './stack/vpc-stack';

export class DevioStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // VPC Stack
    new VpcStack(scope, 'VpcStack', {
      stackName: this.createStackName(scope, 'vpc')
    });

    // IAM Stack
    new IamStack(scope, 'IamStack', {
      stackName: this.createStackName(scope, 'iam')
    });
  }

  private createStackName(scope: Construct, originalName: string): string {
    const systemName = scope.node.tryGetContext('systemName');
    const envType = scope.node.tryGetContext('envType');
    const stackNamePrefix = `${systemName}-${envType}-stack-`;

    return `${stackNamePrefix}${originalName}`;
  }
}
