# 実践！AWS CDK

[DevelopersIO](https://dev.classmethod.jp) **実践！AWS CDK** シリーズのソースコードを公開します。

### 対応表

| # | タイトル | Tags | 内容 | ブログリンク |
| --- | --- | --- | --- | --- |
| 1 | 導入 | `1.introduction` | CDK プロジェクトの作成とサンプルリソースの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-1-introduction/)
| 2 | VPC | `2.vpc` | VPC の実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-2-vpc/)
| 3 | テスト | `3.test` | AWS CDK でのテスト方法 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-3-test/)

# Usage

1. 実行したい tag を checkout します

    ``` bash
    $ git checkout 1.introduction
    ```

1. 必要なモジュールをインストールします

    ``` bash
    $ npm install
    ```

1. お好みでソースコードをカスタマイズします
1. CloudFormation のテンプレートを作成します

    ``` bash
    $ cdk synth
    ```

1. デプロイします

    ``` bash
    $ cdk deploy
    ```

1. 用が済んだらリソースを削除します

    ``` bash
    $ cdk destroy
    ```

あとはご自由に。

# Environment

| 環境 | バージョン |
| --- | --- |
| macOS | 10.15.7 |
| VS Code | 1.56.2 |
| AWS CLI | 2.1.39 |
| AWS CDK | 1.104.0 |
| TypeScript | 4.2.4 |
| Node.js | v16.1.0 |
