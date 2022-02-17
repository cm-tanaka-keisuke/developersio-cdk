import { CfnListener, CfnLoadBalancer } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";
import { SecurityGroup } from "./security-group";
import { Subnet } from "./subnet";
import { TargetGroup } from "./target-group";

export class LoadBalancer extends BaseResource {
    public readonly alb: CfnLoadBalancer;

    constructor(
        scope: Construct,
        securityGroup: SecurityGroup,
        subnet: Subnet,
        targetGroup: TargetGroup
    ) {
        super();

        // Load Balancer
        this.alb = new CfnLoadBalancer(scope, 'Alb', {
            ipAddressType: 'ipv4',
            name: this.createResourceName(scope, 'alb'),
            scheme: 'internet-facing',
            securityGroups: [securityGroup.alb.attrGroupId],
            subnets: [subnet.public1a.ref, subnet.public1c.ref],
            type: 'application'
        });

        // Listener
        new CfnListener(scope, 'AlbListener', {
            defaultActions: [{
                type: 'forward',
                forwardConfig: {
                    targetGroups: [{
                        targetGroupArn: targetGroup.tg.ref,
                        weight: 1
                    }]
                }
            }],
            loadBalancerArn: this.alb.ref,
            port: 80,
            protocol: 'HTTP'
        });
    }
}
