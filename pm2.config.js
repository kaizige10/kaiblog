// 参考：https://pm2.keymetrics.io/docs/usage/application-declaration/
// 注意：必须在pm2.config.js的目录下执行pm2 start命令，否则可能会报错（如找不到文件等）
module.exports = {
    apps: [
        {
            name: 'blog',//应用名
            script: './fileserver/fileserver.js',//启动文件
            cwd: './',// 当前工作路径
            // watch: ['../.vuepress/dist'],// 监控的路径，一旦文件变化，自动重启
            // ignore_watch: [],// 忽略变化的目录
            merge_logs: true,
            log_date_format: "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
            args: ['--color'], // 保留记录器的日志颜色
        },
        {
            name: 'webhook',//应用名
            script: './webhook/webhook.js',//启动文件
            cwd: './',// 当前工作路径
            // watch: ['./webhook'],// 监控的路径，一旦文件变化，自动重启
            // ignore_watch: [],// 忽略变化的目录
            merge_logs: true,
            log_date_format: "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
            args: ['--color'], // 保留记录器的日志颜色
        },
    ]
}