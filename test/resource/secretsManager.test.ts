import { expect, countResources, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('SecretsManager', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    expect(stack).to(countResources('AWS::SecretsManager::Secret', 1));
    expect(stack).to(haveResource('AWS::SecretsManager::Secret', {
        Description: 'for RDS cluster',
        GenerateSecretString: {
            ExcludeCharacters: '"@/\\\'',
            GenerateStringKey: 'MasterUserPassword',
            PasswordLength: 16,
            SecretStringTemplate: '{"MasterUsername": "admin"}'
        },
        Name: 'undefined-undefined-secret-rds-cluster'
    }));
});
