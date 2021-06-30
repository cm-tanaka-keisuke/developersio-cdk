import { expect, countResources, haveResource, anything } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('Alb', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::ElasticLoadBalancingV2::LoadBalancer', 1));
    expect(stack).to(haveResource('AWS::ElasticLoadBalancingV2::LoadBalancer', {
        IpAddressType: 'ipv4',
        Name: 'undefined-undefined-alb',
        Scheme: 'internet-facing',
        SecurityGroups: anything(),
        Subnets: anything(),
        Type: 'application'
    }));

    expect(stack).to(countResources('AWS::ElasticLoadBalancingV2::TargetGroup', 1));
    expect(stack).to(haveResource('AWS::ElasticLoadBalancingV2::TargetGroup', {
        Name: 'undefined-undefined-tg',
        Port: 80,
        Protocol: 'HTTP',
        TargetType: 'instance',
        Targets: anything(),
        VpcId: anything()
    }));

    expect(stack).to(countResources('AWS::ElasticLoadBalancingV2::Listener', 1));
    expect(stack).to(haveResource('AWS::ElasticLoadBalancingV2::Listener', {
        DefaultActions: [{
            Type: 'forward',
            ForwardConfig: {
                TargetGroups: [{
                    TargetGroupArn: anything(),
                    Weight: 1
                }]
            }
        }],
        LoadBalancerArn: anything(),
        Port: 80,
        Protocol: 'HTTP'
    }));
});
