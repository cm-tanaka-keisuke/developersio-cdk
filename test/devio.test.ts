import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Devio from '../lib/devio-stack';

test('Context', () => {
  const app = new App({
    context: {
      'systemName': 'starwars',
      'envType': 'prd'
    }
  });
  const stack = new Devio.DevioStack(app, 'DevioStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::EC2::VPC', 1);
  template.hasResourceProperties('AWS::EC2::VPC', {
    Tags: [{ Key: 'Name', Value: 'starwars-prd-vpc' }]
  });
});
