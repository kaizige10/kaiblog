const express = require('express')
const path = require('path')
const app = express()
const chalk = require('chalk')

app.use(express.static(path.resolve(__dirname, '../.vuepress/dist')))

app.listen(8889, () => {
    console.log(chalk.green('文件服务器已启动，监听8889端口。'))
})