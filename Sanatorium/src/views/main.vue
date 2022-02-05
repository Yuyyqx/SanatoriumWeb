<template>
  <div id="mains">
    <div class="left">
      <div class="exa">
        <img id="logo" src="../../static/images/logo_9.png" />
        <label class="logofont">CareHome</label>
      </div>
      <el-menu
        background-color="#435063"
        text-color="#fff"
        active-text-color="#63CDA5"
        :default-active="activeIndex"
        router
      >
        <NavMenu :navMenus="menuData"></NavMenu>
      </el-menu>
    </div>

    <div class="right">
      <!--顶部-->
      <div class="top">
        <!-- <img id="logo" src="../../static/images/logo.png"/> -->
        <img src="../../static/images/catalogue.png" />
        <div :class="nowUserName!=''?'userNameleft': 'topRight'">
          <img
            style="width: 26px; height: 26px; margin-top: 5px"
            src="../../static/images/a12.jpg"
          />
          <label
            style="
              margin-right: 40px;
              font-size: 10px;
              padding: 11px 5px 5px 5px;
            "
            >{{nowUserName}}</label
          >
          <img src="../../static/images/letter.png" />
          <img
            style="width: 16px; height: 17px; margin-top: 12px"
            src="../../static/images/exit.png"
          />
        </div>
      </div>

      <!--主要内容-->
      <div class="content">
        <div class="contentLeft">
          <div class="calendar">
            <el-calendar v-model="value"></el-calendar>
            <div class="activityTip">
              <label>活动提醒</label>
              <div class="activityName" v-for="(item, index) in activityList">
                {{ item.id }}、{{ item.name }}
              </div>
            </div>
          </div>

          <!--时间控件-->
          <div class="timeModel">
            <div class="time">快捷入口</div>
            <div>
              <button class="manage">管理老人</button>
              <button class="manage">管理护工</button>
              <button class="manage">管理房间</button>
              <button class="manage">健康状况</button>
              <button class="manage">信息处理</button>
            </div>
          </div>
        </div>
        <div class="contentRight">
          <div class="nurse">
            <div class="nurseTop">
              <label>护工完成度</label>
              <button
                style="
                  width: 10%;
                  background: #63cda5;
                  border: 1px solid #63cda5;
                  height: 25px;
                  margin: 15px;
                  text-align: center;
                  color: white;
                  font-size: 10px;
                "
                type="primary"
                size="mini"
              >
                去查看
              </button>
            </div>
            <div class="nursePic">
              <div class="pie" style="margin-top: 30px">
                <div id="pie1">
                  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
                  <div
                    id="main1"
                    style="float: left; width: 50%; height: 200px"
                  ></div>
                </div>
                <div id="pie2">
                  <div
                    id="main2"
                    style="float: left; width: 50%; height: 200px"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="news">
            <div class="userNews" style="margin-right: 30px">
              <label class="newsTitle">用户消息</label>
              <div class="newsName" v-for="(item, index) in activityList1">
                {{ item.id }}、{{ item.name }}
              </div>
            </div>
            <div class="userNews" style="margin-right: 30px">
              <label class="newsTitle">系统消息</label>
              <div class="newsName" v-for="(item, index) in activityList2">
                {{ item.id }}、{{ item.name }}
              </div>
            </div>
            <div class="userNews">
              <label class="newsTitle">审批消息</label>
              <div class="newsName" v-for="(item, index) in activityList3">
                {{ item.id }}、{{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "../components/NavMenu.vue";
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "mains",
  components: {
    NavMenu: NavMenu,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      value: new Date(),
      activeIndex: "aa",
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "aa",
            icon: "el-icon-setting",
            alias: "疗养管理",
          },
          //二级
          childs: [
            {
              entity: {
                id: 1,
                name: "manageOld",
                icon: "el-icon-s-tools\r\n",
                alias: "管理老人",
                value: "/manageOld",
              },
            },
            {
              entity: {
                id: 2,
                name: "manageNurse",
                icon: "el-icon-s-tools\r\n",
                alias: "管理护工",
                value: "",
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 3,
                    name: "nurseInfoManage",
                    icon: "el-icon-s-tools\r\n",
                    alias: "护工信息管理",
                    value: "manageNurse",
                  },
                },
                {
                  entity: {
                    id: 4,
                    name: "nurseRank",
                    icon: "el-icon-s-data\r\n",
                    alias: "排行榜管理",
                    value: "/content/pass",
                  },
                },
              ],
            },
            {
              entity: {
                id: 5,
                name: "manageRoom",
                icon: "el-icon-s-tools\r\n",
                alias: "管理房间",
                value: "",
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 6,
                    name: "roomInfoManage",
                    icon: "el-icon-s-tools\r\n",
                    alias: "房间信息管理",
                    value: "/content/email",
                  },
                },
                {
                  entity: {
                    id: 7,
                    name: "roomRest",
                    icon: "el-icon-s-tools\r\n",
                    alias: "空余情况管理",
                    value: "/manageRoomSpace",
                  },
                },
              ],
            },
            {
              entity: {
                id: 111,
                name: "manageAccount",
                icon: "el-icon-s-tools\r\n",
                alias: "管理账号",
                value: "/manageAccount",
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 8,
            name: "systemManage",
            icon: "el-icon-s-claim",
            alias: "每日任务",
          },
          //二级
          childs: [
            {
              entity: {
                id: 9,
                name: "dailyTask",
                icon: "el-icon-pie-chart",
                alias: "日常任务",
                value: { path: "/dailyTask" },
              },
            },
            {
              entity: {
                id: 91,
                name: "customTask",
                icon: "el-icon-pie-chart",
                alias: "自定义任务",
                value: { path: "/customTask" },
              },
            },
            {
              entity: {
                id: 92,
                name: "taskDraft",
                icon: "el-icon-pie-chart",
                alias: "任务草稿",
                value: { path: "/taskDraft" },
              },
            },
            {
              entity: {
                id: 10,
                name: "historyTask",
                icon: "el-icon-collection-tag",
                alias: "历史任务",
                value: "/historyTask",
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 11,
            name: "userManage",
            icon: "el-icon-s-marketing",
            alias: "健康状况",
          },
          //二级
          childs: [
            {
              entity: {
                id: 12,
                name: "accountManage",
                icon: "el-icon-pie-chart\r\n",
                alias: "整体健康状况",
                value: "/wholeHealth",
              },
            },
            {
              entity: {
                id: 13,
                name: "accountManage",
                icon: "el-icon-s-data\r\n",
                alias: "查看各项指标",
                value: "/checkIndicator",
              },
            },
            {
              entity: {
                id: 14,
                name: "accountManage",
                icon: "el-icon-dish\r\n",
                alias: "推荐膳食",
                value: "/recommendDiet",
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 15,
            name: "Manage",
            icon: "el-icon-bell",
            alias: "审批申请",
          },
          //二级
          childs: [
            {
              entity: {
                id: 16,
                name: "classifyManage2",
                icon: "el-icon-message-solid",
                alias: "家属",
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 17,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理访客信息",
                    value: '/familyVisitApprove'
                  },
                },
                {
                  entity: {
                    id: 18,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理注册信息",
                    value: '/familyRegisterApprove'
                  },
                },
                {
                  entity: {
                    id: 19,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理预约信息",
                    value: '/familyAppointmentApprove'
                  },
                },
                {
                  entity: {
                    id: 20,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理活动申请",
                    value: '/familyActivityApprove'
                  },
                },
              ],
            },
            {
              entity: {
                id: 21,
                name: "classifyManage2",
                icon: "el-icon-message-solid",
                alias: "护工",
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 22,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理请假信息",
                    value: "/nurseLeaveApprove"
                  },
                },
              ],
            },
            {
              entity: {
                id: 23,
                name: "classifyManage2",
                icon: "el-icon-message-solid",
                alias: "疗养院",
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 24,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "申请维护服务",
                  },
                },
                {
                  entity: {
                    id: 25,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "申请升级服务",
                  },
                },
              ],
            },
          ],
        },
        {
          //一级
          entity: {
            id: 26,
            name: "contentManage",
            icon: "el-icon-basketball",
            alias: "举办活动",
          },
        },
        {
          //一级
          entity: {
            id: 27,
            name: "contentManage",
            icon: "el-icon-message",
            alias: "信息处理",
          }, //二级
          childs: [
            {
              entity: {
                id: 28,
                name: "classifyManage2",
                icon: "el-icon-edit-outline",
                alias: "家属意见反馈",
              },
            },
            {
              entity: {
                id: 29,
                name: "classifyManage2",
                icon: "el-icon-phone-outline",
                alias: "异常情况通知",
                value: '/exceptionSan'
              },
            },
          ],
        },
      ],
      activityList: [
        {
          id: 1,
          name: "观看集体电影",
        },
        {
          id: 2,
          name: "盛装舞会",
        },
        {
          id: 3,
          name: "其他活动",
        },
      ],
      activityList2: [
        {
          id: 1,
          name: "系统更新",
        },
        {
          id: 2,
          name: "收到系统回复",
        }
      ],
      activityList3: [
        {
          id: 1,
          name: "有新的访客申请",
        },
        {
          id: 2,
          name: "有新的预约申请",
        },
        {
          id: 3,
          name: "有新的请假申请",
        },
      ],
      activityList1: [
        {
          id: 1,
          name: "新的改进信息",
        },
        {
          id: 2,
          name: "用户反馈",
        }
      ],
      opinionData1: [],
      opinionData2: [],
      date: new Date(),
      nowUserName: '' //当前登录用户
    };
  },
  methods: {
    //登录
    onSubmit() {
      console.log("username:" + this.form.username);
      console.log("password:" + this.form.password);
      //获取用户登录接口
      // this.$ajax
      //   .post(
      //     "https://www.tangyihan.top/web/sanatoriumUser/loginSanatorium?email=" +
      //       this.form.username +
      //       "&pwd=" +
      //       this.form.password
      //   )
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //     if (response.data.code == 200) {
      //       this.$router.push({
      //         path: "/main",
      //         query: {
      //           username: this.form.username,
      //           password: this.form.password,
      //         },
      //       });
      //       sessionStorage.setItem("userName", this.form.username);
      //       sessionStorage.setItem("userID", response.data.data[0].userid);
      //     }
      //   })
      //   .catch((res) => {
      //     console.log(res);
      //   });
    },
    //注册
    register() {
      this.$router.push({ path: "/register" });
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main1"));
      var myChart2 = echarts.init(document.getElementById("main2"));
      // 绘制图表1
      myChart.setOption({
        title: {
          text: "每日任务", //主标题
          textStyle: {
            fontSize: 16,
          },
          subtext: "", //副标题
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: ["已完成", "未完成"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "已完成" },
              { value: 1548, name: "未完成" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      // 绘制图表2
      myChart2.setOption({
        title: {
          text: "自定义任务", //主标题
          textStyle: {
            fontSize: 16,
          },
          subtext: "", //副标题
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: ["已完成", "未完成"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 835, name: "已完成" },
              { value: 1048, name: "未完成" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
  },
  created() {},
  mounted() {
    this.initData();

    //显示当前日期时间
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);

    this.nowUserName = sessionStorage.getItem("userName");
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style lang="less" scoped>
#mains {
  display: flex;
  // justify-content: center;
  // align-content: center;
  width: 100%;
  height: 100%;
  background: rgb(236, 241, 247);
}

.left {
  width: 15%;
  height: 750px;
  background: #435063;
  text-align: left;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-content: center;
  .exa {
    margin: 15px;
    margin-left: 20px;
    display: flex;
    #logo {
      width: 51px;
      height: 45px;
      // margin: 20px auto;
      // border-radius: 100%;
      // background: white;
    }
    .logofont {
      font-size: 22px;
      color: white;
      margin-top: 15px;
      margin-left: 10px;
    }
  }
}

.right {
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-content: center;
  .top {
    width: 100%;
    height: 4%;
    display: flex;
    // flex-direction: row;
    // justify-content: space-around;
    // align-content: center;
    background: white;
    img {
      width: 20px;
      height: 20px;
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .topRight {
      display: flex;
      margin-left: 1020px;
      img {
        width: 20px;
        height: 20px;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    .userNameleft {
      margin-left: 940px;
      display: flex;
      img {
        width: 20px;
        height: 20px;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
  .content {
    width: 100%;
    height: 96%;
    font-size: 15px;
    font-family: PingFang SC;
    display: flex;
    .contentLeft {
      width: 50%;
      height: 600px;
      .calendar {
        width: 95%;
        height: 85%;
        background: white;
        margin: 30px auto;
        border-radius: 10px;
        box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
        padding-top: 3px;
        display: flex;
        .activityTip {
          width: 170px;
          height: 400px;
          border-radius: 10px;
          box-shadow: 0 0 2px 1px rgba(13, 188, 121, 0.33);
          display: flex;
          flex-direction: column;
          margin-top: 30px;
          margin-left: 20px;
          padding: 10px;
          label {
            margin-top: 10px;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 20px;
          }
          .activityName {
            width: 100%;
            height: 30px;
            flex-wrap: wrap;
            font-size: 14px;
            text-align: left;
          }
        }
      }
      .timeModel {
        width: 95%;
        height: 110px;
        background: white;
        margin: 25px auto;
        border-radius: 10px;
        box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
        padding-top: 1px;
        .time {
          font-weight: 700;
          font-size: 16px;
          text-align: left;
          margin: 15px;
        }
        .manage {
          width: 90px;
          background: #63cda5;
          border: 1px solid #63cda5;
          height: 35px;
          margin-right: 20px;
          text-align: center;
          color: white;
          font-size: 14px;
        }
      }
    }
    .contentRight {
      width: 50%;
      .nurse {
        width: 95%;
        height: 350px;
        background: white;
        margin: 30px auto;
        border-radius: 10px;
        box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
        padding-top: 3px;
        .nurseTop {
          display: flex;
          label {
            margin-top: 15px;
            font-weight: 600;
            font-size: 20px;
            margin-bottom: 20px;
            margin-left: 20px;
          }
        }
        .nursePic {
          width: 100%;
        }
      }
      .news {
        width: 95%;
        height: 300px;
        margin: 20px auto;
        display: flex;
        .userNews {
          width: 190px;
          height: 270px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
          padding-top: 3px;
          display: flex;
          flex-direction: column;
          padding-left: 10px;
          padding-right: 10px;
          .newsTitle {
            margin-top: 10px;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 20px;
          }
          .newsName {
            width: 100%;
            height: 30px;
            flex-wrap: wrap;
            font-size: 14px;
            text-align: left;
          }
        }
      }
    }
  }
}

</style>