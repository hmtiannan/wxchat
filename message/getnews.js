const axios = require('axios')

const api = 'http://192.168.1.119:5000/news'

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
