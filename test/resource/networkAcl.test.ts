import { expect, countResources, countResourcesLike, haveResource, anything } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('NetworkAcl', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::EC2::NetworkAcl', 3));
    expect(stack).to(haveResource('AWS::EC2::NetworkAcl', {
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-public' }]
    }));
    expect(stack).to(haveResource('AWS::EC2::NetworkAcl', {
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-app' }]
    }));
    expect(stack).to(haveResource('AWS::EC2::NetworkAcl', {
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-db' }]
    }));

    expect(stack).to(countResources('AWS::EC2::NetworkAclEntry', 6));
    expect(stack).to(countResourcesLike('AWS::EC2::NetworkAclEntry', 3, {
        NetworkAclId: anything(),
        Protocol: -1,
        RuleAction: 'allow',
        RuleNumber: 100,
        CidrBlock: '0.0.0.0/0',
        Egress: false
    }));
    expect(stack).to(countResourcesLike('AWS::EC2::NetworkAclEntry', 3, {
        NetworkAclId: anything(),
        Protocol: -1,
        RuleAction: 'allow',
        RuleNumber: 100,
        CidrBlock: '0.0.0.0/0',
        Egress: true
    }));

    expect(stack).to(countResources('AWS::EC2::SubnetNetworkAclAssociation', 6));
    expect(stack).to(countResourcesLike('AWS::EC2::SubnetNetworkAclAssociation', 6, {
        NetworkAclId: anything(),
        SubnetId: anything()
    }));
});
