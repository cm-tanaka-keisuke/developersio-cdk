import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as Devio from '../../lib/devio-stack';

test('NatGateway', () => {
    const app = new App();
    const stack = new Devio.DevioStack(app, 'DevioStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::NatGateway', 2);
    template.hasResourceProperties('AWS::EC2::NatGateway', {
        AllocationId: Match.anyValue(),
        SubnetId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-ngw-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::NatGateway', {
        AllocationId: Match.anyValue(),
        SubnetId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-ngw-1c' }]
    });
});
