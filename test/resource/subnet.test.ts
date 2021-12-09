import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as Devio from '../../lib/devio-stack';

test('Subnet', () => {
    const app = new App();
    const stack = new Devio.DevioStack(app, 'DevioStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::Subnet', 6);
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.11.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-subnet-public-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.12.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-subnet-public-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.21.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-subnet-app-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.22.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-subnet-app-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.31.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-subnet-db-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.32.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-subnet-db-1c' }]
    });
});
