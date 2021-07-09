import * as cdk from '@aws-cdk/core';
import { CfnDBSubnetGroup, CfnDBClusterParameterGroup, CfnDBParameterGroup, CfnDBCluster } from '@aws-cdk/aws-rds';
import { CfnSubnet, CfnSecurityGroup } from '@aws-cdk/aws-ec2';
import { CfnSecret } from '@aws-cdk/aws-secretsmanager';
import { Resource } from './abstract/resource';
import { SecretsManager, OSecretKey } from './secretsManager';

export class Rds extends Resource {
    public dbCluster: CfnDBCluster;

    private readonly subnetDb1a: CfnSubnet;
    private readonly subnetDb1c: CfnSubnet;
    private readonly securityGroupRds: CfnSecurityGroup;
    private readonly secretRdsCluster: CfnSecret;

    private static readonly databaseName = 'devio';

    constructor(
        subnetDb1a: CfnSubnet,
        subnetDb1c: CfnSubnet,
        securityGroupRds: CfnSecurityGroup,
        secretRdsCluster: CfnSecret
    ) {
        super();
        this.subnetDb1a = subnetDb1a;
        this.subnetDb1c = subnetDb1c;
        this.securityGroupRds = securityGroupRds;
        this.secretRdsCluster = secretRdsCluster;
    };

    createResources(scope: cdk.Construct) {
        const subnetGroup = this.createSubnetGroup(scope);
        const clusterParameterGroup = this.createClusterParameterGroup(scope);
        const parameterGroup = this.createParameterGroup(scope);
        this.dbCluster = this.createCluster(scope, subnetGroup, clusterParameterGroup);
    }

    private createSubnetGroup(scope: cdk.Construct): CfnDBSubnetGroup {
        const subnetGroup = new CfnDBSubnetGroup(scope, 'RdsDbSubnetGroup', {
            dbSubnetGroupDescription: 'Subnet Group for RDS',
            subnetIds: [this.subnetDb1a.ref, this.subnetDb1c.ref],
            dbSubnetGroupName: this.createResourceName(scope, 'rds-sng')
        });

        return subnetGroup;
    }

    private createClusterParameterGroup(scope: cdk.Construct): CfnDBClusterParameterGroup {
        const clusterParameterGroup = new CfnDBClusterParameterGroup(scope, 'RdsDbClusterParameterGroup', {
            description: 'Cluster Parameter Group for RDS',
            family: 'aurora-mysql5.7',
            parameters: { time_zone: 'UTC' }
        });

        return clusterParameterGroup;
    }

    private createParameterGroup(scope: cdk.Construct): CfnDBParameterGroup {
        const parameterGroup = new CfnDBParameterGroup(scope, 'RdsDbParameterGroup', {
            description: 'Parameter Group for RDS',
            family: 'aurora-mysql5.7'
        });

        return parameterGroup;
    }

    private createCluster(scope: cdk.Construct, subnetGroup: CfnDBSubnetGroup, clusterParameterGroup: CfnDBClusterParameterGroup): CfnDBCluster {
        const cluster = new CfnDBCluster(scope, 'RdsDbCluster', {
            engine: 'aurora-mysql',
            backupRetentionPeriod: 7,
            databaseName: Rds.databaseName,
            dbClusterIdentifier: this.createResourceName(scope, 'rds-cluster'),
            dbClusterParameterGroupName: clusterParameterGroup.ref,
            dbSubnetGroupName: subnetGroup.ref,
            enableCloudwatchLogsExports: ['error'],
            engineMode: 'provisioned',
            engineVersion: '5.7.mysql_aurora.2.10.0',
            masterUserPassword: SecretsManager.getDynamicReference(this.secretRdsCluster, OSecretKey.MasterUserPassword),
            masterUsername: SecretsManager.getDynamicReference(this.secretRdsCluster, OSecretKey.MasterUsername),
            port: 3306,
            preferredBackupWindow: '19:00-19:30',
            preferredMaintenanceWindow: 'sun:19:30-sun:20:00',
            storageEncrypted: true,
            vpcSecurityGroupIds: [this.securityGroupRds.attrGroupId]
        });

        return cluster;
    }
}
