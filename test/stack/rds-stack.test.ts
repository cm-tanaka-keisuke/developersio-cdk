import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { RdsStack } from '../../lib/stack/rds-stack';
import { VpcStack } from '../../lib/stack/vpc-stack';

test('Rds Stack', () => {
    const app = new App({
        context: {
            'systemName': 'devio',
            'envType': 'stg'
        }
    });
    const vpcStack = new VpcStack(app, 'VpcStack');
    const rdsStack = new RdsStack(app, 'RdsStack', vpcStack);
    const template = Template.fromStack(rdsStack);

    // Subnet Group
    template.resourceCountIs('AWS::RDS::DBSubnetGroup', 1);
    template.hasResourceProperties('AWS::RDS::DBSubnetGroup', {
        DBSubnetGroupDescription: 'Subnet Group for RDS',
        SubnetIds: Match.anyValue(),
        DBSubnetGroupName: 'devio-stg-rds-sng'
    });
});
