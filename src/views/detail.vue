<template>
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/"><i class="el-icon-arrow-left"></i>电影详情</router-link>
      </el-menu-item>
    </el-menu>
    <el-card>
      <el-row align="middle">
          <el-col :span="10">
              <img :src="movie.poster_lg" class="image">
          </el-col>
          <el-col :span="14" :style="{textAlign:'left'}">
            <p>{{movie.title}} —— {{movie.original_title}}</p>
            <div>
              <p>导演: </p>
              <el-row>
                <el-col :span="6" v-for="(item,index) in movie.directors" key="index" justify="center" align="middle">
                    <p><span>{{item.name}}</span></p>
                    <img :src="item.avatars.small" alt="">
                </el-col>
              </el-row>
            </div>
            <div>
              <p>主演: </p>
              <el-row>
                <el-col :span="6" v-for="(item,index) in movie.casts" key="index" justify="center" align="middle">
                    <img :src="item.avatars.small" alt="">
                    <p><span>{{item.name}}</span></p>
                </el-col>
              </el-row>
            </div>
          </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        movie:{}
      }
    },
    created(){
      let movieId = this.$route.params.movieId;
      this.$http.get(`/api/movie/${movieId}`)
          .then(res => {
              // console.dir(res.data)
              this.movie = res.data
          })
          .catch(err => {
              this.$message.error(`${err.message}`, 'ERROR!')
              console.log(err)
          })

    }
  }
</script>