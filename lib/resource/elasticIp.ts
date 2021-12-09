import { Construct } from 'constructs';
import { CfnEIP } from 'aws-cdk-lib/aws-ec2';
import { Resource } from './abstract/resource';

interface ResourceInfo {
    readonly id: string;
    readonly resourceName: string;
    readonly assign: (elasticIp: CfnEIP) => void;
}

export class ElasticIp extends Resource {
    public ngw1a: CfnEIP;
    public ngw1c: CfnEIP;

    private readonly resources: ResourceInfo[] = [
        {
            id: 'ElasticIpNgw1a',
            resourceName: 'eip-ngw-1a',
            assign: elasticIp => this.ngw1a = elasticIp
        },
        {
            id: 'ElasticIpNgw1c',
            resourceName: 'eip-ngw-1c',
            assign: elasticIp => this.ngw1c = elasticIp
        }
    ];

    constructor() {
        super();
    }

    createResources(scope: Construct) {
        for (const resourceInfo of this.resources) {
            const elasticIp = this.createElasticIp(scope, resourceInfo);
            resourceInfo.assign(elasticIp);
        }
    }

    private createElasticIp(scope: Construct, resourceInfo: ResourceInfo): CfnEIP {
        const elasticIp = new CfnEIP(scope, resourceInfo.id, {
            domain: 'vpc',
            tags: [{
                key: 'Name',
                value: this.createResourceName(scope, resourceInfo.resourceName)
            }]
        });

        return elasticIp;
    }
}
