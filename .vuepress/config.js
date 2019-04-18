module.exports = {
  title: 'Authmore',
  description: '基于 OAuth2.0 协议的跨域认证授权开发套件',
  port: "3000",
  dest: "docs",
  base: "/",
  head: ['link', {
    rel: 'icon', href: '/favicon.ico'
  }],
  themeConfig: {
    displayAllHeaders: true,
    sidebar: {
      "/guide/": [{
        title: "快速入门",
        collapsable: false,
        children: [
          "",
          "manage",
          "create-client",
          "create-resource"
        ]
      }]
    }
  }
}