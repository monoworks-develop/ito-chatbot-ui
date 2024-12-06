# OBO フローについて

[OBO フロー](https://learn.microsoft.com/ja-jp/entra/identity-platform/v2-oauth2-on-behalf-of-flow)とは別のアプリケーションで発行されたトークンを使用してアプリケーションの認証を行う仕組みのことです。  
このプロジェクトでは UI 側で発行したトークンを使用して API を認証しています。  
こうすることで、API をセキュリティ的に保護できます。

**以下に一応手順は書いておきますが、一度自身で OBO フローの概念や設定方法を調べていただいて理解してもらったう上で、それでも詰まった時に手順を見ることをお勧めします。**

手順が分らなかった場合は [rg-ito-chatbot](https://portal.azure.com/#@monoworks.co.jp/resource/subscriptions/dc3edebd-5216-4877-ac8e-c874c36be146/resourceGroups/rg-ito-chatbot/overview) で既に構築済みですので、こちらの設定値も参照してください。  
また、ここではリソースエクスプローラーの使い方等は解説しません。

## トークンの取得方法

対象の App Service に認証プロバイダーがすでに設定されていることが必須です。

### 発行

`{対象のアプリケーションのルートURL}/.auth/me`

### 消去 → 消去後再発行できます。

`{対象のアプリケーションのルートURL}/.auth/refresh`

## 設定方法

トークンを発行する側（UI）とトークンを受け取る側（API）でそれぞれ設定が必要です。  
ここでは発行する側を甲、受け取る側を乙として解説します。  
また認証アプリケーションとは対象の App Service → 認証 → ID プロバイダーに設定されているアプリケーションを指します。

### 発行する側

甲の発行するトークンに乙へのアクセス許可とスコープを含める必要があります。

#### アクセス許可

1. 甲の認証アプリケーションに移動
1. API のアクセス許可 → アクセス許可の追加 → 乙のアプリケーション → 委任されたアクセス許可 → user_impersonation を追加

#### スコープ

これはリソースエクスプローラーからしか設定できません。  
予め、乙の認証アプリケーションの ID をメモしておいてください。

1. 甲の authSettingsV2 を開く
1. azureActiveDirectory: login: に以下を追加
   > "loginParameters": ["scope=openid offline_access api://{メモした ID}/user_impersonation"]

### 受け取る側

これはリソースエクスプローラーからしか設定できません。
予め、甲の認証アプリケーションの ID をメモしておいてください。

1. 乙の authSettingsV2 を開く
1. azureActiveDirectory: validation: jwtClaimChecks: に以下を追加
   > "allowedClientApplications": ["メモした ID"]
1. azureActiveDirectory: validation: defaultAuthorizationPolicy: allowedApplications: にメモした ID を追加

### 共通の設定

甲乙両方で設定が必要です。

1. 認証アプリケーションに移動
1. マニフェスト
1. AAD Graph アプリ マニフェスト (間もなく非推奨に)
1. accessTokenAcceptedVersion を 2 に
