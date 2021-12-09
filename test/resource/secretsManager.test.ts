import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as Devio from '../../lib/devio-stack';

test('SecretsManager', () => {
    const app = new App();
    const stack = new Devio.DevioStack(app, 'DevioStack');
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::SecretsManager::Secret', 1);
    template.hasResourceProperties('AWS::SecretsManager::Secret', {
        Description: 'for RDS cluster',
        GenerateSecretString: {
            ExcludeCharacters: '"@/\\\'',
            GenerateStringKey: 'MasterUserPassword',
            PasswordLength: 16,
            SecretStringTemplate: '{"MasterUsername": "admin"}'
        },
        Name: 'undefined-undefined-secret-rds-cluster'
    });
});
