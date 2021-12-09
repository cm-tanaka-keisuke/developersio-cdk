import { Construct } from 'constructs';
import { CfnRole, CfnInstanceProfile, PolicyDocument, PolicyStatement, PolicyStatementProps, Effect, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Resource } from './abstract/resource';

interface ResourceInfo {
    readonly id: string;
    readonly policyStatementProps: PolicyStatementProps;
    readonly managedPolicyArns: string[];
    readonly resourceName: string;
    readonly assign: (role: CfnRole) => void;
}

export class IamRole extends Resource {
    public ec2: CfnRole;
    public rds: CfnRole;
    public instanceProfileEc2: CfnInstanceProfile;

    private readonly resources: ResourceInfo[] = [
        {
            id: 'RoleEc2',
            policyStatementProps: {
                effect: Effect.ALLOW,
                principals: [new ServicePrincipal('ec2.amazonaws.com')],
                actions: ['sts:AssumeRole']
            },
            managedPolicyArns: [
                'arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore'
            ],
            resourceName: 'role-ec2',
            assign: role => this.ec2 = role
        },
        {
            id: 'RoleRds',
            policyStatementProps: {
                effect: Effect.ALLOW,
                principals: [new ServicePrincipal('monitoring.rds.amazonaws.com')],
                actions: ['sts:AssumeRole']
            },
            managedPolicyArns: [
                'arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole'
            ],
            resourceName: 'role-rds',
            assign: role => this.rds = role
        }
    ];

    constructor() {
        super();
    }

    createResources(scope: Construct) {
        for (const resourceInfo of this.resources) {
            const role = this.createRole(scope, resourceInfo);
            resourceInfo.assign(role);
        }

        this.instanceProfileEc2 = new CfnInstanceProfile(scope, 'InstanceProfileEc2', {
            roles: [this.ec2.ref],
            instanceProfileName: this.ec2.roleName
        });
    }

    private createRole(scope: Construct, resourceInfo: ResourceInfo): CfnRole {
        const policyStatement = new PolicyStatement(resourceInfo.policyStatementProps);

        const policyDocument = new PolicyDocument({
            statements: [policyStatement]
        });

        const role = new CfnRole(scope, resourceInfo.id, {
            assumeRolePolicyDocument: policyDocument,
            managedPolicyArns: resourceInfo.managedPolicyArns,
            roleName: this.createResourceName(scope, resourceInfo.resourceName)
        });

        return role;
    }
}
