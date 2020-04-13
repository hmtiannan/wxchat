const axios = require('axios')

const api = 'http://172.19.237.198:5000/news'

function getTodayNews () {
  return axios.get(api).then(({ data }) => {
    // console.log(data)
    return data.data
  })
}

exports.todayNews = async () => {
  const q = await getTodayNews()
  return q
}
