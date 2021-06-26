import { expect, countResources, haveResource, anything } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('SecurityGroup', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::EC2::SecurityGroup', 3));
    expect(stack).to(haveResource('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for ALB',
        GroupName: 'undefined-undefined-sg-alb',
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-sg-alb' }]
    }));
    expect(stack).to(haveResource('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for EC2',
        GroupName: 'undefined-undefined-sg-ec2',
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-sg-ec2' }]
    }));
    expect(stack).to(haveResource('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for RDS',
        GroupName: 'undefined-undefined-sg-rds',
        VpcId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-sg-rds' }]
    }));

    expect(stack).to(countResources('AWS::EC2::SecurityGroupIngress', 4));
    expect(stack).to(haveResource('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        CidrIp: '0.0.0.0/0',
        FromPort: 80,
        ToPort: 80,
        GroupId: anything()
    }));
    expect(stack).to(haveResource('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        CidrIp: '0.0.0.0/0',
        FromPort: 443,
        ToPort: 443,
        GroupId: anything()
    }));
    expect(stack).to(haveResource('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        FromPort: 80,
        ToPort: 80,
        GroupId: anything(),
        SourceSecurityGroupId: anything()
    }));
    expect(stack).to(haveResource('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        FromPort: 3306,
        ToPort: 3306,
        GroupId: anything(),
        SourceSecurityGroupId: anything()
    }));
});
