# ページの表示フロー

![Laravel MVC](https://laravel10.files.wordpress.com/2015/02/laravel_mvc1.png)

Lavarl は [MVCモデル](https://ja.wikipedia.org/wiki/Model_View_Controller)のフレームワークで、処理の流れは基本的には上図のようになります。この記事では上図の Model, Database 部分を除いた、User -&gt; Routing -&gt; Controller -&gt; View の部分をシンプルに追いかけてみます。


## プロジェクト作成

まずは新規のプロジェクトを作成します。プロジェクト名を blog とします。

~~~bash
laravel new blog
cd blog
php artisan serve
~~~

PHP のビルトインサーバでプロジェクトを起動します。
ブラウザで http://localhost:8000 にアクセスし、"Laravel" のロゴが表示されることを確認します。

## ディレクトリ構成

まずはディレクトリ構成を見てみます。たくさんディレクトリやファイルがありますが、ざっと眺めておくだけにしておきます。Laravel を使っていくうちに、段々わかってきます。１歩づつ進みましょう。
まずはこの記事で関連するディレクトリのみ紹介します。

~~~
blog
├── app
│   └── Http
│       └── Controllers
├── resources
│   └── views
└── routes
~~~

## Routing

最初に Routeing 設定を記述する routes/web.php を見てみます。

~~~php
<?php // routes/web.php

Route::get('/', function () {
    return view('welcome');
});
~~~

| HTTP メソッド| パス | アクション   |
|-------------|-----|------------|
| GET         | /   | クロージャー |

アクション部分でクロージャー（無名関数）を使っています。
クロージャーの中で、welcomeビューを表示するよう（レスポンスとして返すよう）支持しています。
HTTPメソッドやパスの組合せに応じたアクションを実行するのが、Routing の役割です。

## View

次に、上記の 'welcom' ビューを見てみます。
ビューファイルは app/resources/views に格納されています。

~~~html
<!-- resouces/views/welcome.blade.php -->

<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        ...
        <title>Laravel</title>
        ...
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            ...
            <div class="content">
                <div class="title m-b-md">
                    Laravel
                </div>
                ...
            </div>
        </div>
    </body>
</html>
~~~

これがまさに http://localhost:8000/ にアクセスした時に表示されたHTMLです。

Laravel では bladeというテンプレートエンジンを使って、ビューファイル（HTMLテンプレート）からHTMLを生成しています。その為、ファイルの拡張子は .blade.php となります。この例では welcome.blade.php となります。

View の役割は データをユーザが見やすい形に変換することです。User Interface の出力の部分を担っています。

## Controller

先ほどのRoutingでは、アクションにクロージャーを使用していました。
ここでは、簡単なコントローラを作成して、クロージャーと差替えてみます。

artisanコマンドを使って、コントローラを作成します。

~~~bash
php artisan make:controller WelcomeController
~~~

中身が空の WelcomeController.php が生成されるので、以下のように index() メソッドを追加します。

~~~php
<?php // app/Http/Controllers/WelcomeController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        return view('welcome');
    }
}
~~~

index メソッドは view 関数を実行し、その戻り値を返しています。view 関数の戻り値がブラウザへのレスポンスになります。

view 関数はビューファイルから HTML を作成するヘルパー関数になります。ここでは welcome ビューを使って HTML を作成するように指示しています。

コントローラはユーザからの入力データを受け取り、Model に処理を依頼し、実行した結果の表示を View に依頼します。この例は究極にシンプルで、View には何も渡さず、ただ HTML を返してもらっています。

Routing 設定のアクションをクロージャーからコントローラに変更します。

~~~php
<?php // routes/web.php

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/', 'WelcomeController@index');
~~~

| HTTP メソッド | パス | アクション |
|--------------|-----|----------|
| GET          | /   | WelcomeControllerクラスの<br> index メソッドを実行する |

アクションの部分は “コントローラクラス名@メソッド名”と記述することで、コントローラクラスのメソッドを呼び出すことができます。

ブラウザで http://localhost:8000 にアクセスし、動作確認を行います。
"Laravel" のロゴが表示されれば成功です。

----

## まとめ

以下のことが理解できました。

- Routing -&gt; Controller -&gt; View の一連の流れ
- Routing, Controller, View のディレクトリ・ファイル構成
- Routing設定
- Routing設定のクロージャーからの Viewの呼び出し
- Controllerからの Viewの呼び出し

Laravel の Routing, Controller, View を駆け足で見てみました。
シンプルな内容でしたが、Webアプリケーションフレームワークの基本フローが学べました。
何事も基本が大切です。
