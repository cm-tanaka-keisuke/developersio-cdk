import { CfnDBCluster, CfnDBInstance } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { BaseResource } from "./abstract/base-resouce";
import { RdsParameterGroup } from "./rds-parameter-group";
import { RdsSubnetGroup } from "./rds-subnet-group";
import { Role } from "./role";
import { OSecretKey, Secret } from "./secret";
import { SecurityGroup } from "./security-group";

interface InstanceInfo {
    readonly id: string;
    readonly availabilityZone: string;
    readonly preferredMaintenanceWindow: string;
    readonly resourceName: string;
}

export class RdsDatabase extends BaseResource {
    private static readonly engine = 'aurora-mysql';
    private static readonly databaseName = 'devio';
    private static readonly dbInstanceClass = 'db.r5.large';
    private readonly instances: InstanceInfo[] = [
        {
            id: 'RdsDbInstance1a',
            availabilityZone: 'ap-northeast-1a',
            preferredMaintenanceWindow: 'sun:20:00-sun:20:30',
            resourceName: 'rds-instance-1a'
        },
        {
            id: 'RdsDbInstance1c',
            availabilityZone: 'ap-northeast-1c',
            preferredMaintenanceWindow: 'sun:20:30-sun:21:00',
            resourceName: 'rds-instance-1c'
        }
    ];

    constructor(
        scope: Construct,
        subnetGroup: RdsSubnetGroup,
        parameterGroup: RdsParameterGroup,
        secret: Secret,
        securityGroup: SecurityGroup,
        role: Role
    ) {
        super();

        const cluster = new CfnDBCluster(scope, 'RdsDbCluster', {
            engine: RdsDatabase.engine,
            backupRetentionPeriod: 7,
            databaseName: RdsDatabase.databaseName,
            dbClusterIdentifier: this.createResourceName(scope, 'rds-cluster'),
            dbClusterParameterGroupName: parameterGroup.cluster.ref,
            dbSubnetGroupName: subnetGroup.subnetGroup.ref,
            enableCloudwatchLogsExports: ['error'],
            engineMode: 'provisioned',
            engineVersion: '5.7.mysql_aurora.2.10.0',
            masterUserPassword: Secret.getDynamicReference(secret.rdsCluster, OSecretKey.MasterUserPassword),
            masterUsername: Secret.getDynamicReference(secret.rdsCluster, OSecretKey.MasterUsername),
            port: 3306,
            preferredBackupWindow: '19:00-19:30',
            preferredMaintenanceWindow: 'sun:19:30-sun:20:00',
            storageEncrypted: true,
            vpcSecurityGroupIds: [securityGroup.rds.attrGroupId]
        });
    }
}
