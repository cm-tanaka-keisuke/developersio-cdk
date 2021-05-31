import { expect, countResources, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('NatGateway', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::EC2::NatGateway', 2));
    expect(stack).to(haveResource('AWS::EC2::NatGateway', {
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-ngw-1a' }]
    }));
    expect(stack).to(haveResource('AWS::EC2::NatGateway', {
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-ngw-1c' }]
    }));
});
