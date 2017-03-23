//新建一个models目录放数据模型,mongoose的每个数据model需要一个schema生成,

//新建movie.js文件或者其他的数据模型,用来提供基础数据.

// 这里的mongo模型是为应用提供的

const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    poster: String,
    rating: String,
    genres: Array,
    introduction: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

const Movie = module.exports = mongoose.model('Movie', movieSchema)