<template>
  <div id="register">
    <img id="imgs" src="../../static/images/login.jpg" />
    <div class="top">
      <img id="logo" src="../../static/images/logo.png" />
      <label class="logofont">CareHome</label>
    </div>
    <div class="content">
      <!--左侧-->
      <div class="left">
        <label class="labels"
          >疗养院名称:
          <el-input
            class="username"
            v-model="form.name"
            placeholder="请输入"
          ></el-input
        ></label>
        <label class="labels"
          >成立日期:&nbsp;&nbsp;
          <el-input
            class="username"
            v-model="form.date"
            placeholder="如：2022-01-01"
          ></el-input
        ></label>
        <label class="labels" @click="showMap"
          >总部地址:&nbsp;&nbsp;
          <el-input
            class="username"
            v-model="form.address"
            placeholder="请输入"
            suffix-icon="el-icon-location-outline"
          ></el-input
        ></label>
        <label class="labels" @click="showMap"
          >总负责人:&nbsp;&nbsp;
          <el-input
            class="username"
            v-model="form.person"
            placeholder="请输入"
          ></el-input
        ></label>
        <label class="labels"
          >联系方式:&nbsp;&nbsp;
          <el-input
            class="username"
            v-model="form.phone"
            placeholder="请输入"
          ></el-input
        ></label>
      </div>
      <!--右侧-->
      <div class="right">
        <label class="labels"
          >邮箱:
          <el-input
            class="username"
            v-model="form.email"
            placeholder="请输入"
          ></el-input
        ></label>
        <label class="labels"
          >密码:
          <el-input
            class="username"
            type="password"
            v-model="form.password"
            placeholder="请输入"
          ></el-input
        ></label>
        <label class="labels" style="margin-left: -220px">营业资格编号: </label>
        <!--图片上传-->
        <div class="content1">
          <div class="imgBox">
            <el-upload
              ref="upload"
              :action="uploadImg"
              list-type="picture-card"
              :show-file-list="true"
              multiple
              :before-upload="beforeAvatarUpload"
              :http-request="uploadImage"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
    <el-button class="submit" type="primary" @click="onSubmit"
      >立即注册</el-button
    >
    <lacation v-if="locationFlag" @send-address="sendAddress"></lacation>
  </div>
</template>
<script>
import Lacation from "../components/Lacation.vue";
export default {
  components: { Lacation },
  name: "register",
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
        phone: "",
        name: "",
        date: "",
        address: "",
        person: "",
        email: "",
        number: "",
      },

      formData: new FormData(),
      imgs: {},
      imgLen: 0,
      txtVal: 0,
      desc: "",
      locationFlag: false,
      dialogImageUrl: "",
      dialogVisible: false,
      uploadImg:"https://www.tangyihan.top/web/sanatoriumUser/uploadImg",
      myHeaders:{'Access-Control-Allow-Origin':'*'},
      businessPicture: ''
    };
  },
  methods: {
    //注册
    onSubmit() {
      //获取用户注册接口
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/sanatoriumUser/identifiedSanatorium?director=" +
            this.form.name +
            "&email=" +
            this.form.email +
            "&establishTime=" +
            this.form.date +
            "&location=" +
            this.form.address +
            "&phone=" +
            this.form.phone +
            "&pwd=" +
            this.form.password +
            "&sanName=" +
            this.form.person +
            "&businessPicture=" +
            this.businessPicture
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 0) {
            alert("注册成功！");
            this.$router.push({
              path: "/login"
              // query: {
              //   username: this.form.username,
              //   password: this.form.password,
              // },
            });
            // sessionStorage.setItem("userName", this.form.username);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },

    descInput() {
      // this.txtVal = this.desc.length;
    },
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      // console.log(inputDOM.files)
      let oldLen = this.imgLen;
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 5 * 1024 * 1024) {
          alert("请选择5M以内的图片！");
          return false;
        }
        this.imgLen++;
        this.$set(
          this.imgs,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
        // console.log(this.imgs)
      }
      console.log("this.fil", this.fil);
      // this.imgs = this.fil
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    delImg(key) {
      this.$delete(this.imgs, key);
      this.imgLen--;
    },
    // 提交上传图片
    submit() {
      for (let key in this.imgs) {
        let name = key.split("?")[0];
        this.formData.append("file", this.imgs[key]);
      }
      this.formData.getAll("file");
      console.log("this.formData", this.formData);
      this.$refund.upload(this.formData);
      console.log(this.formData);
    },
    //是否显示地图
    showMap() {
      this.locationFlag = !this.locationFlag;
      console.log(this.locationFlag);
    },
    sendAddress(data) {
      console.log(data);
      this.form.address = data;
    },

    // 上传图片方法
    uploadImage(param){
      const formData = new FormData()
      formData.append('img', param.file)
      this.$ajax
      .post("https://www.tangyihan.top/web/sanatoriumUser/uploadImg", formData).then(response => {
        console.log('上传图片成功')
        // this.form.picUrl = process.env.VUE_APP_BASE_API + response.imgUrl
        this.businessPicture = response.data.data
      }).catch(response => {
        console.log('图片上传失败')
      })
    },
    // 资质照片上传前校验
    beforeAvatarUpload(file) {
      const isPic = file.type.indexOf('image') >= 0;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPic) {
        this.$message.error('资质照片只能为图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isPic && isLt2M;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // let newfile = new FormData();
      // newfile.append("img",file.raw);
      // console.log(newfile.get("img"));
      // let config = {
      //   headers: {"Content-Type":"application/octet-stream;charset=utf-8"}
      // };
      // const instance = $ajax.create({
      //   withCredentials: true
      // });
      // instance.post("https://www.tangyihan.top/web/sanatoriumUser/uploadImg",newfile,config)
      // .then(response=> {
      //   alert("000");
      // })
      // console.log(file);
    },

  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
#register {
  display: flex;
  flex-direction: column;
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
.top {
  width: 100%;
  height: 20%;
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
.content {
  width: 80%;
  height: 80%;
  display: flex;
  margin-top: 35px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  border: 1px solid rgb(2, 185, 78);
  margin: 15px auto;
  padding-top: 30px;
  padding-bottom: 30px;
  .left {
    width: 50%;
    // background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .labels {
      width: 100%;
      margin: 15px auto;
    }
    .username {
      width: 50%;
    }
  }
  .right {
    width: 50%;
    // background: rgb(250, 250, 252);
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .labels {
      width: 100%;
      margin-bottom: 30px;
      margin-left: -100px;
    }
    .username {
      width: 50%;
    }
    .registerAll {
      display: flex;
      justify-content: space-around;
    }
    .register {
      font-size: 14px;
      color: rgb(63, 105, 93);
    }

    // 外部盒子样式
    .imgBox {
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  // 外部盒子样式
  .content1 {
    width: 50%;
    margin-left: 35px;
    .imgBox {
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  // 预览图片样式
  .uploadBox {
    position: relative;
    width: 80px;
    height: 80px;
    text-align: left;
    margin-right: 5px;
    margin-bottom: 5px;
    // 预览样式
    .uploadImg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
    }
    // 删除按钮
    .closeImg {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 2%;
      right: 1%;
    }
  }
  // 上图图片icon
  .inputButton {
    position: relative;
    display: block;
    width: 80px;
    height: 80px;
    // 上传图片样式
    .addImg {
      display: block;
      width: 80px;
      height: 80px;
    }
    // input样式
    .upload {
      width: 80px;
      height: 80px;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }
  }
  // 提交按钮
  .submitTask {
    margin: auto;
    background: #ef504d;
    width: 30%;
    height: 0.3rem;
    color: #fff;
    font-size: 0.16rem;
    line-height: 0.3rem;
    text-align: center;
    border-radius: 0.1rem;
    margin-top: 0.8rem;
  }
}
.submit {
  width: 40%;
  height: 35px;
  border-radius: 30rpx;
  color: white;
  background: rgb(16, 169, 164);
  margin: 30px auto;
  border: 1px solid rgb(16, 169, 164);
}
</style>