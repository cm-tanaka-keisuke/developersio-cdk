import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as Devio from '../../lib/devio-stack';

test('Ec2', () => {
    const app = new App();
    const stack = new Devio.DevioStack(app, 'DevioStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::Instance', 2);
    template.hasResourceProperties('AWS::EC2::Instance', {
        AvailabilityZone: 'ap-northeast-1a',
        IamInstanceProfile: Match.anyValue(),
        ImageId: 'ami-06631ebafb3ae5d34',
        InstanceType: 't2.micro',
        SecurityGroupIds: Match.anyValue(),
        SubnetId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-ec2-1a' }],
        UserData: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::Instance', {
        AvailabilityZone: 'ap-northeast-1c',
        IamInstanceProfile: Match.anyValue(),
        ImageId: 'ami-06631ebafb3ae5d34',
        InstanceType: 't2.micro',
        SecurityGroupIds: Match.anyValue(),
        SubnetId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-ec2-1c' }],
        UserData: Match.anyValue()
    });
});
