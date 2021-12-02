<template>
  <div id="highProfit">
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
        <div class="nowPage">
          <img src="../../static/images/nowPage.png" />
          <label style="color: #888888"
            >数据分析 / <label style="color: #63cda5">盈利分析</label></label
          >
        </div>

        <div class="manage">
          <div class="buttonList">
            <!--选择精度-->
            <el-select v-model="accuracyValue" placeholder="选择精度">
              <el-option
                v-for="item in accuracyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <!--选择时间范围-->
            <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              style="margin-left: 20px"
            >
            </el-date-picker>
            <el-button
              style="
                width: 5%;
                background: #63cda5;
                border: 1px solid #63cda5;
                margin-left: 20px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >筛选</el-button
            >
          </div>
        </div>

        <!--图表-->
        <div class="graphList">
            <div class="graphListTop">
                <div class="graphTopLeft">
                    <!--用户使用系统流量统计图-->
                    <div id="pie1">
                  <div
                    id="main1"
                    style="width: 100%; height: 242.5px"
                  ></div>
                </div>
                </div>
                <div class="graphTopRight">
                    <!--购买收费服务人数统计图-->
                    <div id="pie2">
                  <div
                    id="main2"
                    style="float: left; width: 100%; height: 242.5px"
                  ></div>
                </div>
                </div>
            </div>
            <div class="graphListBottom">
                <div class="graphBottomLeft">
                    <!--系统定制升级服务统计图-->
                    <div id="pie3">
                  <div
                    id="main3"
                    style="float: left; width: 100%; height: 242.5px"
                  ></div>
                </div>
                </div>
                <div class="graphBottomRight">
                    <!--用户定制收费服务统计图-->
                    <div id="pie4">
                  <div
                    id="main4"
                    style="float: left; width: 100%; height: 242.5px"
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
  name: "highProfit",
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
            },
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
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 17,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理访客信息",
                  },
                },
                {
                  entity: {
                    id: 18,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理注册信息",
                  },
                },
              ],
            },
          ],
        },
      ],
      accuracyOptions: [
        {
          value: "选项1",
          label: "年",
        },
        {
          value: "选项2",
          label: "月",
        },
        {
          value: "选项3",
          label: "周",
        },
        {
          value: "选项4",
          label: "日",
        },
      ],
      accuracyValue: "",
      value1: ''
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
      var myChart4 = echarts.init(document.getElementById("main4"));
      // 绘制图表1
      myChart.setOption({
        title: {
          text: "用户使用系统流量统计图", //主标题
          padding: [10,0,0,0],
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
          data: ["用户流量统计"],
          right: "right",
          padding: [15,10,0,0],
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2021-07","2021-08","2021-09","2021-10","2021-11"],
        },
        yAxis: {
          name: "人数/%",
          type: "value",
          min: 0, // 设置y轴刻度的最小值
          max: 100, // 设置y轴刻度的最大值
          splitNumber: 6, // 设置y轴刻度间隔个数
        },
        series: [
          {
            name: "用户流量统计",
            type: "line",
            stack: "总量",
            data: [ 70, 60, 75, 50, 80],
          },
        ],
      });
      //绘制图表2
      myChart2.setOption({
        title: {
          text: "购买收费服务人数统计图", //主标题
          padding: [10,0,0,0],
          textStyle: {
            fontSize: 16,
          },
          subtext: "", //副标题
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let arr = params[2].value.split(",");
            for (let i in arr) {
              str += arr[i] + "<br/>";
            }
            return str;
          },
        },
        grid: {
          left: "3%",
          right: "15%",
          bottom: "14%", // 调整 legend 和图表的间距
          containLabel: true,
        },
        legend: {
          //图例
          textStyle: {
            color: "#000",
          },
        //   x: "right", // 可设定图例在左、右、居中
        //   y: "top",
          right: "right",
          padding: [15,10,0,0],
          data: ['用户', '系统'], // 菜单数据
          selectedMode: false, //图例不可点击
        },
        xAxis: {
          name: "时间",
          type: "category",
          data: ["2021-07","2021-08","2021-09","2021-10","2021-11"],
        },
        yAxis: {
          name: "人数",
          type: "value",
          min: 0, // 设置y轴刻度的最小值
          max: 1800, // 设置y轴刻度的最大值
          splitNumber: 6, // 设置y轴刻度间隔个数
        },
        series: [
          {
            name: '用户',
            data: [200,450,300,260,470],
            type: "bar",
          },{
            name: '系统',
            data: [600,400,350,450,650],
            type: "bar",
          },
        ],
      });
      //绘制图表3
      myChart3.setOption({
        title: {
          text: "系统定制升级服务统计图", //主标题
          padding: [10,0,0,0],
          textStyle: {
            fontSize: 16,
          },
          subtext: "", //副标题
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let arr = params[2].value.split(",");
            for (let i in arr) {
              str += arr[i] + "<br/>";
            }
            return str;
          },
        },
        grid: {
          left: "3%",
          right: "15%",
          bottom: "14%", // 调整 legend 和图表的间距
          containLabel: true,
        },
        legend: {
          //图例
          textStyle: {
            color: "#000",
          },
          x: "right", // 可设定图例在左、右、居中
          y: "bottom",
          //   data: ['测试1', '测试2'], // 菜单数据
          selectedMode: false, //图例不可点击
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
          max: 24, // 设置y轴刻度的最大值
          splitNumber: 6, // 设置y轴刻度间隔个数
        },
        series: [
          {
            data: [19, 15.6, 14.3,16.1,22.8],
            type: "bar",
          },
        ],
      });
      //绘制图表4
      myChart4.setOption({
        title: {
          text: "用户定制收费服务统计图", //主标题
          padding: [10,0,0,0],
          textStyle: {
            fontSize: 16,
          },
          subtext: "", //副标题
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let arr = params[2].value.split(",");
            for (let i in arr) {
              str += arr[i] + "<br/>";
            }
            return str;
          },
        },
        grid: {
          left: "3%",
          right: "15%",
          bottom: "14%", // 调整 legend 和图表的间距
          containLabel: true,
        },
        legend: {
          //图例
          textStyle: {
            color: "#000",
          },
          x: "right", // 可设定图例在左、右、居中
          y: "bottom",
          //   data: ['测试1', '测试2'], // 菜单数据
          selectedMode: false, //图例不可点击
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
          max: 18, // 设置y轴刻度的最大值
          splitNumber: 6, // 设置y轴刻度间隔个数
        },
        series: [
          {
            data: [2.5, 7.2, 3.2,2.7,7.9],
            type: "bar",
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

<style lang="less">
#highProfit {
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
    .nowPage {
      display: flex;
      margin-top: 20px;
      margin-left: 30px;
      img {
        width: 20px;
        height: 20px;
      }
    }

    .manage {
      width: 95%;
      height: 70px;
      background: white;
      margin: 25px auto;
      // border-radius: 10px;
      // box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
      padding-top: 1px;
      .buttonList {
        margin-top: 15px;
        margin-left: -450px;
      }
    }

    .graphList {
      width: 95%;
      height: 510px;
      margin: 0px auto;
      display: flex;
      flex-direction: column;
      .graphListTop {
          width: 100%;
          height: 48%;
          display: flex;
          .graphTopLeft {
              width: 49%;
              height: 100%;
              background: white;
          }
          .graphTopRight {
              margin-left: 30px;
              width: 49%;
              height: 100%;
              background: white;
          }
      }
      .graphListBottom {
          width: 100%;
          height: 48%;
          display: flex;
          margin-top: 25px;
          .graphBottomLeft {
              width: 49%;
              height: 100%;
              background: white;
          }
          .graphBottomRight {
              margin-left: 30px;
              width: 49%;
              height: 100%;
              background: white;
          }
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
    background: rgb(36, 114, 200);
  }
}
</style>