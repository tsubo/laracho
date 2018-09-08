# インストール

Laravel 5.6 をインストールしてプロジェクトを作成してみます。


## 要求事項

laravel を動かすには以下の要件を満たす必要があります。

* PHP &gt;= 7.1.3
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* Tokenizer PHP Extension
* XML PHP Extension
* Ctype PHP Extension
* JSON PHP Extension


## composer のインストール

laravel ではパッケージ（ライブラリ）の依存関係の管理に `composer` を使用しています。laravel を動かすコンピュータには composer をインストールする必要があります。

~~~bash
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
~~~

## laravel のインストールとプロジェクト作成

laravel でプロジェクトを作成する方法は２通りあります。

1. composer 経由でプロジェクトを作成
2. laravel インストーラでプロジェクトを作成

### composer 経由でプロジェクト作成

composer コマンドに create-project オプションを指定してプロジェクトを作成します。

~~~bash
composer create-project --prefer-dist laravel/laravel PROJECT_NAME
~~~

'laravel/laravel' の部分は 'ベンダー名/パッケージ名' です。laravel のプロジェクトを作成するには 'laravel/laravel' と指定します。

'--prefer-dist' の部分はオプションになり、以下の２種類が指定できます。

* --prefer-soruce: ソースコードリポジトリから開発版をダウンロードします。
* --prefer-dist: リリース版、安定版をダウンロードします。

また、composer経由の場合、バージョン指定が可能で、古いバージョンのLaravelでプロジェクトを作成することもできます。以下は ver 4.2 を指定した例です。

~~~bash
composer create-project laravel/laravel --prefer-dist PROJECT_NAME 4.2
~~~

### laravel インストーラを使ったプロジェクト作成

最初に composer を使って laravel インストーラをインストールします。

~~~bash
composer global require "laravel/installer"
~~~

ダウンロードが完了すると、`~/.composer/vendor/bin/laravel` ファイルが作成されます。これが laravel インストーラコマンドです。コマンドを実行するためには `~/.composer/vendor/bin` に、PATHを通しておく必要があります。

~~~bash
# ~/.bashrc

export PATH=$HOME/.composer/vendor/bin:$PATH
~~~

`laravel new` コマンドを使ってプロジェクトを作成します。

~~~bash
laravel new PROJECT_NAME
~~~

## 環境設定

プロジェクトのディレクトリに移動して、環境設定を行います。

~~~bash
cd PROJECT_NAME
~~~

### .env

.env ファイルが作成されていない場合は、.env.exampleからコピーして作成し、`php artisan key:generate` を実行します。

~~~bash
cp .env.example .env
php artisan key:generate
~~~

.env ファイルは実行環境ごとに分ける必要がある情報を格納しています。パスワードやデーターベース名等を開発機やステージング機、商用機等毎に個別に設定することが出来ます。

`php artisan key:generate` を実行すると .env 内の APP_KEY にアプリケーション固有のランダムストリングが設定されます。APP_KEYはユーザーのセッション情報やパスワードの暗号化等をセキュアにする為に必要になります。

※ git を使っている方は、.env を .gitignore ファイルに追加することをお忘れなく！

### config/app.php

時間と言語を設定します。

~~~php
// config/app.php
return [
    // ...

    'timezone' => 'Asia/Tokyo',
    'locale' => 'ja',

    // ...
];
~~~

### config/database.php

データベースの設定をします。
下記の例はDBを sqliteに設定する時の例です。

`.env` ファイルに `DB_CONNECTION=sqlite` を追加します。

~~~bash
# .env

DB_CONNECTION=sqlite

# sqlite のデフォルト設定を使うのでコメントアウト
# DB_DATABASE=homestead
~~~

`DB_CONNECTION` を `sqlite` に指定することで、`config/database.php` 内に定義されている `sqlite` 用のDB接続設定を Laravel が使用します。

~~~php
// config/database.php

return [
    ...

    'default' => env('DB_CONNECTION', 'mysql'),

    ...

    'connections' => [
        'sqlite' => [
            'driver' => 'sqlite',
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
        ],
        ...
    ],
    ...
];
~~~

上記の sqlite 接続設定では .env に DB_DATABSE 設定がなければ、database/database.sqlite ファイルを使用するように設定されているので、そのファイルを作成します。

~~~bash
touch database/database.sqlite
~~~

### permissions

strageとbootstrap/cacheディレクトリにread, write 権限が必要です。www サーバの設定に合わせて、chownするなり、chmodeするなりして設定します。

~~~bash
# chownの例

chown -R USER_NAME:GROUP_NAME storage
chown USER_NAME:GROUP_NAME bootstrap/cache
~~~

※ USER_NAME、GROUP_NAMEは wwwサーバの設定に合わせて読み替えてください。

## 実行

PHPのビルトインサーバーで Laravel アプリを実行してみます。

~~~bash
php -S localhost:8000 -t public
~~~

`-t` オプションで Laravle プロジェクトの ドキュメントルートである `public` ディレクトリを指定します。

www ブラウザで [localhost:8000](http://localhost:8000) にアクセスし、`Laravel` と大きなロゴが表示されればインストール成功です。

ビルトインサーバは `artisan` コマンドでも実行可能です。こちらの方が短くて使いやすいかも。

~~~bash
php artisan serve
~~~

ビルトインサーバーを終了するには Ctrl-C を押します。

~~~bash
php artisan serve

Laravel development server started: &lt;http://127.0.0.1:8000&gt;
[Tue Aug 28 18:36:42 2018] 127.0.0.1:60702 [200]: /favicon.ico
[Tue Aug 28 18:36:44 2018] 127.0.0.1:60706 [200]: /favicon.ico

^C
~~~

## 次の一歩

Laravel の最初のプロジェクト作成に成功しました。これから Laravel でのアプリケーション開発を習得するには何からはじめたらよいでしょうか？その第一歩として、以下の Laracast がおすすめです。英語ですが、大体分かると思います。但し、この動画はv5.4の内容になります。

[Laracast - Laravel 5.4 From Scratch](https://laracasts.com/series/laravel-from-scratch-2017)

