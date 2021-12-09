import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as Devio from '../../lib/devio-stack';

test('ElasticIp', () => {
    const app = new App();
    const stack = new Devio.DevioStack(app, 'DevioStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::EIP', 2);
    template.hasResourceProperties('AWS::EC2::EIP', {
        Domain: 'vpc',
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-eip-ngw-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::EIP', {
        Domain: 'vpc',
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-eip-ngw-1c' }]
    });
});
