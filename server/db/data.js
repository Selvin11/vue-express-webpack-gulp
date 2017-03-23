// 这是从豆瓣的接口获取几条数据填充，就不用手动录入起始数据了 
// node db/data.js 即可向数据库中添加五条数据了
const axios = require('axios');
const config = require('./dbconfig');


const mongoose = require('mongoose');
const db = mongoose.connect(config.mongodb);
// 数据库连接
db.connection.on("error", function(error) {
  console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
  console.log("------数据库连接成功！------");
});
// Schema生成ModelModel，
// 创造Entity，Model和Entity都可对数据库操作造成影响，
// 但Model比Entity更具操作性。
// schema定义collections解构（类似mysql表结构）
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  original_title: String,
  rating: Number,
  genres: Array,
  casts: Array,
  directors: Array,
  year: Number,
  id: String,
  poster: String,
  poster_lg: String
});

// 通过原型创建model即为mongo中的collection(mysql中的表table)
const Movie = mongoose.model("Movie", movieSchema)

// https://bird.ioliu.cn/v1 远程代理，出现问题可以关闭
const jsonBird = "https://bird.ioliu.cn/v1?url="
const doubanMovie = "http://api.douban.com/v2/movie/in_theaters?count="

function fetchData(count) {
  // const url = `${jsonBird}${doubanMovie}${count}`
  const url = `${doubanMovie}${count}`
  axios.get(url)
    .then(res => {
      const subjects = res.data.subjects
      subjects.map(subject => {
        let movie = {
            title: subject.title,
            original_title: subject.original_title,
            rating: subject.rating.average,
            genres: subject.genres,
            casts: subject.casts,
            directors: subject.directors,
            year: subject.year,
            id: subject.id,
            poster: subject.images.small,
            poster_lg: subject.images.large
          }
          // 这里采用的是model的create方法保存数据
        Movie.create(movie, (err, movie) => {
          if (err) {
            console.log(err)
          }
          console.log(movie.title, '--------')
        })
      })
    })
    .catch((err) => {
      throw err
    })
}

fetchData(5)