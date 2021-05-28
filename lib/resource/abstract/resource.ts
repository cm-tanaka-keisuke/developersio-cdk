import * as cdk from '@aws-cdk/core';

export abstract class Resource {
    constructor() { }

    abstract createResources(scope: cdk.Construct): void;

    protected createResourceName(scope: cdk.Construct, originalName: string): string {
        const systemName = scope.node.tryGetContext('systemName');
        const envType = scope.node.tryGetContext('envType');
        const resourceNamePrefix = `${systemName}-${envType}-`;

        return `${resourceNamePrefix}${originalName}`;
    }
}
