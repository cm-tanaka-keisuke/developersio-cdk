import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as Devio from '../../lib/devio-stack';

test('NetworkAcl', () => {
    const app = new App();
    const stack = new Devio.DevioStack(app, 'DevioStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::NetworkAcl', 3);
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-nacl-public' }]
    });
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-nacl-app' }]
    });
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ Key: 'Name', Value: 'undefined-undefined-nacl-db' }]
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
