const glob = require('glob')
const privateConfig = require('../../myblogconfig/private.config.js')

// 自动查找blogs下面的所有md
const blogFolderName = 'blogs/'
const groups = glob.sync(blogFolderName + '*')
const mdFiles = glob.sync(blogFolderName + '**/*.md')
const sidebarAutoConfigs = groups.map(group => {
    const title = group.substring(blogFolderName.length)
    const groupMdFiles = mdFiles.filter(item => item.startsWith(group)).map(item => '/' + item.substr(0, item.length - 3))
    return {
        title,
        collapsable: false,
        children: groupMdFiles
    }
})

const sidebar = [// 侧边栏，默认首页
    {
        title: '首页',
        collapsable: false,
        children: ['/']
    },
].concat(sidebarAutoConfigs);

module.exports = {
    title: '凯子歌的博客',
    description: '开始练手~',
    themeConfig: {
        nav: [// 导航栏
            { text: '首页', link: '/' }
        ],
        sidebar: sidebar,
        // sidebar: 'auto',
        smoothScroll: true,
    },
    markdown: {
        lineNumbers: true
    },
    plugins: [
        '@vuepress/back-to-top',
        [
            'vuepress-plugin-comment',
            {
                choosen: 'valine',
                options: {
                    el: '#valine-vuepress-comment',
                    appId: privateConfig.appId,
                    appKey: privateConfig.appKey,
                    path: '<%- frontmatter.to.path %>',// 解决vuepress切换页面时评论无法刷新的问题
                }
            }
        ]
    ]
}