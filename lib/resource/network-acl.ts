import { Construct } from 'constructs';
import { CfnNetworkAcl, CfnNetworkAclEntry, CfnSubnetNetworkAclAssociation } from 'aws-cdk-lib/aws-ec2';
import { BaseResource } from './abstract/base-resouce';
import { Vpc } from './vpc';
import { Subnet } from './subnet';

interface AssociationInfo {
    readonly id: string;
    readonly subnetId: () => string;
}

interface ResourceInfo {
    readonly id: string;
    readonly resourceName: string;
    readonly entryIdInbound: string;
    readonly entryIdOutbound: string;
    readonly associations: AssociationInfo[];
    readonly assign: (networkAcl: CfnNetworkAcl) => void;
}

export class NetworkAcl extends BaseResource {
    public readonly public: CfnNetworkAcl;
    public readonly app: CfnNetworkAcl;
    public readonly db: CfnNetworkAcl;

    private readonly vpc: Vpc;
    private readonly subnet: Subnet;
    private readonly resources: ResourceInfo[] = [
        {
            id: 'NetworkAclPublic',
            resourceName: 'nacl-public',
            entryIdInbound: 'NetworkAclEntryInboundPublic',
            entryIdOutbound: 'NetworkAclEntryOutboundPublic',
            associations: [
                {
                    id: 'NetworkAclAssociationPublic1a',
                    subnetId: () => this.subnet.public1a.ref
                },
                {
                    id: 'NetworkAclAssociationPublic1c',
                    subnetId: () => this.subnet.public1c.ref
                }
            ],
            assign: networkAcl => (this.public as CfnNetworkAcl) = networkAcl
        },
        {
            id: 'NetworkAclApp',
            resourceName: 'nacl-app',
            entryIdInbound: 'NetworkAclEntryInboundApp',
            entryIdOutbound: 'NetworkAclEntryOutboundApp',
            associations: [
                {
                    id: 'NetworkAclAssociationApp1a',
                    subnetId: () => this.subnet.app1a.ref
                },
                {
                    id: 'NetworkAclAssociationApp1c',
                    subnetId: () => this.subnet.app1c.ref
                }
            ],
            assign: networkAcl => (this.app as CfnNetworkAcl) = networkAcl
        },
        {
            id: 'NetworkAclDb',
            resourceName: 'nacl-db',
            entryIdInbound: 'NetworkAclEntryInboundDb',
            entryIdOutbound: 'NetworkAclEntryOutboundDb',
            associations: [
                {
                    id: 'NetworkAclAssociationDb1a',
                    subnetId: () => this.subnet.db1a.ref
                },
                {
                    id: 'NetworkAclAssociationDb1c',
                    subnetId: () => this.subnet.db1c.ref
                }
            ],
            assign: networkAcl => (this.db as CfnNetworkAcl) = networkAcl
        }
    ];

    constructor(scope: Construct, vpc: Vpc, subnet: Subnet) {
        super();

        this.vpc = vpc;
        this.subnet = subnet;

        for (const resourceInfo of this.resources) {
            const networkAcl = this.createNetworkAcl(scope, resourceInfo);
            resourceInfo.assign(networkAcl);

            this.createEntry(scope, resourceInfo.entryIdInbound, networkAcl, false);
            this.createEntry(scope, resourceInfo.entryIdOutbound, networkAcl, true);

            for (const associationInfo of resourceInfo.associations) {
                this.createAssociation(scope, associationInfo, networkAcl);
            }
        }
    }

    private createNetworkAcl(scope: Construct, resourceInfo: ResourceInfo): CfnNetworkAcl {
        const networkAcl = new CfnNetworkAcl(scope, resourceInfo.id, {
            vpcId: this.vpc.vpc.ref,
            tags: [{
                key: 'Name',
                value: this.createResourceName(scope, resourceInfo.resourceName)
            }]
        });

        return networkAcl;
    }

    private createEntry(scope: Construct, id: string, networkAcl: CfnNetworkAcl, egress: boolean) {
        new CfnNetworkAclEntry(scope, id, {
            networkAclId: networkAcl.ref,
            protocol: -1,
            ruleAction: 'allow',
            ruleNumber: 100,
            cidrBlock: '0.0.0.0/0',
            egress: egress
        });
    }

    private createAssociation(scope: Construct, associationInfo: AssociationInfo, networkAcl: CfnNetworkAcl) {
        new CfnSubnetNetworkAclAssociation(scope, associationInfo.id, {
            networkAclId: networkAcl.ref,
            subnetId: associationInfo.subnetId()
        });
    }
}
