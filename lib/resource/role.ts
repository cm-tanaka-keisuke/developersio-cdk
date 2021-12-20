import { Construct } from 'constructs';
import { CfnRole, CfnInstanceProfile, PolicyDocument, PolicyStatement, PolicyStatementProps, Effect, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { BaseResource } from './abstract/base-resouce';

interface InstanceProfileInfo {
    readonly id: string;
    readonly assign: (instanceProfile: CfnInstanceProfile) => void;
}

interface ResourceInfo {
    readonly id: string;
    readonly policyStatementProps: PolicyStatementProps;
    readonly managedPolicyArns: string[];
    readonly resourceName: string;
    readonly instanceProfile?: InstanceProfileInfo;
    readonly assign: (role: CfnRole) => void;
}

export class Role extends BaseResource {
    public readonly ec2: CfnRole;
    public readonly rds: CfnRole;
    public readonly instanceProfileEc2: CfnInstanceProfile;

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
            instanceProfile: {
                id: 'InstanceProfileEc2',
                assign: instanceProfile => (this.instanceProfileEc2 as CfnInstanceProfile) = instanceProfile
            },
            assign: role => (this.ec2 as CfnRole) = role
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
            assign: role => (this.rds as CfnRole) = role
        }
    ];

    constructor(scope: Construct) {
        super();

        for (const resourceInfo of this.resources) {
            const role = this.createRole(scope, resourceInfo);
            resourceInfo.assign(role);

            const instanceProfileInfo = resourceInfo.instanceProfile;
            if (instanceProfileInfo) {
                const instanceProfile = this.createInstanceProfile(scope, instanceProfileInfo, role);
                instanceProfileInfo.assign(instanceProfile);
            }
        }
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

    private createInstanceProfile(scope: Construct, instanceProfileInfo: InstanceProfileInfo, role: CfnRole): CfnInstanceProfile {
        const instanceProfile = new CfnInstanceProfile(scope, instanceProfileInfo.id, {
            roles: [role.ref],
            instanceProfileName: role.roleName
        });

        return instanceProfile;
    }
}
