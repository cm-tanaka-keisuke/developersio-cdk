import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { VpcStack } from '../../lib/stack/vpc-stack';
import { Ec2Stack } from '../../lib/stack/ec2-stack';

test('Ec2 Stack', () => {
    const app = new App({
        context: {
            'systemName': 'devio',
            'envType': 'stg'
        }
    });
    const vpcStack = new VpcStack(app, 'VpcStack');
    const ec2Stack = new Ec2Stack(app, 'Ec2Stack', vpcStack);
    const template = Template.fromStack(ec2Stack);

    // Security Group
    template.resourceCountIs('AWS::EC2::SecurityGroup', 3);
    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for ALB',
        GroupName: 'devio-stg-sg-alb',
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-sg-alb' }]
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for EC2',
        GroupName: 'devio-stg-sg-ec2',
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-sg-ec2' }]
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for RDS',
        GroupName: 'devio-stg-sg-rds',
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'devio-stg-sg-rds' }]
    });
    template.resourceCountIs('AWS::EC2::SecurityGroupIngress', 4);
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        CidrIp: '0.0.0.0/0',
        FromPort: 80,
        ToPort: 80,
        GroupId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        CidrIp: '0.0.0.0/0',
        FromPort: 443,
        ToPort: 443,
        GroupId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        FromPort: 80,
        ToPort: 80,
        GroupId: Match.anyValue(),
        SourceSecurityGroupId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        FromPort: 3306,
        ToPort: 3306,
        GroupId: Match.anyValue(),
        SourceSecurityGroupId: Match.anyValue()
    });
});
