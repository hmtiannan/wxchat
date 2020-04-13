# wxchat
个人微信消息处理

1. 拉取仓库代码
git clone https://github.com/hmtiannan/wxchat.git

2. 安装依赖
npm install

3. 修改message/getnews.js下面一行，将地址改为自己配置的新闻接口
const api = 'http://172.19.237.198:5000/news'

4. 修改config.js里面的token为wxchaty社区提供的token

5. 修改定时任务schedule/index.js 中的topic为自己微信的群聊名称（前提需要将群聊名称添加到通讯录中），修改定时发送的时间
const CronJob = require('cron').CronJob
const getnews = require('../message/getnews')

module.exports = async bot => {
    // 每天上午8点，遍历topic发送新闻
    const job = new CronJob('00 00 08 * * *', async () => {
    const rooms = await bot.Room.findAll({ topic: /群聊名称1|mytest/ })
    const q = await getnews.todayNews()
    for (const room of rooms) {
      await room.say(q)
    }
  }, null, true, 'Asia/Shanghai');
}

6. 启动node
node index.js

7. 设置后台启动
nohup node index.js >wxchat.log 2>&1 &

