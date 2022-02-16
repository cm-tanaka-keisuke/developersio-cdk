import * as fs from 'fs';
import { CfnInstance } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";
import { Role } from "./role";
import { SecurityGroup } from "./security-group";
import { Subnet } from "./subnet";

interface ResourceInfo {
    readonly id: string;
    readonly availabilityZone: string;
    readonly resourceName: string;
    readonly subnetId: () => string;
    readonly assign: (instance: CfnInstance) => void;
}

export class Instance extends BaseResource {
    public readonly instance1a: CfnInstance;
    public readonly instance1c: CfnInstance;

    private readonly subnet: Subnet;
    private readonly role: Role;
    private readonly securityGroup: SecurityGroup;
    private readonly resources: ResourceInfo[] = [
        {
            id: 'Ec2Instance1a',
            availabilityZone: 'ap-northeast-1a',
            resourceName: 'ec2-1a',
            subnetId: () => this.subnet.app1a.ref,
            assign: instance => (this.instance1a as CfnInstance) = instance
        },
        {
            id: 'Ec2Instance1c',
            availabilityZone: 'ap-northeast-1c',
            resourceName: 'ec2-1c',
            subnetId: () => this.subnet.app1c.ref,
            assign: instance => (this.instance1c as CfnInstance) = instance
        }
    ];

    constructor(
        scope: Construct,
        subnet: Subnet,
        role: Role,
        securityGroup: SecurityGroup
    ) {
        super();

        this.subnet = subnet;
        this.role = role;
        this.securityGroup = securityGroup;

        for (const resourceInfo of this.resources) {
            const instance = this.createInstance(scope, resourceInfo);
            resourceInfo.assign(instance);
        }
    }

    private createInstance(scope: Construct, resourceInfo: ResourceInfo): CfnInstance {
        const instance = new CfnInstance(scope, resourceInfo.id, {
            availabilityZone: resourceInfo.availabilityZone,
            iamInstanceProfile: this.role.instanceProfileEc2.ref,
            imageId: 'ami-08a8688fb7eacb171',
            instanceType: 't2.micro',
            securityGroupIds: [this.securityGroup.ec2.attrGroupId],
            subnetId: resourceInfo.subnetId(),
            tags: [{
                key: 'Name',
                value: this.createResourceName(scope, resourceInfo.resourceName)
            }],
            userData: fs.readFileSync(`${__dirname}/../script/ec2/userData.sh`, 'base64')
        });

        const keyName = scope.node.tryGetContext('keyName');
        if (keyName) {
            instance.keyName = keyName;
        }

        return instance;
    }
}
