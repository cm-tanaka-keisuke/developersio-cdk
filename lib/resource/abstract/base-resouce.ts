import { Construct } from 'constructs';

export abstract class BaseResource {
    constructor() { }

    protected createResourceName(scope: Construct, originalName: string): string {
        const systemName = scope.node.tryGetContext('systemName');
        const envType = scope.node.tryGetContext('envType');
        const resourceNamePrefix = `${systemName}-${envType}-`;

        return `${resourceNamePrefix}${originalName}`;
    }
}
