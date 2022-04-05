<template>
  <div id="recommendDiet">
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
        <div :class="nowUserName != '' ? 'userNameleft' : 'topRight'">
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
            >{{ nowUserName }}</label
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
            >健康状况 / <label style="color: #63cda5">推荐膳食</label></label
          >
        </div>

        <div class="manage">
          <div class="typeChoose">
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
                  placeholder="套餐选择"
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
          </div>
        </div>

        <!--推荐膳食-->
        <div class="maincontent">
          <div class="maincontentleft">
            <el-table class="maintable" :data="tableData">
              <el-table-column type="index" label="编号" width="60">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="90">
              </el-table-column>
              <el-table-column prop="sex" label="性别" width="70">
              </el-table-column>
              <el-table-column prop="build" label="楼号" width="70">
              </el-table-column>
              <el-table-column prop="room" label="房间" width="110">
              </el-table-column>
              <el-table-column prop="grade" label="护理等级" width="120">
              </el-table-column>
              <el-table-column prop="attention" label="注意饮用" width="120">
              </el-table-column>
              <el-table-column prop="meal" label="当前套餐" width="110">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div style="display: flex">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                      >查看</el-button
                    >
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                      >切换</el-button
                    >
                    <el-button
                      size="mini"
                      @click="recommend(scope.$index, scope.row)"
                      >推荐</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="mainpagination"
              background
              layout="prev, pager, next"
              :total="1000"
            >
            </el-pagination>
          </div>
          <!--切换房区-->
          <div class="maincontentright">
            <div class="titleTip">
              <div class="titleLine"></div>
              <div style="padding-left: 10px">切换房区</div>
            </div>
            <div class="roomButton">
              <el-button>全 &nbsp;&nbsp;部</el-button>
            </div>
            <div class="roomButton"><el-button>单人间</el-button></div>
            <div class="roomButton"><el-button>三人间</el-button></div>
            <div class="roomButton"><el-button>五人间</el-button></div>
            <div class="titleTip" style="margin-top: 10px">
              <div class="titleLine"></div>
              <div style="padding-left: 10px">套餐设置</div>
            </div>
            <div><el-button @click="setMeal">套餐设置</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "../components/NavMenu.vue";
export default {
  name: "recommendDiet",
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
                    value: "/familyVisitApprove",
                  },
                },
                {
                  entity: {
                    id: 18,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理注册信息",
                    value: "/familyRegisterApprove",
                  },
                },
                {
                  entity: {
                    id: 19,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理预约信息",
                    value: "/familyAppointmentApprove",
                  },
                },
                {
                  entity: {
                    id: 20,
                    name: "classifyManage3",
                    icon: "el-icon-message-solid",
                    alias: "处理活动申请",
                    value: "/familyActivityApprove",
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
                    value: "/nurseLeaveApprove",
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
      tableData: [
        {
          sex: "男",
          name: "王小虎",
          build: "A",
          room: "9-110",
          grade: "大体健康",
          attention: "芒果过敏",
          meal: "自定义",
        },
        {
          sex: "女",
          name: "钱玉",
          build: "B",
          room: "8-001",
          grade: "基本自理",
          attention: "无",
          meal: "套餐A",
        },
        {
          sex: "女",
          name: "赵红",
          build: "B",
          room: "8-001",
          grade: "基本自理",
          attention: "无",
          meal: "套餐A",
        },
        {
          sex: "女",
          name: "李曼",
          build: "B",
          room: "8-001",
          grade: "基本自理",
          attention: "无",
          meal: "套餐A",
        },
        {
          sex: "男",
          name: "王建国",
          build: "A",
          room: "9-110",
          grade: "大体健康",
          attention: "大蒜过敏",
          meal: "套餐B",
        },
        {
          sex: "男",
          name: "陈建民",
          build: "A",
          room: "9-110",
          grade: "大体健康",
          attention: "无",
          meal: "套餐B",
        },
      ],
      type: "",
      nowUserName: "", //当前登录用户
    };
  },
  methods: {
    //套餐设置
    setMeal() {
      this.$router.push({
        path: "/setMealList",
      });
    },
    //推荐套餐
    recommend(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/setMeal",
        query: {
          meal: row.meal,
          way: 0,
        },
      });
    },
  },
  created() {},
  mounted() {
    this.nowUserName = localStorage.getItem("userName");
  },
};
</script>

<style lang="less" scoped>
#recommendDiet {
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
      .maincontentleft {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
        background: white;
        width: 83%;
        height: 490px;
        .maintop {
          display: flex;
          flex-direction: row;
          margin-top: 20px;
          margin-bottom: 20px;
          width: 100%;
        }
        .maintable {
          width: 95%;
          margin: 20px auto;
        }
        .mainpagination {
          margin-top: 30px;
          margin-bottom: 30px;
          margin-left: 480px;
          width: 50%;
        }
      }

      .maincontentright {
        display: flex;
        flex-direction: column;
        background: white;
        width: 14%;
        height: 490px;
        .roomButton {
          margin: 10px auto;
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