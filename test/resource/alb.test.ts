import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as Devio from '../../lib/devio-stack';

test('Alb', () => {
    const app = new App();
    const stack = new Devio.DevioStack(app, 'DevioStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::ElasticLoadBalancingV2::LoadBalancer', 1);
    template.hasResourceProperties('AWS::ElasticLoadBalancingV2::LoadBalancer', {
        IpAddressType: 'ipv4',
        Name: 'undefined-undefined-alb',
        Scheme: 'internet-facing',
        SecurityGroups: Match.anyValue(),
        Subnets: Match.anyValue(),
        Type: 'application'
    });

    template.resourceCountIs('AWS::ElasticLoadBalancingV2::TargetGroup', 1);
    template.hasResourceProperties('AWS::ElasticLoadBalancingV2::TargetGroup', {
        Name: 'undefined-undefined-tg',
        Port: 80,
        Protocol: 'HTTP',
        TargetType: 'instance',
        Targets: Match.anyValue(),
        VpcId: Match.anyValue()
    });

    template.resourceCountIs('AWS::ElasticLoadBalancingV2::Listener', 1);
    template.hasResourceProperties('AWS::ElasticLoadBalancingV2::Listener', {
        DefaultActions: [{
            Type: 'forward',
            ForwardConfig: {
                TargetGroups: [{
                    TargetGroupArn: Match.anyValue(),
                    Weight: 1
                }]
            }
        }],
        LoadBalancerArn: Match.anyValue(),
        Port: 80,
        Protocol: 'HTTP'
    });
});
