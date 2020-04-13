const { Wechaty, Message } = require('wechaty')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const Qrterminal = require('qrcode-terminal')

const config = require("./config")

// const message = require('./event/message')
// const friendShip = require('./event/friend-ship')
// const roomJoin = require('./event/room-join')

const schedule = require('./schedule/index')


const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: config.token
  }),
  name: 'daxiange'
})

function handleScan (qrcode) {
  Qrterminal.generate(qrcode, { small: true })
}

bot
  .on("scan", handleScan)
  // .on("login", user => console.log(user))
  // .on("room-join", roomJoin.handleRoomJoin)
  // .on("friendship", friendShip.handleFriendShip)
  // .on("message", message.handleMessage)
  // 获取退出原因
  .on("logout", reason => {console.log(`reason: ${reason}`)})
  .start()

// 需要保证 bot start 之后调用
// 然而 bot.start().then() 无法触达，只好使用这种笨办法
setTimeout(() => {
  schedule(bot)
}, 3000)
