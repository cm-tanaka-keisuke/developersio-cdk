import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { VpcStack } from '../../lib/stack/vpc-stack';

test('Vpc Stack', () => {
    const app = new App({
        context: {
            'systemName': 'devio',
            'envType': 'stg'
        }
    });
    const vpcStack = new VpcStack(app, 'VpcStack');
    const template = Template.fromStack(vpcStack);

    // VPC
    template.resourceCountIs('AWS::EC2::VPC', 1);
    template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: '10.0.0.0/16',
        Tags: [{ Key: 'Name', Value: 'devio-stg-vpc' }]
    });

    // Subnet
    template.resourceCountIs('AWS::EC2::Subnet', 6);
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.11.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ Key: 'Name', Value: 'devio-stg-subnet-public-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.12.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ Key: 'Name', Value: 'devio-stg-subnet-public-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.21.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ Key: 'Name', Value: 'devio-stg-subnet-app-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.22.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ Key: 'Name', Value: 'devio-stg-subnet-app-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.31.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ Key: 'Name', Value: 'devio-stg-subnet-db-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.32.0/24',
        VpcId: Match.anyValue(),
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ Key: 'Name', Value: 'devio-stg-subnet-db-1c' }]
    });

    // Internet Gateway
    template.resourceCountIs('AWS::EC2::InternetGateway', 1);
    template.hasResourceProperties('AWS::EC2::InternetGateway', {
        Tags: [{ Key: 'Name', Value: 'devio-stg-igw' }]
    });
    template.resourceCountIs('AWS::EC2::VPCGatewayAttachment', 1);
    template.hasResourceProperties('AWS::EC2::VPCGatewayAttachment', {
        VpcId: Match.anyValue(),
        InternetGatewayId: Match.anyValue()
    });

    // Elastic IP
    template.resourceCountIs('AWS::EC2::EIP', 2);
    template.hasResourceProperties('AWS::EC2::EIP', {
        Domain: 'vpc',
        Tags: [{ Key: 'Name', Value: 'devio-stg-eip-ngw-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::EIP', {
        Domain: 'vpc',
        Tags: [{ Key: 'Name', Value: 'devio-stg-eip-ngw-1c' }]
    });

    // NAT Gateway
    template.resourceCountIs('AWS::EC2::NatGateway', 2);
    template.hasResourceProperties('AWS::EC2::NatGateway', {
        AllocationId: Match.anyValue(),
        SubnetId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-ngw-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::NatGateway', {
        AllocationId: Match.anyValue(),
        SubnetId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-ngw-1c' }]
    });
});
