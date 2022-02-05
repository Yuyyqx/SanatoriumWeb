<template>
  <div id="login">
    <img id="imgs" src="../../static/images/login.jpg" />
    <!-- <el-form class="content" ref="form" :model="form" label-width="80px">
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
    </el-form> -->
    <div class="content">
      <div class="left">
        <img id="logo" src="../../static/images/logo.png" />
        <label class="logofont">CareHome系统管理</label>
      </div>
      <div class="right">
        <el-input
          class="username"
          prefix-icon="el-icon-user"
          v-model="form.username"
          placeholder="请输入账号"
        ></el-input>
        <el-input
          class="username"
          prefix-icon="el-icon-lock"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
        <el-button class="submit" type="primary" @click="onSubmit"
          >登录</el-button
        >
        <div class="registerAll">
          <label class="register" @click="register">立即注册</label>
          <label class="register">|</label>
          <label class="register">找回密码</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      bgImg: {
        backgroundImage:
          "url(" + require("../../static/images/login.jpg") + ")",
        height: "100vh",
        width: "100vw",
        backgroundRepeat: "no-repeat",
      },
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //登录
    onSubmit() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/sanatoriumUser/loginSanatorium?email=" +
            this.form.username +
            "&pwd=" +
            this.form.password
        )
        .then((response) => {
          console.log(response.data)
          // if (response.data.code == 200) {
            this.$router.push({
              path: "/main",
              query: {
                username: this.form.username,
                password: this.form.password,
              },
            });
            sessionStorage.setItem("userName", this.form.username);
            sessionStorage.setItem("sanInfoId", response.data.data.sanInfoId);
            sessionStorage.setItem("sanId", response.data.data.sanId);
            // sessionStorage.setItem("userID", response.data.data[0].userid);
          // }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //注册
    register() {
      this.$router.push({ path: "/register" });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
}
#imgs {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: auto;
  z-index: -1;
  *zoom: 1;
}
.content {
  width: 45%;
  height: 450px;
  display: flex;
  flex-direction: column;
  margin: 120px auto;
  margin-left: 550px;
  .left {
    width: 50%;
    // background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    #logo {
      width: 120px;
      height: 120px;
      margin: 20px auto;
    }
    .logofont {
      font-size: 26px;
      color: rgb(86, 128, 116);
    }
  }
  .right {
    width: 50%;
    // background: rgb(250, 250, 252);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .username {
      width: 80%;
      height: 35px;
      border-radius: 30rpx;
      margin-bottom: 30rpx;
      margin: 15px auto;
    }
    .submit {
      width: 80%;
      height: 35px;
      border-radius: 30rpx;
      color: white;
      background: rgb(16, 169, 164);
      margin: 15px auto;
      border: 1px solid rgb(16, 169, 164);
    }
    .registerAll {
      display: flex;
      justify-content: space-around;
    }
    .register {
      font-size: 14px;
      color: rgb(63, 105, 93);
    }
  }
}
</style>