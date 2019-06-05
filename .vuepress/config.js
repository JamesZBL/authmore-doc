module.exports = {
  title: 'Authmore',
  description: '基于 OAuth2.0 协议的开放平台认证授权开发套件',
  port: "3000",
  dest: "docs",
  base: "/",
  head: ['link', {
    rel: 'icon', href: 'favicon.ico'
  }],
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: '指南', link: '/guide/#开始使用' },
      { text: '客户端', link: '/guide/create-client.html#创建客户端' },
      { text: '资源服务', link: '/guide/create-resource.html#创建资源服务' },
      { text: '码云', link: 'https://gitee.com/zbl1996/authmore/' },
      { text: 'GitHub', link: 'https://github.com/JamesZBL/authmore/' }
    ],
    sidebar: {
      "/guide/": [{
        title: "快速入门",
        collapsable: false,
        children: [
          "",
          "manage",
          "create-client",
          "create-resource",
          "create-user"
        ]
      }]
    },
    repo: 'jameszbl/authmore-framework',
    repoLabel: '查看源码',
    docsRepo: 'jameszbl/authmore-doc',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '最后更新时间',
    serviceWorker: {
      updatePopup: {
        message: "此页内容刚刚更新了",
        buttonText: "查看新版"
      }
    }
  }
}