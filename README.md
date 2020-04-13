## 实现功能
（1）定时推送新闻简报

## 运行环境
```
操作系统：centos 7
Python 3.7.4
node v10.16.3
```

## 执行步骤
1. 拉取仓库代码
```bash
git clone https://github.com/hmtiannan/wxchat.git

```

2. 安装依赖
```bash
npm install
```

3. 修改message/getnews.js下面一行，将地址改为自己配置的新闻接口（这里我自己用flask写了一个api，爬取第三方新闻）
```
const api = 'http://192.168.1.119:5000/news'
```
![image](https://github.com/hmtiannan/wxchat/blob/master/demo_imgs/newsdemo.png)

4. 修改config.js里面的token为wxchaty社区提供的token

5. 修改定时任务schedule/index.js 中的topic为自己微信的群聊名称（前提需要将群聊名称添加到通讯录中），修改定时发送的时间
```node
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
```

6. 启动node
```bash
node index.js
```

7. 设置后台启动
```bash
nohup node index.js >wxchat.log 2>&1 &
```
8. 测试结果

<img src="https://github.com/hmtiannan/wxchat/blob/master/demo_imgs/tpmytest.jpg" width = "250" width = "200"/>

<img src="https://github.com/hmtiannan/wxchat/blob/master/demo_imgs/wxnews.jpg" width = "250" width = "200"/>
