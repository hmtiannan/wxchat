const CronJob = require('cron').CronJob
// const interview = require('../message/interview')
const getnews = require('../message/getnews')

module.exports = async bot => {
    const job = new CronJob('00 00 08 * * *', async () => {
    const rooms = await bot.Room.findAll({ topic: /群聊名称1|mytest/ })
    const q = await getnews.todayNews()
    for (const room of rooms) {
      await room.say(q)
    }
  }, null, true, 'Asia/Shanghai');
  job.start();
    // const job2 = new CronJob('*/30 * * * * *', async () => {
    // const rooms = await bot.Room.findAll({ topic: /mytest/ })
    // for (const room of rooms) {
    //   await room.say('')
    // }
  // }, null, true, 'Asia/Shanghai');
  // job2.start();
}
