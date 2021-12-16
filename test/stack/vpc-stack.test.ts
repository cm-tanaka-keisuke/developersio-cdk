import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { VpcStack } from '../../lib/stack/vpc-stack';

test('Vpc Stack', () => {
    const app = new App({
        context: {
            'systemName': 'devio',
            'envType': 'stg'
        }
    });
    const vpcStack = new VpcStack(app, 'VpcStack');
    const template = Template.fromStack(vpcStack);

    // VPC
    template.resourceCountIs('AWS::EC2::VPC', 1);
    template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: '10.0.0.0/16',
        Tags: [{ Key: 'Name', Value: 'devio-stg-vpc' }]
    });
});
