<template>
  <div id="setMealList">
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
            >健康状况 / <label style="color: #63cda5">推荐膳食</label> / <label style="color: #63cda5">套餐设置</label></label
          >
          <el-button style="margin-left:840px;" type="primary" @click="addMeal">新增套餐</el-button>
        </div>

        <!--推荐膳食-->
        <div class="maincontent">
            <!--套餐A-->
           <div class="titleTip" style="margin-top:10px;margin-left:33px;">
                  <div class="titleLine"></div>
                  <div style="padding-left:10px;">套餐A</div>
              </div>
              <div>
                <el-scrollbar class="conscorll">
<el-table
    :data="tableData"
    border
    class="mainTable">
    <el-table-column
      prop="date"
      label="时间"
      width="100">
    </el-table-column>
    <el-table-column
      prop="mon"
      label="周一"
      width="120">
      <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.mon" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.mon}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="tue"
      label="周二"
      width="120">
       <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.tue" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.tue}}</span>
        </template>
    </el-table-column>
    </el-table-column>
    <el-table-column
      prop="wed"
      label="周三"
      width="120">
       <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.wed" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.wed}}</span>
        </template>
    </el-table-column>
    </el-table-column>
    <el-table-column
      prop="thur"
      label="周四"
      width="120">
       <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.thur" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.thur}}</span>
        </template>
    </el-table-column>
    </el-table-column>
    <el-table-column
      prop="fri"
      label="周五"
      width="120">
      <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.fri" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.fri}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="sat"
      label="周六"
      width="120">
      <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.sat" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.sat}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="sun"
      label="周日"
      width="120">
      <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.sun" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.sun}}</span>
        </template>
    </el-table-column>
     <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row, scope)">编辑</el-button>
          <el-button type="primary" @click="save(scope.row)">保存</el-button>
        </template>
      </el-table-column>
  </el-table>
  </el-scrollbar>
  </div>

<!--套餐B-->
<div class="titleTip" style="margin-top:0px;margin-left:33px;">
                  <div class="titleLine"></div>
                  <div style="padding-left:10px;">套餐B</div>
              </div>
              <div>
                <el-scrollbar class="conscorll">
<el-table
    :data="tableData1"
    border
    class="mainTable">
    <el-table-column
      prop="date"
      label="时间"
      width="100">
    </el-table-column>
    <el-table-column
      prop="mon"
      label="周一"
      width="120">
      <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.mon" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.mon}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="tue"
      label="周二"
      width="120">
       <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.tue" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.tue}}</span>
        </template>
    </el-table-column>
    </el-table-column>
    <el-table-column
      prop="wed"
      label="周三"
      width="120">
       <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.wed" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.wed}}</span>
        </template>
    </el-table-column>
    </el-table-column>
    <el-table-column
      prop="thur"
      label="周四"
      width="120">
       <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.thur" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.thur}}</span>
        </template>
    </el-table-column>
    </el-table-column>
    <el-table-column
      prop="fri"
      label="周五"
      width="120">
      <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.fri" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.fri}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="sat"
      label="周六"
      width="120">
      <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.sat" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.sat}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="sun"
      label="周日"
      width="120">
      <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.sun" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.sun}}</span>
        </template>
    </el-table-column>
     <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="edit1(scope.row, scope)">编辑</el-button>
          <el-button type="primary" @click="save1(scope.row)">保存</el-button>
        </template>
      </el-table-column>
  </el-table>
  </el-scrollbar>
  </div>

  
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "../components/NavMenu.vue";

export default {
  name: "setMealList",
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
      courses: [
        {
          name: "早读",
          day: 3,
          start: [6, 0],
          end: [6, 45],
        },
      ],
      tableData: [
        {
          date: "早",
          mon: "面包、牛奶",
          tue: "鸡蛋、油条、粥",
          wed: "面包、牛奶",
          thur: "鸡蛋、油条、粥",
          fri: "面包、牛奶",
          sat: "鸡蛋、油条、粥",
          sun: "面食",
          iseditor: false,
        },
        {
          date: "中",
          mon: "番茄炒鸡蛋、青椒炒肉、芙蓉汤、香蕉",
          tue: "蒜蓉蒸茄子、白斩鸡、南瓜汤、苹果",
          wed: "素炒南瓜尖、什锦虾仁、冬瓜排骨汤、梨",
          thur: "韭菜炒蚕豆、牛肉、芙蓉汤、香蕉",
          fri: "豆豉虎皮青椒、糖醋排骨、白萝卜玉米汤、桃子",
          sat: "如意香干、空心菜梗炒玉米、紫菜蛋汤、梨",
          sun: "土豆丝、双椒蒸豆腐、冬瓜排骨汤、梨",
          iseditor: false,
        },
        {
          date: "晚",
          mon: "韭菜炒蚕豆、牛肉、芙蓉汤、香蕉",
          tue: "土豆丝、双椒蒸豆腐、冬瓜排骨汤、梨",
          wed: "素炒南瓜尖、什锦虾仁、冬瓜排骨汤、梨",
          thur: "蒜蓉蒸茄子、白斩鸡、南瓜汤、苹果",
          fri: "豆豉虎皮青椒、糖醋排骨、白萝卜玉米汤、桃子",
          sat: "番茄炒鸡蛋、青椒炒肉、芙蓉汤、香蕉",
          sun: "如意香干、空心菜梗炒玉米、紫菜蛋汤、梨",
          iseditor: false,
        },
      ],
      tableData1: [
         {
          date: "早",
          mon: "面包、牛奶",
          tue: "鸡蛋、油条、粥",
          wed: "面包、牛奶",
          thur: "鸡蛋、油条、粥",
          fri: "面包、牛奶",
          sat: "鸡蛋、油条、粥",
          sun: "面食",
          iseditor: false,
        },
        {
          date: "中",
          mon: "番茄炒鸡蛋、青椒炒肉、芙蓉汤、香蕉",
          tue: "蒸茄子、白斩鸡、海带汤、苹果",
          wed: "素炒南瓜尖、什锦虾仁、冬瓜排骨汤、梨",
          thur: "韭菜炒蚕豆、牛肉、芙蓉汤、香蕉",
          fri: "豆豉虎皮青椒、糖醋排骨、白萝卜玉米汤、桃子",
          sat: "如意香干、空心菜梗炒玉米、紫菜蛋汤、梨",
          sun: "土豆丝、双椒蒸豆腐、冬瓜排骨汤、梨",
          iseditor: false,
        },
        {
          date: "晚",
          mon: "韭菜炒蚕豆、牛肉、芙蓉汤、香蕉",
          tue: "土豆丝、双椒蒸豆腐、冬瓜排骨汤、梨",
          wed: "素炒南瓜尖、什锦虾仁、冬瓜排骨汤、梨",
          thur: "蒸茄子、白斩鸡、海带汤、苹果",
          fri: "豆豉虎皮青椒、糖醋排骨、白萝卜汤、桃子",
          sat: "番茄炒鸡蛋、青椒炒肉、芙蓉汤、香蕉",
          sun: "如意香干、空心菜梗炒玉米、南瓜汤、梨",
          iseditor: false,
        },
      ],
    };
  },
  methods: {
    //套餐A
    edit(row, index) {
      row.iseditor = true;
    },
    save(row, index) {
      row.iseditor = false;
    },

    //套餐B
    edit1(row, index) {
      row.iseditor = true;
    },
    save1(row, index) {
      row.iseditor = false;
    },

    //新增套餐
    addMeal() {
        this.$router.push({
        path: "/setMeal",
        query: {
          way: 1,
        },
      });
    }
  },
  created() {
  },
  mounted() {},
};
</script>

<style lang="less">
#setMealList {
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

    .maincontent {
      display: flex;
      flex-direction: column;
      margin: 0px auto;
      margin-top: -10px;
      //   background: white;
      width: 95%;
      height: 490px;
      .conscorll {
        overflow-x: hidden;
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 270px;
      }
      .mainTable {
        width: 1121px;
        margin: 5px auto;
      }
      .nowDiet {
        display: flex;
        margin: 15px auto;
        width: 92%;
        .nowDietLeft {
          display: flex;
          flex-direction: column;
          margin-right: 30px;
          background: white;
          width: 45%;
          height: 280px;
          .oldInfo {
            display: flex;
            margin-top: 10px;
            margin-left: 35px;
            label {
              margin-top: 7px;
            }
            input {
              width: 70%;
            }
            .oldInfoInput {
              width: 52%;
            }
          }
        }
        .nowDietRight {
          background: white;
          width: 53%;
          height: 280px;
          display: flex;
          flex-direction: column;
          img {
            width: 495px;
            height: 225px;
            margin: 0px auto;
            margin-top: -10px;
          }
        }
      }
    }
  }
}

.titleTip {
  display: flex;
  font-weight: 600;
  font-size: 17px;
  padding: 10px 15px;
  .titleLine {
    width: 7px;
    height: 20px;
    background: rgb(36, 114, 200);
  }
}

.cell-edit-input .el-input,
.el-input__inner {
  width: 100px;
}
.cell-icon {
  cursor: pointer;
  color: #fff;
}
</style>