try {
    const http = require('http')
    const chalk = require('chalk')
    const log = console.log
    const createHandler = require('github-webhook-handler')
    const privateConfig = require('../../myblogconfig/private.config.js')
    log(chalk.red(JSON.stringify(privateConfig)))
    
    const handler = createHandler({
        path: '/blog_deploy',
        secret: privateConfig.webhookSecret
    })
    http.createServer((req, res) => {
        handler(req, res, err => {
            res.statusCode = 404
            res.end('no such location')
        })
    }).listen(7777, () => {
        log(chalk.green('webhook listen on 7777'))
    })

    handler.on('error', err => {
        log(chalk.red('Error', err.message))
    })

    // handler.on('*', event => {
    //     log(chalk.green(('received', event.payload);
    // })

    // 监听push事件，然后重新打包、部署我的博客
    handler.on('push', async event => {
        log(chalk.green('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref))
        // 分支判断
        if (event.payload.ref === 'refs/heads/master') {
            log(chalk.yellow('部署博客中，请等待几分钟...'))

            const pm2stopblogResult = await run_cmd('pm2', ['stop', 'blog'])
            log(chalk.green(pm2stopblogResult))

            const gitpullResult = await run_cmd('git', ['pull'])
            log(chalk.green(gitpullResult))

            const yarnInstallResult = await run_cmd('yarn')
            log(chalk.green(yarnInstallResult))

            const yarnbuildResult = await run_cmd('yarn', ['build'])
            log(chalk.green(yarnbuildResult))

            const pm2startblogResult = await run_cmd('pm2', ['start', 'blog'])
            log(chalk.green(pm2startblogResult))
            
        }
    })

    function run_cmd(cmd, args = []) {
        return new Promise((resolve, reject) => {
            const spawn = require('child_process').spawn
            const child = spawn(cmd, args)
            const name = cmd + args.join(' ')

            child.stdout.on('data', buffer => log(buffer.toString()))
            child.stdout.on('end', () => resolve(`${name} 命令执行成功`))

            child.stderr.on('data', error => log(chalk.red(`${name} 命令执行异常，原因：${error}`)))
        })
        
    }

} catch (e) {
    log(chalk.red(e))
}