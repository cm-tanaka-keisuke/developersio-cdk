import { CfnTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";
import { Instance } from "./instance";
import { Vpc } from "./vpc";

export class TargetGroup extends BaseResource {
    public readonly tg: CfnTargetGroup;

    constructor(scope: Construct, vpc: Vpc, instance: Instance) {
        super();

        this.tg = new CfnTargetGroup(scope, 'AlbTargetGroup', {
            name: this.createResourceName(scope, 'tg'),
            port: 80,
            protocol: 'HTTP',
            targetType: 'instance',
            targets: [
                {
                    id: instance.instance1a.ref
                },
                {
                    id: instance.instance1c.ref
                }
            ],
            vpcId: vpc.vpc.ref
        });

    }
}
