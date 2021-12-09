import { Construct } from 'constructs';
import { CfnNetworkAcl, CfnNetworkAclEntry, CfnSubnetNetworkAclAssociation, CfnVPC, CfnSubnet } from 'aws-cdk-lib/aws-ec2';
import { Resource } from './abstract/resource';

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

export class NetworkAcl extends Resource {
    public public: CfnNetworkAcl;
    public app: CfnNetworkAcl;
    public db: CfnNetworkAcl;

    private readonly vpc: CfnVPC;
    private readonly subnetPublic1a: CfnSubnet;
    private readonly subnetPublic1c: CfnSubnet;
    private readonly subnetApp1a: CfnSubnet;
    private readonly subnetApp1c: CfnSubnet;
    private readonly subnetDb1a: CfnSubnet;
    private readonly subnetDb1c: CfnSubnet;
    private readonly resources: ResourceInfo[] = [
        {
            id: 'NetworkAclPublic',
            resourceName: 'nacl-public',
            entryIdInbound: 'NetworkAclEntryInboundPublic',
            entryIdOutbound: 'NetworkAclEntryOutboundPublic',
            associations: [
                {
                    id: 'NetworkAclAssociationPublic1a',
                    subnetId: () => this.subnetPublic1a.ref
                },
                {
                    id: 'NetworkAclAssociationPublic1c',
                    subnetId: () => this.subnetPublic1c.ref
                }
            ],
            assign: networkAcl => this.public = networkAcl
        },
        {
            id: 'NetworkAclApp',
            resourceName: 'nacl-app',
            entryIdInbound: 'NetworkAclEntryInboundApp',
            entryIdOutbound: 'NetworkAclEntryOutboundApp',
            associations: [
                {
                    id: 'NetworkAclAssociationApp1a',
                    subnetId: () => this.subnetApp1a.ref
                },
                {
                    id: 'NetworkAclAssociationApp1c',
                    subnetId: () => this.subnetApp1c.ref
                }
            ],
            assign: networkAcl => this.app = networkAcl
        },
        {
            id: 'NetworkAclDb',
            resourceName: 'nacl-db',
            entryIdInbound: 'NetworkAclEntryInboundDb',
            entryIdOutbound: 'NetworkAclEntryOutboundDb',
            associations: [
                {
                    id: 'NetworkAclAssociationDb1a',
                    subnetId: () => this.subnetDb1a.ref
                },
                {
                    id: 'NetworkAclAssociationDb1c',
                    subnetId: () => this.subnetDb1c.ref
                }
            ],
            assign: networkAcl => this.db = networkAcl
        }
    ];

    constructor(
        vpc: CfnVPC,
        subnetPublic1a: CfnSubnet,
        subnetPublic1c: CfnSubnet,
        subnetApp1a: CfnSubnet,
        subnetApp1c: CfnSubnet,
        subnetDb1a: CfnSubnet,
        subnetDb1c: CfnSubnet
    ) {
        super();
        this.vpc = vpc;
        this.subnetPublic1a = subnetPublic1a;
        this.subnetPublic1c = subnetPublic1c;
        this.subnetApp1a = subnetApp1a;
        this.subnetApp1c = subnetApp1c;
        this.subnetDb1a = subnetDb1a;
        this.subnetDb1c = subnetDb1c;
    }

    createResources(scope: Construct) {
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
            vpcId: this.vpc.ref,
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
