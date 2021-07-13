import { expect, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../lib/devio-stack';

test('Context', () => {
  const app = new cdk.App({
    context: {
      'systemName': 'starwars',
      'envType': 'prd'
    }
  });
  const stack = new Devio.DevioStack(app, 'DevioStack');

  expect(stack).to(haveResource('AWS::EC2::VPC', {
    Tags: [{ Key: 'Name', Value: 'starwars-prd-vpc' }]
  }));
});
