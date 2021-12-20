import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { IamStack } from '../../lib/stack/iam-stack';

test('Iam Stack', () => {
    const app = new App({
        context: {
            'systemName': 'devio',
            'envType': 'stg'
        }
    });
    const iamStack = new IamStack(app, 'IamStack');
    const template = Template.fromStack(iamStack);

    // Role
    template.resourceCountIs('AWS::IAM::Role', 2);
    template.hasResourceProperties('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
            Statement: [{
                Effect: 'Allow',
                Principal: {
                    Service: Match.anyValue()
                },
                Action: 'sts:AssumeRole'
            }]
        },
        ManagedPolicyArns: [
            'arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore'
        ],
        RoleName: 'devio-stg-role-ec2'
    });
    template.hasResourceProperties('AWS::IAM::Role', {
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
        RoleName: 'devio-stg-role-rds'
    });
    template.resourceCountIs('AWS::IAM::InstanceProfile', 1);
    template.hasResourceProperties('AWS::IAM::InstanceProfile', {
        Roles: Match.anyValue(),
        InstanceProfileName: 'devio-stg-role-ec2'
    });
});
