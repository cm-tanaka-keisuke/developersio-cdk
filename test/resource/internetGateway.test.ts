import { expect, countResources, haveResource, anything } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('InternetGateway', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::EC2::InternetGateway', 1));
    expect(stack).to(haveResource('AWS::EC2::InternetGateway', {
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-igw' }]
    }));

    expect(stack).to(countResources('AWS::EC2::VPCGatewayAttachment', 1));
    expect(stack).to(haveResource('AWS::EC2::VPCGatewayAttachment', {
        VpcId: anything(),
        InternetGatewayId: anything()
    }));
});
