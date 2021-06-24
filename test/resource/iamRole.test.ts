import { expect, countResources, haveResource, haveResourceLike, anything } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('IamRole', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::IAM::Role', 2));
    expect(stack).to(haveResourceLike('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
            Statement: [{
                Effect: 'Allow',
                Principal: {
                    Service: anything()
                },
                Action: 'sts:AssumeRole'
            }]
        },
        ManagedPolicyArns: [
            'arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore',
            'arn:aws:iam::aws:policy/AmazonRDSFullAccess'
        ],
        RoleName: 'undefined-undefined-role-ec2'
    }));
    expect(stack).to(haveResourceLike('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
            Statement: [{
                Effect: 'Allow',
                Principal: {
                    Service: 'monitoring.rds.amazonaws.com'
                },
                Action: 'sts:AssumeRole'
            }]
        },
        ManagedPolicyArns: [
            'arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole'
        ],
        RoleName: 'undefined-undefined-role-rds'
    }));

    expect(stack).to(countResources('AWS::IAM::InstanceProfile', 1));
    expect(stack).to(haveResource('AWS::IAM::InstanceProfile', {
        Roles: anything(),
        InstanceProfileName: 'undefined-undefined-role-ec2'
    }));
});
