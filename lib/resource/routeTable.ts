import { Construct } from 'constructs';
import { CfnRouteTable, CfnRoute, CfnSubnetRouteTableAssociation, CfnVPC, CfnSubnet, CfnInternetGateway, CfnNatGateway } from 'aws-cdk-lib/aws-ec2';
import { Resource } from './abstract/resource';

interface RouteInfo {
    readonly id: string;
    readonly destinationCidrBlock: string;
    readonly gatewayId?: () => string;
    readonly natGatewayId?: () => string;
}

interface AssociationInfo {
    readonly id: string;
    readonly subnetId: () => string;
}

interface ResourceInfo {
    readonly id: string;
    readonly resourceName: string;
    readonly routes: RouteInfo[];
    readonly associations: AssociationInfo[];
    readonly assign: (routeTable: CfnRouteTable) => void;
}

export class RouteTable extends Resource {
    public public: CfnRouteTable;
    public app1a: CfnRouteTable;
    public app1c: CfnRouteTable;
    public db: CfnRouteTable;

    private readonly vpc: CfnVPC;
    private readonly subnetPublic1a: CfnSubnet;
    private readonly subnetPublic1c: CfnSubnet;
    private readonly subnetApp1a: CfnSubnet;
    private readonly subnetApp1c: CfnSubnet;
    private readonly subnetDb1a: CfnSubnet;
    private readonly subnetDb1c: CfnSubnet;
    private readonly internetGateway: CfnInternetGateway;
    private readonly natGateway1a: CfnNatGateway;
    private readonly natGateway1c: CfnNatGateway;
    private readonly resources: ResourceInfo[] = [
        {
            id: 'RouteTablePublic',
            resourceName: 'rtb-public',
            routes: [{
                id: 'RoutePublic',
                destinationCidrBlock: '0.0.0.0/0',
                gatewayId: () => this.internetGateway.ref
            }],
            associations: [
                {
                    id: 'RouteTableAssociationPublic1a',
                    subnetId: () => this.subnetPublic1a.ref
                },
                {
                    id: 'RouteTableAssociationPublic1c',
                    subnetId: () => this.subnetPublic1c.ref
                }
            ],
            assign: routeTable => this.public = routeTable
        },
        {
            id: 'RouteTableApp1a',
            resourceName: 'rtb-app-1a',
            routes: [{
                id: 'RouteApp1a',
                destinationCidrBlock: '0.0.0.0/0',
                natGatewayId: () => this.natGateway1a.ref
            }],
            associations: [{
                id: 'RouteTableAssociationApp1a',
                subnetId: () => this.subnetApp1a.ref
            }],
            assign: routeTable => this.app1a = routeTable
        },
        {
            id: 'RouteTableApp1c',
            resourceName: 'rtb-app-1c',
            routes: [{
                id: 'RouteApp1c',
                destinationCidrBlock: '0.0.0.0/0',
                natGatewayId: () => this.natGateway1c.ref
            }],
            associations: [{
                id: 'RouteTableAssociationApp1c',
                subnetId: () => this.subnetApp1c.ref
            }],
            assign: routeTable => this.app1c = routeTable
        },
        {
            id: 'RouteTableDb',
            resourceName: 'rtb-db',
            routes: [],
            associations: [
                {
                    id: 'RouteTableAssociationDb1a',
                    subnetId: () => this.subnetDb1a.ref
                },
                {
                    id: 'RouteTableAssociationDb1c',
                    subnetId: () => this.subnetDb1c.ref
                }
            ],
            assign: routeTable => this.db = routeTable
        }
    ];

    constructor(
        vpc: CfnVPC,
        subnetPublic1a: CfnSubnet,
        subnetPublic1c: CfnSubnet,
        subnetApp1a: CfnSubnet,
        subnetApp1c: CfnSubnet,
        subnetDb1a: CfnSubnet,
        subnetDb1c: CfnSubnet,
        internetGateway: CfnInternetGateway,
        natGateway1a: CfnNatGateway,
        natGateway1c: CfnNatGateway
    ) {
        super();
        this.vpc = vpc;
        this.subnetPublic1a = subnetPublic1a;
        this.subnetPublic1c = subnetPublic1c;
        this.subnetApp1a = subnetApp1a;
        this.subnetApp1c = subnetApp1c;
        this.subnetDb1a = subnetDb1a;
        this.subnetDb1c = subnetDb1c;
        this.internetGateway = internetGateway;
        this.natGateway1a = natGateway1a;
        this.natGateway1c = natGateway1c;
    }

    createResources(scope: Construct) {
        for (const resourceInfo of this.resources) {
            const routeTable = this.createRouteTable(scope, resourceInfo);
            resourceInfo.assign(routeTable);

            for (const routeInfo of resourceInfo.routes) {
                this.createRoute(scope, routeInfo, routeTable);
            }

            for (const associationInfo of resourceInfo.associations) {
                this.createAssociation(scope, associationInfo, routeTable);
            }
        }
    }

    private createRouteTable(scope: Construct, resourceInfo: ResourceInfo): CfnRouteTable {
        const routeTable = new CfnRouteTable(scope, resourceInfo.id, {
            vpcId: this.vpc.ref,
            tags: [{
                key: 'Name',
                value: this.createResourceName(scope, resourceInfo.resourceName)
            }]
        });

        return routeTable;
    }

    private createRoute(scope: Construct, routeInfo: RouteInfo, routeTable: CfnRouteTable) {
        const route = new CfnRoute(scope, routeInfo.id, {
            routeTableId: routeTable.ref,
            destinationCidrBlock: routeInfo.destinationCidrBlock
        });

        if (routeInfo.gatewayId) {
            route.gatewayId = routeInfo.gatewayId();
        } else if (routeInfo.natGatewayId) {
            route.natGatewayId = routeInfo.natGatewayId();
        }
    }

    private createAssociation(scope: Construct, associationInfo: AssociationInfo, routeTable: CfnRouteTable) {
        new CfnSubnetRouteTableAssociation(scope, associationInfo.id, {
            routeTableId: routeTable.ref,
            subnetId: associationInfo.subnetId()
        });
    }
}
