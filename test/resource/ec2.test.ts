import { expect, countResources, haveResource, anything } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('Ec2', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::EC2::Instance', 2));
    expect(stack).to(haveResource('AWS::EC2::Instance', {
        AvailabilityZone: 'ap-northeast-1a',
        IamInstanceProfile: anything(),
        ImageId: 'ami-06631ebafb3ae5d34',
        InstanceType: 't2.micro',
        SecurityGroupIds: anything(),
        SubnetId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-ec2-1a' }],
        UserData: anything()
    }));
    expect(stack).to(haveResource('AWS::EC2::Instance', {
        AvailabilityZone: 'ap-northeast-1c',
        IamInstanceProfile: anything(),
        ImageId: 'ami-06631ebafb3ae5d34',
        InstanceType: 't2.micro',
        SecurityGroupIds: anything(),
        SubnetId: anything(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-ec2-1c' }],
        UserData: anything()
    }));
});
