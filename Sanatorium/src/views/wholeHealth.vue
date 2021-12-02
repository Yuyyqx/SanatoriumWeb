<template>
  <div id="wholeHealth">
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
            >健康状况 /
            <label style="color: #63cda5">整体健康状况</label></label
          >
        </div>

        <div class="manage">
          <div class="buttonList">
            <el-button style="margin-right: 15px">全 部</el-button>
            <el-button style="margin-right: 15px">单人间</el-button>
            <el-button style="margin-right: 15px">三人间</el-button>
            <el-button>五人间</el-button>
          </div>
          <!-- <div class="typeChoose">
            <div class="search">
              <el-input
                prefix-icon="el-icon-search"
                placeholder="请输入内容"
                class="s-input"
                v-model="search"
                type="text"
              >
                <el-select
                  v-model="select"
                  slot="prepend"
                  placeholder="入住类型"
                >
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="大体健康" value="1"></el-option>
                  <el-option label="恢复健康" value="2"></el-option>
                  <el-option label="基本自理" value="3"></el-option>
                  <el-option label="丧失自理" value="4"></el-option>
                </el-select>
                <el-button slot="append" @click="searchByKey">搜索</el-button>
              </el-input>
            </div>
            <el-button
              style="
                width: 7%;
                background: #63cda5;
                border: 1px solid #63cda5;
                margin-left: 120px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >设置房间</el-button
            >
            <el-button
              @click="checkIn"
              style="
                width: 7%;
                background: #63cda5;
                border: 1px solid #63cda5;
                margin-left: 30px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >登记入住</el-button
            >
          </div> -->
        </div>

        <div class="maincontent">
          <!--图表-->
          <div class="maincontentLeft">
            <div class="maincontentLeftTop">
              <!--饮食满意度-->
              <div id="pie1">
                <div
                  id="main1"
                  style="float: left; width: 50%; height: 200px"
                ></div>
              </div>
              <!--娱乐满意度-->
              <div id="pie2">
                <div
                  id="main2"
                  style="float: left; width: 50%; height: 200px"
                ></div>
              </div>
            </div>
            <div class="maincontentLeftBottom">
              <!--人数-睡眠时间-->
              <div id="pie3">
                <div
                  id="main3"
                  style="float: left; width: 50%; height: 200px"
                ></div>
              </div>
              <!--老人健康情况-->
              <div id="pie4">
                <div
                  id="main4"
                  style="float: left; width: 50%; height: 200px"
                ></div>
              </div>
            </div>
          </div>

          <!--系统推送-->
          <div class="maincontentRight">
            <div class="titleTip">
              <div class="titleLine"></div>
              <div style="padding-left: 10px">系统推送</div>
            </div>
            <div class="activityName" v-for="(item, index) in activityList">
              <i>{{ item.id }}、{{ item.name }}</i>
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
  name: "wholeHealth",
  components: {
    NavMenu: NavMenu,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
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
              },
            },
          ],
        },
      ],
      type: "",
      activityList: [
        {
          id: 1,
          name: "饮食满意度下降",
        },
        {
          id: 2,
          name: "睡眠时间过多",
        },
        {
          id: 3,
          name: "....",
        },
      ],
    };
  },
  methods: {
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
          text: "饮食满意度", //主标题
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
          data: ["饮食满意度"],
          bottom: "bottom",
        },
        grid: {
          left: "5%",
          right: "10%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: {
          name: "日期",
          type: "category",
          boundaryGap: false,
          data: ["10.01", "10.15", "10.30", "11.01", "11.15"],
        },
        yAxis: {
          name: "饮食满意度（%）",
          type: "value",
          min: 0, // 设置y轴刻度的最小值
          max: 100, // 设置y轴刻度的最大值
          splitNumber: 5, // 设置y轴刻度间隔个数
        },
        series: [
          {
            name: "饮食满意度",
            type: "line",
            // stack: '总量',
            data: ["70", "65", "80", "70", "85"],
          },
        ],
      });
      //绘制图表2
      myChart2.setOption({
        title: {
          text: "娱乐满意度", //主标题
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
          data: ["娱乐满意度"],
          bottom: "bottom",
        },
        grid: {
          left: "5%",
          right: "10%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: {
          name: "日期",
          type: "category",
          boundaryGap: false,
          data: ["10.01", "10.15", "10.30", "11.01", "11.15"],
        },
        yAxis: {
          name: "娱乐满意度（%）",
          type: "value",
          min: 0, // 设置y轴刻度的最小值
          max: 100, // 设置y轴刻度的最大值
          splitNumber: 5, // 设置y轴刻度间隔个数
        },
        series: [
          {
            name: "娱乐满意度",
            type: "line",
            // stack: '总量',
            data: ["50", "60", "80", "70", "55"],
          },
        ],
      });
      //绘制图表3
      myChart3.setOption({
        title: {
          text: "睡眠质量", //主标题
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
          name: "睡眠时间",
          type: "category",
          data: ["4-5", "6-8", "8-10"],
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
            data: [450, 700, 500],
            type: "bar",
          },
        ],
      });
      //绘制图表4
      myChart4.setOption({
        title: {
          text: "整体健康状况", //主标题
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
          right: "right",
          data: ["大体健康", "恢复健康", "基本自理", "丧失自理"],
          //   padding: [60,0,0,0]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 835, name: "大体健康" },
              { value: 1048, name: "恢复健康" },
              { value: 535, name: "基本自理" },
              { value: 300, name: "丧失自理" },
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
  },
  created() {},
  mounted() {
    this.initData();
  },
};
</script>

<style lang="less">
#wholeHealth {
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
      height: 90px;
      background: white;
      margin: 25px auto;
      // border-radius: 10px;
      // box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
      padding-top: 1px;
      .buttonList {
        margin-top: 25px;
        margin-left: -700px;
      }
      .typeChoose {
        width: 100%;
        height: 45px;
        margin-top: 20px;
        margin-left: 0px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: Medium;
        color: #333333;
        .search {
          margin-left: 50px;
          .el-select {
            width: 130px;
          }
          .input-with-select .el-input-group__prepend {
            background-color: #fff;
          }
          .s-input {
            width: 120%;
          }
        }
      }
    }

    .maincontent {
      display: flex;
      margin: 15px auto;
      //   background: white;
      width: 95%;
      height: 490px;
      .maincontentLeft {
        width: 80%;
        height: 450px;
        background: white;
        margin-right: 30px;
        padding: 20px;
        .maincontentLeftTop {
          //   display: flex;
          height: 50%;
          width: 100%;
        }
        .maincontentLeftBottom {
          //   display: flex;
          height: 50%;
          width: 100%;
          margin-top: 20px;
        }
      }
      .maincontentRight {
        width: 17%;
        height: 100%;
        background: white;
        .activityName {
          width: 100%;
          height: 30px;
          flex-wrap: wrap;
          font-size: 14px;
          text-align: left;
          padding-left: 15px;
        }
      }
    }
  }
}

.titleTip {
  display: flex;
  font-weight: 600;
  font-size: 17px;
  padding: 20px 15px;
  .titleLine {
    width: 7px;
    height: 20px;
    background: rgb(36, 114, 200);
  }
}
</style>