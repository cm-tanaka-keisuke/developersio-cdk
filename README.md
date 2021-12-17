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
| 14 | ネットワーク ACL | `14.network-acl` | ネットワーク ACL の実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-14-network-acl/) | 2021/06/28 |
| 15 | IAM ロール | `15.iam-role` | IAM ロールの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-15-iam-role/) | 2021/07/01 |
| 16 | セキュリティグループ | `16.security-group` | セキュリティグループの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-16-security-group/) | 2021/07/05 |
| 17 | EC2 | `17.ec2` | EC2 の実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-17-ec2/) | 2021/07/07 |
| 18 | ALB | `18.alb` | ALB の実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-18-alb/) | 2021/07/12 |
| 19 | Secrets Manager | `19.secrets-manager` | Secrets Manager の実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-19-secrets-manager/) | 2021/07/15 |
| 20 | RDS サブネットグループ | `20.rds-subnet-group` | RDS サブネットグループの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-20-rds-subnet-group/) | 2021/07/19 |
| 21 | RDS パラメータグループ | `21.rds-parameter-group` | RDS パラメータグループの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-21-rds-parameter-group/) | 2021/07/22 |
| 22 | RDS クラスター | `22.rds-cluster` | RDS クラスターの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-22-rds-cluster/) | 2021/07/26 |
| 23 | RDS インスタンス | `23.rds-instance` | RDS インスタンスの実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-23-rds-instance/) | 2021/07/29 |
| 24 | デバッグ | `24.debug` | デバッグ方法のご紹介 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-24-debug/) | 2021/09/09 |
| 25 | Session Manager で SSH 接続 | `25.session-manager-ssh` | SSM の Session Manager を利用した、ローカルマシンから EC2 インスタンスへの SSH 接続方法 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-25-session-manager-ssh/) | 2021/09/16 |
| 26 | Version 2 | `26.version-2` | AWS CDK v2 の紹介とマイグレーション | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-26-version-2/) | 2021/12/10 |
| 27 | スタック分割 | `27.split-stack` | CDK におけるクロススタック参照 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-27-split-stack/) | 2021/12/13 |
| 28 | VPC Stack | `28.vpc-stack` | VPC Stack の実装 | [コチラ](https://dev.classmethod.jp/articles/cdk-practice-28-vpc-stack/) | 2021/12/17 |

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
| macOS | 12.0.1 |
| VS Code | 1.63.1 |
| AWS CLI | 2.4.5 |
| AWS CDK | 2.2.0 |
| TypeScript | 4.5.2 |
| Node.js | v14.17.4 |
