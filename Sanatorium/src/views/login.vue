<template>
  <div id="login">
    <el-form class="content" ref="form" :model="form" label-width="80px">
        <el-form-item>
            <label style="padding:30px 80px;font-size:24px">用户登录</label>
        </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
        console.log("username:"+this.form.username);
        console.log("password:"+this.form.password);
      //获取用户登录接口
      this.$ajax.get('http://localhost:63342/test/controller/check_user.php?username='+this.form.username+'&password='+this.form.password)
      .then((response)=>{
        console.log(JSON.stringify(response.data))
        if (response.data.resultCode==200) {
          this.$router.push({path:'/index',
          query: {
              username: this.form.username,
              password: this.form.password
          }});
          sessionStorage.setItem("userName",this.form.username)
          sessionStorage.setItem("userID",response.data.data[0].userid)
        }
      }).catch((res)=>{
        console.log(res)
      })
    },
  },
  created() {
    
  },
  mounted() {
    
  },
};
</script>

<style lang="less" scoped>
.content {
    width: 25%;
    margin: 250px auto;
}
</style>