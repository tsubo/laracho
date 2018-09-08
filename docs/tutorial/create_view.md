# ビューの作成

前回は Laravel フレームワークがページを表示するまでのフローを追いました。
今回は、自分で新しいページ（ビュー）を作成し、表示してみます。

## シナリオ

contact ページを作成する

## Routing

routers/web.php に contact への GET アクセスの設定を追加します。

~~~php
// routers/web.php

Route::get('/', 'WelcomeController@index');
Route::get('contact', 'WelcomeController@contact');   // 追加
~~~

## Controller

WelcomeController.php に contact メソッドを追加します。

~~~php
app/Http/Controllers/WelcomeController.php

<?php
namespace App\Http\Controllers;

class WelcomeController extends Controller {
    // ...
    public function contact()  // 追加
    {
        return "contact";  // (a) view 関数を使わず、テキストを返してみる
    }
}
~~~

まずは (a) の部分で view関数を使わず、単にテキストを返してみます。
ブラウザで http://localhost:8000/contact を表示すると...

**"contact" が表示されました**

単にテキストをかえすことも出来るんです。

viewを表示するよう変更します。

~~~php
// app/Http/Controllers/WelcomeController.php

    public function contact()
    {
         return view("contact");  // (a) view 関数に変更
    }
}
~~~

ブラウザで http://localhost:8000/contact を表示すると...

~~~
InvalidArgumentException
View [contact] not found.
~~~

エラーが出ました。
これはまだ、contact.blade.php を作成していないので、Viewが見つからないと言われています。

## View

contact.blade.phpを作成します。内容はただのHTMLとします。

~~~html
<!-- resources/view/contact.blade.php -->

<!DOCTYPE HTML>
<html>
<head>
    <title>contact</title>
</head>
<body>
    <h1>contact me!</h1>
</body>
</html>
~~~

ブラウザで http://localhost:8000/contact を表示すると...

~~~
contact me!
~~~

新しいページが表示できましたね。
成功です。

## まとめ

以下のことが出来るようになりました。

* Routing設定の追加
* Controllerへのメソッド追加と Viewの呼び出し
* View の新規作成と表示
