<template>
  <div id="highManageMain">
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
        <div class="topRight">
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
            >用户名</label
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
              <div class="titleTip">
                  <div class="titleLine"></div>
                  <div style="padding-left:10px;">通知信息管理</div>
              </div>
              <div style="display:flex;">
                  <el-calendar v-model="value"></el-calendar>
            <div class="activityTip">
              <label>公告信息</label>
              <div class="activityName" v-for="(item, index) in activityList">
                {{ item.id }}、{{ item.name }}
              </div>
            </div>
              </div>
            
          </div>

          <!--时间控件-->
          <div class="timeModel">
            <div class="titleTip">
                  <div class="titleLine"></div>
                  <div style="padding-left:10px;">快捷入口</div>
              </div>
            <div style="margin-top:15px;">
              <button class="manage">管理用户</button>
              <button class="manage">管理疗养院</button>
              <button class="manage">管理订单</button>
              <button class="manage">管理通知</button>
              <button class="manage">意见反馈</button>
            </div>
          </div>
        </div>
        <div class="contentRight">
          <div class="nurse">
            <div class="nurseTop">
              <div class="titleTip">
                  <div class="titleLine"></div>
                  <div style="padding-left:10px;">盈利分析</div>
              </div>
              <button
                style="
                  width: 10%;
                  background: rgb(36,114,200);
                  border: 1px solid rgb(36,114,200);
                  height: 25px;
                  margin-top: 10px;
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
                    style="float: left; width: 100%; height: 200px"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="news">
              <div class="nurseTop">
              <div class="titleTip">
                  <div class="titleLine"></div>
                  <div style="padding-left:10px;">摄像头设备信息管理</div>
              </div>
              </div>
              <div class="pie" style="margin-top: 30px">
            <div id="pie1">
                  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
                  <div
                    id="main2"
                    style="float: left; width: 50%; height: 200px"
                  ></div>
                </div>
                <div id="pie2">
                  <div
                    id="main3"
                    style="float: left; width: 50%; height: 200px"
                  ></div>
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
  name: "highManageMain",
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
      activeIndex: "highbasic",
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "highbasic",
            icon: "el-icon-setting",
            alias: "基础信息管理",
          },
          //二级
          childs: [
            {
              entity: {
                id: 1,
                name: "highManageUser",
                icon: "el-icon-s-tools\r\n",
                alias: "管理用户",
                value: "/highManageUser",
              },
            },
            {
              entity: {
                id: 2,
                name: "highManageSanatorium",
                icon: "el-icon-s-tools\r\n",
                alias: "管理疗养院",
                value: "",
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 3,
                    name: "highSanatoriumInfo",
                    icon: "el-icon-s-tools\r\n",
                    alias: "疗养院信息",
                    value: "",
                  },
                },
                {
                  entity: {
                    id: 4,
                    name: "highSanatoriumManager",
                    icon: "el-icon-s-data\r\n",
                    alias: "管理疗养院管理员",
                    value: "",
                  },
                },
              ],
            },
            {
              entity: {
                id: 5,
                name: "highManageOrder",
                icon: "el-icon-s-tools\r\n",
                alias: "管理订单",
                value: "",
              },
            },
            {
              entity: {
                id: 51,
                name: "highManageInform",
                icon: "el-icon-s-tools\r\n",
                alias: "管理通知",
                value: "",
              },
            },
            {
              entity: {
                id: 111,
                name: "highManageAdvise",
                icon: "el-icon-s-tools\r\n",
                alias: "管理意见反馈",
                value: "",
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 8,
            name: "highManageCore",
            icon: "el-icon-s-claim",
            alias: "核心信息管理",
          },
          //二级
          childs: [
            {
              entity: {
                id: 9,
                name: "highCoreCamera",
                icon: "el-icon-pie-chart",
                alias: "摄像头设备信息",
                value: { path: "/highCameraDevice" },
              },
            },
            {
              entity: {
                id: 9,
                name: "highCoreCamera",
                icon: "el-icon-pie-chart",
                alias: "摄像头警报信息",
                value: { path: "/highCameraAlert" },
              },
            },
            {
              entity: {
                id: 91,
                name: "highManagerInfo",
                icon: "el-icon-pie-chart",
                alias: "后台管理员信息",
                value: { path: "/" },
              },
            },
          ],
        },
        {
          //一级
          entity: {
            id: 11,
            name: "highDataAnalysis",
            icon: "el-icon-s-marketing",
            alias: "数据分析",
          },
          //二级
          childs: [
            {
              entity: {
                id: 12,
                name: "highDASanatorium",
                icon: "el-icon-pie-chart\r\n",
                alias: "疗养院综合风险评估",
                value: "",
              },
            },
            {
              entity: {
                id: 13,
                name: "highDAProfit",
                icon: "el-icon-s-data\r\n",
                alias: "盈利分析",
                value: "/highProfit",
              },
            }
          ],
        },
        {
          //一级
          entity: {
            id: 15,
            name: "highPublic",
            icon: "el-icon-bell",
            alias: "公共模块",
          },
          //二级
          childs: [
            {
              entity: {
                id: 16,
                name: "highPublicLog",
                icon: "el-icon-message-solid",
                alias: "敏感操作日志记录",
                value: '/highSensitiveOperation'
              }
            },
          ],
        },
      ],
      activityList: [
        {
          id: 1,
          name: "系统改进相关内容",
        },
        {
          id: 2,
          name: "用户反馈",
        },
        {
          id: 3,
          name: "疗养院升级规定",
        },
      ],
      opinionData1: [],
      opinionData2: [],
      date: new Date(),
    };
  },
  methods: {
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
      var myChart3 = echarts.init(document.getElementById("main3"));
      // 绘制图表1
        myChart.setOption({
        title: {
          text: "近七日收益", //主标题
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
        data:['近几月收益'],
        right: "right",
        padding: [15,10,0,0]
    },
    grid: {
        left: '3%',
        right: '9%',
        bottom: '12%',
        containLabel: true
    },
    xAxis: {
        name: "时间",
        type: "category",
        data: ["2021-07","2021-08","2021-09","2021-10","2021-11"],
    },
    yAxis: {
        name: "收入/万",
        type: "value",
        min: 0, // 设置y轴刻度的最小值
        max: 42, // 设置y轴刻度的最大值
        splitNumber: 6, // 设置y轴刻度间隔个数
    },
    series: [
       
        {
            name:'近几月收益',
            type:'line',
            stack: '总量',
            data:[21.5,22.8,17.5,18.9,30.9]
        }
    ]
      });
      //绘制图表2
      myChart2.setOption({
        title: {
          text: "设备概况", //主标题
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
        // color: [],
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: ["在线", "离线"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "60%"],
            data: [
              { value: 1, name: "在线" },
              { value: 9, name: "离线" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            bottom: 30
          },
        ],
      });
       //绘制图表3
      myChart3.setOption({
        title: {
          text: "今日警报", //主标题
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
          data: ["已处理", "未处理"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "60%"],
            data: [
              { value: 5, name: "已处理" },
              { value: 5, name: "未处理" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            bottom: 30
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
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style lang="less" scoped>
#highManageMain {
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
        // border-radius: 10px;
        // box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
        padding-top: 3px;
        .activityTip {
          width: 170px;
          height: 400px;
          border-radius: 10px;
          box-shadow: 0 0 2px 1px rgba(3, 24, 16, 0.33);
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
        // border-radius: 10px;
        // box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
        padding-top: 1px;
        .time {
          font-weight: 700;
          font-size: 16px;
          text-align: left;
          margin: 15px;
        }
        .manage {
          width: 90px;
          background: rgb(36,114,200);
          border: 1px solid rgb(36,114,200);
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
        height: 300px;
        background: white;
        margin: 30px auto;
        // border-radius: 10px;
        // box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
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
        height: 320px;
        background: white;
        margin: 30px auto;
        // border-radius: 10px;
        // box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
        padding-top: 3px;
        
      }
    }
  }
}

.titleTip {
    display: flex;
    font-weight: 600;
    font-size: 17px;
    padding: 10px 20px;
    .titleLine {
        width: 7px;
        height: 20px;
        background: rgb(36,114,200);
    }
}
</style>