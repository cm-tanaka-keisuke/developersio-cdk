import { expect, countResources, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../lib/devio-stack';

test('Context', () => {
  const app = new cdk.App({
    context: {
      'systemName': 'starwars',
      'envType': 'prd'
    }
  });
  const stack = new Devio.DevioStack(app, 'Context');

  expect(stack).to(haveResource('AWS::EC2::VPC', {
    Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-vpc' }]
  }));
});

test('Vpc', () => {
  const app = new cdk.App();
  const stack = new Devio.DevioStack(app, 'Vpc');

  expect(stack).to(countResources('AWS::EC2::VPC', 1));
  expect(stack).to(haveResource('AWS::EC2::VPC', {
    CidrBlock: '10.0.0.0/16',
    Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-vpc' }]
  }));
});
