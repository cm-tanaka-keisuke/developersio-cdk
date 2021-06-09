# 実践！AWS CDK

[DevelopersIO](https://dev.classmethod.jp) **実践！AWS CDK** シリーズのソースコードを公開します。

### 対応表

| # | タイトル | Tags | 内容 | ブログリンク | 投稿日 |
| --- | --- | --- | --- | --- | --- |
| 1 | 導入 | `1.introduction` | CDK プロジェクトの作成とサンプルリソースの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-1-introduction/) | 2021/05/15 |
| 2 | VPC | `2.vpc` | VPC の実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-2-vpc/) | 2021/05/17 |
| 3 | テスト | `3.test` | AWS CDK でのテスト方法 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-3-test/) | 2021/05/20 |
| 4 | Context | `4.context` | Context のご紹介 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-4-context/) | 2021/05/24 |
| 5 | サブネット | `5.subnet` | サブネットの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-5-subnet/) | 2021/05/27 |
| 6 | Metadata | `6.metadata` | Metadata の除外設定 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-6-metadata/) | 2021/05/31 |
| 7 | ファイル分割 | `7.split-file` | ファイル分割の実施 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-7-split-file/) | 2021/06/03 |
| 8 | 抽象化 | `8.abstraction` | 抽象クラスの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-8-abstraction/) | 2021/06/07 |
| 9 | リファクタリング | `9.refactoring` | サブネット生成処理のリファクタリング | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-9-refactoring/) | 2021/06/10 |
| 10 | インターネットゲートウェイ | `10.internet-gateway` | インターネットゲートウェイの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-10-internet-gateway/) | 2021/06/14 |
| 11 | Elastic IP | `11.elastic-ip` | Elastic IP の実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-11-elastic-ip/) | 2021/06/17 |
| 12 | NAT ゲートウェイ | `12.nat-gateway` | NAT ゲートウェイの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-12-nat-gateway/) | 2021/06/21 |
| 13 | ルートテーブル | `13.route-table` | ルートテーブルの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-13-route-table/) | 2021/06/24 |

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
| macOS | 11.3.1 |
| VS Code | 1.56.2 |
| AWS CLI | 2.1.39 |
| AWS CDK | 1.107.0 |
| TypeScript | 4.2.4 |
| Node.js | v16.1.0 |
