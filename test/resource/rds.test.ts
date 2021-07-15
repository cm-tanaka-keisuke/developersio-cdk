import { expect, countResources, haveResource, anything } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('Rds', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::RDS::DBSubnetGroup', 1));
    expect(stack).to(haveResource('AWS::RDS::DBSubnetGroup', {
        DBSubnetGroupDescription: 'Subnet Group for RDS',
        SubnetIds: anything(),
        DBSubnetGroupName: 'undefined-undefined-rds-sng'
    }));

    expect(stack).to(countResources('AWS::RDS::DBClusterParameterGroup', 1));
    expect(stack).to(haveResource('AWS::RDS::DBClusterParameterGroup', {
        Description: 'Cluster Parameter Group for RDS',
        Family: 'aurora-mysql5.7',
        Parameters: { time_zone: 'UTC' }
    }));

    expect(stack).to(countResources('AWS::RDS::DBParameterGroup', 1));
    expect(stack).to(haveResource('AWS::RDS::DBParameterGroup', {
        Description: 'Parameter Group for RDS',
        Family: 'aurora-mysql5.7'
    }));

    expect(stack).to(countResources('AWS::RDS::DBCluster', 1));
    expect(stack).to(haveResource('AWS::RDS::DBCluster', {
        Engine: 'aurora-mysql',
        BackupRetentionPeriod: 7,
        DatabaseName: 'devio',
        DBClusterIdentifier: 'undefined-undefined-rds-cluster',
        DBClusterParameterGroupName: anything(),
        DBSubnetGroupName: anything(),
        EnableCloudwatchLogsExports: ['error'],
        EngineMode: 'provisioned',
        EngineVersion: '5.7.mysql_aurora.2.10.0',
        MasterUsername: anything(),
        MasterUserPassword: anything(),
        Port: 3306,
        PreferredBackupWindow: '19:00-19:30',
        PreferredMaintenanceWindow: 'sun:19:30-sun:20:00',
        StorageEncrypted: true,
        VpcSecurityGroupIds: anything()
    }));

    expect(stack).to(countResources('AWS::RDS::DBInstance', 2));
    expect(stack).to(haveResource('AWS::RDS::DBInstance', {
        DBInstanceClass: 'db.r5.large',
        AutoMinorVersionUpgrade: false,
        AvailabilityZone: 'ap-northeast-1a',
        DBClusterIdentifier: anything(),
        DBInstanceIdentifier: 'undefined-undefined-rds-instance-1a',
        DBParameterGroupName: anything(),
        DBSubnetGroupName: anything(),
        EnablePerformanceInsights: true,
        Engine: 'aurora-mysql',
        MonitoringInterval: 60,
        MonitoringRoleArn: anything(),
        PerformanceInsightsRetentionPeriod: 7,
        PreferredMaintenanceWindow: 'sun:20:00-sun:20:30',
    }));
    expect(stack).to(haveResource('AWS::RDS::DBInstance', {
        DBInstanceClass: 'db.r5.large',
        AutoMinorVersionUpgrade: false,
        AvailabilityZone: 'ap-northeast-1c',
        DBClusterIdentifier: anything(),
        DBInstanceIdentifier: 'undefined-undefined-rds-instance-1c',
        DBParameterGroupName: anything(),
        DBSubnetGroupName: anything(),
        EnablePerformanceInsights: true,
        Engine: 'aurora-mysql',
        MonitoringInterval: 60,
        MonitoringRoleArn: anything(),
        PerformanceInsightsRetentionPeriod: 7,
        PreferredMaintenanceWindow: 'sun:20:30-sun:21:00',
    }));
});
