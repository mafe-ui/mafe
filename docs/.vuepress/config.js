module.exports = {
  base: '/mf_ui_test/',
  title: 'mf_ui_test',
  description: '~~~~~~~~~',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/wgjh5',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    nav: [{
        text: '主页',
        link: '/'
      },
      {
        text: '博客',
        link: '/blog/tab.md'
      },
      // {
      // text: '求索',
      // items: [
      //     // link：指向链接也可以是外网链接
      //     {text: 'Segmentfault', link: 'https://segmentfault.com/u/mulander'},
      // ]
      // },
    ],
    sidebar: [
      ['/', '首页'],
      {
        title: '我的博客',
        children: [
          ['/blog/tab.md', 'tab示例'],
          // ['/blog/vue.md', 'md中使用vue']
        ]
      }
    ]
  }
}
