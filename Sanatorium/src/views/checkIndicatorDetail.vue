<template>
  <div id="checkIndicatorDetail">
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
            <label style="color: #63cda5" @click="backTo">查看各项指标</label> /
            <label style="color: #63cda5">具体信息</label></label
          >
        </div>

        <div class="maincontent">
          <!--查看老人信息-->
          <div class="maincontentleft">
            <div class="titleTip">
              <div class="titleLine"></div>
              <div style="padding-left: 10px">老人信息</div>
            </div>
            <div class="oldInfo">
              <label>姓 名：</label
              ><el-input
                v-model="oldInfo.name"
                :disabled="true"
                class="oldInfoInput"
              >
              </el-input>
            </div>
            <div class="oldInfo">
              <label>性 别：</label
              ><el-input
                v-model="oldInfo.sex"
                :disabled="true"
                class="oldInfoInput"
              >
              </el-input>
            </div>
            <div class="oldInfo">
              <label>楼 号：</label
              ><el-input
                v-model="oldInfo.build"
                :disabled="true"
                class="oldInfoInput"
              >
              </el-input>
            </div>
            <div class="oldInfo">
              <label>房 间：</label
              ><el-input
                v-model="oldInfo.room"
                :disabled="true"
                class="oldInfoInput"
              >
              </el-input>
            </div>
            <div class="oldInfo">
              <label>护理等级：</label
              ><el-input
                v-model="oldInfo.grade"
                :disabled="true"
                class="oldInfoInput"
              >
              </el-input>
            </div>
            <div class="oldInfo">
              <label>评级健康：</label
              ><el-input
                v-model="oldInfo.score"
                :disabled="true"
                class="oldInfoInput"
              >
              </el-input>
            </div>
          </div>

          <!--健康档案-->
          <div class="maincontentmiddle">
            <div class="titleTip">
              <div class="titleLine"></div>
              <div style="padding-left: 10px">健康档案</div>
            </div>
            <div class="archives">
              <div class="archivesLeft">
                <div class="archivesLeftBreath">
                  <img
                    class="breathImg"
                    src="../../static/images/indicator1.png"
                  />
                  <div class="breath">
                    <label class="breathLabel">呼吸：</label>
                    <label class="breathLabel" style="margin-left: 15px"
                      >15次/min</label
                    >
                  </div>
                </div>
                <div class="archivesLeftBreath">
                  <img
                    class="breathImg"
                    src="../../static/images/indicator2.png"
                  />
                  <div class="breath">
                    <label class="breathLabel">脉搏：</label>
                    <label class="breathLabel" style="margin-left: 15px"
                      >70次/min</label
                    >
                  </div>
                </div>
                <div class="archivesLeftBreath">
                  <img
                    class="breathImg"
                    src="../../static/images/indicator3.png"
                  />
                  <div class="breath">
                    <label class="breathLabel">血压：</label>
                    <label class="breathLabel" style="margin-left: 15px"
                      >150mmHg</label
                    >
                  </div>
                </div>
                <div class="archivesLeftBreath">
                  <img
                    class="breathImg"
                    src="../../static/images/indicator4.png"
                  />
                  <div class="breath">
                    <label class="breathLabel">饮食：</label>
                    <label class="breathLabel" style="margin-left: 15px"
                      >220g</label
                    >
                  </div>
                </div>
                <div class="archivesLeftBreath">
                  <img
                    class="breathImg"
                    src="../../static/images/indicator5.png"
                    style="margin-top: 5px"
                  />
                  <div class="breath">
                    <label class="breathLabel">排尿：正常</label>
                    <label class="breathLabel">排便：正常</label>
                  </div>
                </div>
              </div>
              <div class="archivesRight">
                <img src="../../static/images/peopleHealth.jpg" />
              </div>
            </div>
          </div>

          <!--雷达图-->
          <div class="maincontentright">
            <div class="titleTip">
              <div class="titleLine"></div>
              <div style="padding-left: 10px">各项指标雷达图</div>
            </div>
            <div>
              <div id="pie1">
                <div
                  id="main1"
                  style="float: left; width: 100%; height: 250px"
                ></div>
              </div>
            </div>
            <div class="titleTip" style="margin-top: 30px">
              <div class="titleLine"></div>
              <div style="padding-left: 10px">系统评定</div>
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
  name: "checkIndicatorDetail",
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
      oldInfo: {
        sex: "",
        name: "",
        build: "",
        room: "",
        grade: "",
        score: "",
      },
      activityList: [
        {
          id: 1,
          name: "健康分数：85",
        },
        {
          id: 2,
          name: "注意饮食低于250g，注意潜在炎症",
        },
        {
          id: 3,
          name: "....",
        },
      ],
    };
  },
  methods: {
    //返回上一级界面
    backTo() {
      this.$router.push({
        path: "/checkIndicator",
      });
    },
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main1"));
      // 绘制图表1
      myChart.setOption({
        //   title: {
        //   text: "各项指标", //主标题
        //   textStyle: {
        //     fontSize: 16,
        //   },
        //   subtext: "", //副标题
        //   x: "center", //x轴方向对齐方式
        // },
        legend: {
          data: ["上周", "本周"],
          right: "right",
        },
        grid: {
          left: "6%",
          right: "10%",
          bottom: "15%",
          containLabel: true,
        },
        radar: {
          name: {
            textStyle: {
              color: "black",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "体温", max: 5 },
            { name: "体重", max: 5 },
            { name: "血压", max: 5 },
            { name: "脉搏", max: 5 },
            { name: "饮食", max: 5 },
            { name: "排泄", max: 5 },
          ],
        },
        series: [
          {
            name: "指标",
            type: "radar",
            areaStyle: { normal: {} },
            data: [
              { name: "上周", value: [3, 4, 4, 5, 4, 4] },
              { name: "本周", value: [4, 4, 3, 4, 4, 5] },
            ],
          },
        ],
      });
    },
  },
  created() {
    this.oldInfo.sex = this.$route.query.sex;
    this.oldInfo.name = this.$route.query.name;
    this.oldInfo.build = this.$route.query.build;
    this.oldInfo.room = this.$route.query.room;
    this.oldInfo.grade = this.$route.query.grade;
    this.oldInfo.score = this.$route.query.score;
  },
  mounted() {
    this.initData();
  },
};
</script>

<style lang="less">
#checkIndicatorDetail {
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
    margin-top: 10px;
    .nowPage {
      display: flex;
      margin-top: 20px;
      margin-left: 30px;
      img {
        width: 20px;
        height: 20px;
      }
    }

    .maincontent {
      display: flex;
      margin: 30px auto;
      //   background: white;
      width: 95%;
      height: 590px;
      .maincontentleft {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
        background: white;
        width: 22%;
        height: 590px;
        .oldInfo {
          display: flex;
          margin-top: 20px;
          margin-left: 20px;
          label {
            margin-top: 7px;
          }
          .oldInfoInput {
            width: 50%;
          }
        }
      }

      .maincontentmiddle {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
        background: white;
        width: 47%;
        height: 590px;
        .archives {
          display: flex;
          .archivesLeft {
            display: flex;
            flex-direction: column;
            width: 40%;
            height: 100%;
            padding: 20px;
            margin-left: 50px;
            .archivesLeftBreath {
              display: flex;
              margin-top: 35px;
              img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
              }
              .breath {
                display: flex;
                flex-direction: column;
                font-size: 14px;
                text-align: left;
              }
            }
          }
          .archivesRight {
            display: flex;
            flex-direction: column;
            width: 60%;
            height: 100%;
            img {
              width: 230px;
              height: 462px;
            }
          }
        }
      }

      .maincontentright {
        display: flex;
        flex-direction: column;
        background: white;
        width: 25%;
        height: 590px;
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