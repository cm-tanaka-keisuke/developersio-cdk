import { expect, countResources, countResourcesLike, haveResource, anything } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('RouteTable', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::EC2::RouteTable', 4));
    expect(stack).to(haveResource('AWS::EC2::RouteTable', {
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-public' }]
    }));
    expect(stack).to(haveResource('AWS::EC2::RouteTable', {
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-app-1a' }]
    }));
    expect(stack).to(haveResource('AWS::EC2::RouteTable', {
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-app-1c' }]
    }));
    expect(stack).to(haveResource('AWS::EC2::RouteTable', {
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-db' }]
    }));

    expect(stack).to(countResources('AWS::EC2::Route', 3));
    expect(stack).to(countResourcesLike('AWS::EC2::Route', 1, {
        RouteTableId: anything(),
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: anything()
    }));
    expect(stack).to(countResourcesLike('AWS::EC2::Route', 2, {
        RouteTableId: anything(),
        DestinationCidrBlock: '0.0.0.0/0',
        NatGatewayId: anything()
    }));

    expect(stack).to(countResources('AWS::EC2::SubnetRouteTableAssociation', 6));
    expect(stack).to(countResourcesLike('AWS::EC2::SubnetRouteTableAssociation', 6, {
        RouteTableId: anything(),
        SubnetId: anything()
    }));
});
