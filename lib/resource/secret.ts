import { CfnSecret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";

export const OSecretKey = {
    MasterUsername: 'MasterUsername',
    MasterUserPassword: 'MasterUserPassword'
} as const;
type SecretKey = typeof OSecretKey[keyof typeof OSecretKey];

interface ResourceInfo {
    readonly id: string;
    readonly description: string;
    readonly generateSecretString: CfnSecret.GenerateSecretStringProperty;
    readonly resourceName: string;
    readonly assign: (secret: CfnSecret) => void;
}

export class Secret extends BaseResource {
    public readonly rdsCluster: CfnSecret;

    private static readonly rdsClusterMasterUsername = 'admin';
    private readonly resources: ResourceInfo[] = [{
        id: 'SecretRdsCluster',
        description: 'for RDS cluster',
        generateSecretString: {
            excludeCharacters: '"@/\\\'',
            generateStringKey: OSecretKey.MasterUserPassword,
            passwordLength: 16,
            secretStringTemplate: `{"${OSecretKey.MasterUsername}": "${Secret.rdsClusterMasterUsername}"}`
        },
        resourceName: 'secret-rds-cluster',
        assign: secret => (this.rdsCluster as CfnSecret) = secret
    }];

    constructor(scope: Construct) {
        super();

        for (const resourceInfo of this.resources) {
            const secret = this.createSecret(scope, resourceInfo);
            resourceInfo.assign(secret);
        }
    }

    public static getDynamicReference(secret: CfnSecret, secretKey: SecretKey): string {
        return `{{resolve:secretsmanager:${secret.ref}:SecretString:${secretKey}}}`;
    }

    private createSecret(scope: Construct, resourceInfo: ResourceInfo): CfnSecret {
        const secret = new CfnSecret(scope, resourceInfo.id, {
            description: resourceInfo.description,
            generateSecretString: resourceInfo.generateSecretString,
            name: this.createResourceName(scope, resourceInfo.resourceName)
        });

        return secret;
    }
}
