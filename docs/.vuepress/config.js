module.exports = {
  title: 'ララ帳まとめ',
  description: 'PHP フレームワーク Laravel の学習帳',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Laravel 入門', link: '/tutorial/' },
      // { text: 'Laravel の仕組み', link: '/architecture/' },
      // { text: 'パッケージ紹介', link: '/packages/' },
      // { text: 'API 開発入門', link: '/api/' },
      // { text: 'Vue 入門', link: '/vue/' },
      // { text: 'Q&A', link: 'https://ja.stackoverflow.com/questions/tagged/laravel' }
    ],
    sidebar: {
      '/tutorial/': [
        '',
        'install',
        'display_pages',
        'create_view',
      ],
    }
  }
}
