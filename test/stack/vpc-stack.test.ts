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

    // Route Table
    template.resourceCountIs('AWS::EC2::RouteTable', 4);
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-rtb-public' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-rtb-app-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-rtb-app-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-rtb-db' }]
    });
    template.resourceCountIs('AWS::EC2::Route', 3);
    template.hasResourceProperties('AWS::EC2::Route', {
        RouteTableId: Match.anyValue(),
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::Route', {
        RouteTableId: Match.anyValue(),
        DestinationCidrBlock: '0.0.0.0/0',
        NatGatewayId: Match.anyValue()
    });
    template.resourceCountIs('AWS::EC2::SubnetRouteTableAssociation', 6);
    template.hasResourceProperties('AWS::EC2::SubnetRouteTableAssociation', {
        RouteTableId: Match.anyValue(),
        SubnetId: Match.anyValue()
    });

    // Network ACL
    template.resourceCountIs('AWS::EC2::NetworkAcl', 3);
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-nacl-public' }]
    });
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-nacl-app' }]
    });
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-nacl-db' }]
    });
    template.resourceCountIs('AWS::EC2::NetworkAclEntry', 6);
    template.hasResourceProperties('AWS::EC2::NetworkAclEntry', {
        NetworkAclId: Match.anyValue(),
        Protocol: -1,
        RuleAction: 'allow',
        RuleNumber: 100,
        CidrBlock: '0.0.0.0/0',
        Egress: false
    });
    template.hasResourceProperties('AWS::EC2::NetworkAclEntry', {
        NetworkAclId: Match.anyValue(),
        Protocol: -1,
        RuleAction: 'allow',
        RuleNumber: 100,
        CidrBlock: '0.0.0.0/0',
        Egress: true
    });
    template.resourceCountIs('AWS::EC2::SubnetNetworkAclAssociation', 6);
    template.hasResourceProperties('AWS::EC2::SubnetNetworkAclAssociation', {
        NetworkAclId: Match.anyValue(),
        SubnetId: Match.anyValue()
    });
});
