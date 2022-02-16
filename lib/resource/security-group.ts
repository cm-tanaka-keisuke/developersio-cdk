import { CfnSecurityGroup, CfnSecurityGroupIngress, CfnSecurityGroupIngressProps } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";
import { Vpc } from "./vpc";

interface IngressInfo {
    readonly id: string;
    readonly securityGroupIngressProps: CfnSecurityGroupIngressProps;
    readonly groupId: () => string;
    readonly sourceSecurityGroupId?: () => string;
}

interface ResourceInfo {
    readonly id: string;
    readonly groupDescription: string;
    readonly ingresses: IngressInfo[];
    readonly resourceName: string;
    readonly assign: (securityGroup: CfnSecurityGroup) => void;
}

export class SecurityGroup extends BaseResource {
    public readonly alb: CfnSecurityGroup;
    public readonly ec2: CfnSecurityGroup;
    public readonly rds: CfnSecurityGroup;

    private readonly vpc: Vpc;
    private readonly resources: ResourceInfo[] = [
        {
            id: 'SecurityGroupAlb',
            groupDescription: 'for ALB',
            ingresses: [
                {
                    id: 'SecurityGroupIngressAlb1',
                    securityGroupIngressProps: {
                        ipProtocol: 'tcp',
                        cidrIp: '0.0.0.0/0',
                        fromPort: 80,
                        toPort: 80
                    },
                    groupId: () => this.alb.attrGroupId
                },
                {
                    id: 'SecurityGroupIngressAlb2',
                    securityGroupIngressProps: {
                        ipProtocol: 'tcp',
                        cidrIp: '0.0.0.0/0',
                        fromPort: 443,
                        toPort: 443
                    },
                    groupId: () => this.alb.attrGroupId
                }
            ],
            resourceName: 'sg-alb',
            assign: securityGroup => (this.alb as CfnSecurityGroup) = securityGroup
        },
        {
            id: 'SecurityGroupEc2',
            groupDescription: 'for EC2',
            ingresses: [
                {
                    id: 'SecurityGroupIngressEc21',
                    securityGroupIngressProps: {
                        ipProtocol: 'tcp',
                        fromPort: 80,
                        toPort: 80
                    },
                    groupId: () => this.ec2.attrGroupId,
                    sourceSecurityGroupId: () => this.alb.attrGroupId,
                }
            ],
            resourceName: 'sg-ec2',
            assign: securityGroup => (this.ec2 as CfnSecurityGroup) = securityGroup
        },
        {
            id: 'SecurityGroupRds',
            groupDescription: 'for RDS',
            ingresses: [
                {
                    id: 'SecurityGroupIngressRds1',
                    securityGroupIngressProps: {
                        ipProtocol: 'tcp',
                        fromPort: 3306,
                        toPort: 3306
                    },
                    groupId: () => this.rds.attrGroupId,
                    sourceSecurityGroupId: () => this.ec2.attrGroupId,
                }
            ],
            resourceName: 'sg-rds',
            assign: securityGroup => (this.rds as CfnSecurityGroup) = securityGroup
        }
    ];

    constructor(scope: Construct, vpc: Vpc) {
        super();

        this.vpc = vpc;

        for (const resourceInfo of this.resources) {
            const securityGroup = this.createSecurityGroup(scope, resourceInfo);
            resourceInfo.assign(securityGroup);

            this.createSecurityGroupIngress(scope, resourceInfo);
        }
    }

    private createSecurityGroup(scope: Construct, resourceInfo: ResourceInfo): CfnSecurityGroup {
        const resourceName = this.createResourceName(scope, resourceInfo.resourceName);
        const securityGroup = new CfnSecurityGroup(scope, resourceInfo.id, {
            groupDescription: resourceInfo.groupDescription,
            groupName: resourceName,
            vpcId: this.vpc.vpc.ref,
            tags: [{
                key: 'Name',
                value: resourceName
            }]
        });

        return securityGroup;
    }

    private createSecurityGroupIngress(scope: Construct, resourceInfo: ResourceInfo) {
        for (const ingress of resourceInfo.ingresses) {
            const securityGroupIngress = new CfnSecurityGroupIngress(scope, ingress.id, ingress.securityGroupIngressProps);
            securityGroupIngress.groupId = ingress.groupId();

            if (ingress.sourceSecurityGroupId) {
                securityGroupIngress.sourceSecurityGroupId = ingress.sourceSecurityGroupId();
            }
        }
    }
}
