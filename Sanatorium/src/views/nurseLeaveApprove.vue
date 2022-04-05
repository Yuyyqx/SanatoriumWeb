<template></template>
  <div id="nurseLeaveApprove">
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
            >审批申请 / 护工 /
            <label style="color: #63cda5">处理请假信息</label></label
          >
        </div>

        <!--筛选-->
        <div class="choose">
          <div class="chooseTitle">
            <div class="chooseLabel">护工请假</div>
            <div class="chooseLine"></div>
          </div>
          <div class="chooseBox">
            <el-select v-model="value" placeholder="请选择审批状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!--审批列表-->
        <el-scrollbar class="conscorll">
          <div class="wholeList">
            <div
              class="item"
              v-for="(item, index) in approveList"
              @click="approveDetail(index)"
            >
              <div class="itemTop">
                <div class="approve">
                  <img
                    class="approveImg"
                    src="../../static/images/approve.png"
                  />
                  <label class="approveLabel">审批</label>
                </div>
                <div :class="item.state == '已审批' ? 'state' : ''">
                  {{ item.state }}
                </div>
              </div>
              <div class="itemTitle">
                {{ item.nurseName }}提交的2021年护工请假审批
              </div>
              <div class="beginTime">请假时间：{{ item.startTime }}</div>
              <div class="endTime">返回时间：{{ item.endTime }}</div>
            </div>
          </div>
        </el-scrollbar>

        <!--当前共有多少审批记录-->
        <div class="allRecord">
          共有<label class="allRecordLabel">{{ listLength }}</label
          >条
        </div>
      </div>
    </div>

    <!--详情界面-->
    <el-dialog
      title="审批"
      :visible.sync="detailFlag"
      width="35%"
      center
      class="detailContent"
    >
      <span>
        <div class="detailMain">
          <div class="detailMainTop">
            <div style="font-weight: 600; padding-left: 10px">
              {{ detailInfo.nurseName }}提交的2021年护工请假审批
            </div>
            <div :class="detailInfo.state == '审批中' ? 'color1' : 'color2'">
              {{ detailInfo.state }}
            </div>
          </div>
          <el-scrollbar class="conscorll1">
            <div class="otherInfo">
              <div class="applyId">
                <div class="applyIdLabel">申请编号：</div>
                <div>{{ detailInfo.id }}</div>
              </div>
              <div class="applyId">
                <div class="applyIdLabel">护工疗号：</div>
                <div>{{ detailInfo.nurseId }}</div>
              </div>
              <div class="illustrate">{{ illustrate }}</div>
              <div class="applyId">
                <div class="applyIdLabel">管理老人：</div>
                <div>{{ detailInfo.oldName }}</div>
              </div>
              <div class="applyId">
                <div class="applyIdLabel">请假时间：</div>
                <div>{{ detailInfo.startTime }}</div>
              </div>
              <div class="applyId">
                <div class="applyIdLabel">返回时间：</div>
                <div>{{ detailInfo.endTime }}</div>
              </div>
              <div class="applyId">
                <div class="applyIdLabel">请假理由：</div>
                <div>{{ detailInfo.reason }}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseClick">拒 绝</el-button>
        <el-button type="primary" @click="agreeClick">同 意</el-button>
      </span>
    </el-dialog>

    <!--是否填写拒绝理由-->
    <el-dialog
      title="拒绝理由"
      :visible.sync="reasonDialogFlag"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <div style="display: flex">
          <label style="width: 110px">拒绝理由：</label>
          <el-input
            placeholder="请输入"
            v-model="addReason"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reasonDialogFlag = false">取 消</el-button>
        <el-button type="primary" @click="reasonDialogFlag = false"
          >填 写</el-button
        >
      </span>
    </el-dialog>
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
  name: "nurseLeaveApprove",
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
      options: [
        {
          value: "选项1",
          label: "全部",
        },
        {
          value: "选项2",
          label: "未审批",
        },
        {
          value: "选项3",
          label: "已审批",
        },
      ],
      value: "",
      approveList: [
        {
          id: 1,
          nurseId: 1111,
          nurseName: "王小虎",
          oldName: "陈某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "未审批",
        },
        {
          id: 2,
          nurseId: 2222,
          nurseName: "王小明",
          oldName: "李某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "已审批",
        },
        {
          id: 3,
          nurseId: 3333,
          nurseName: "张小红",
          oldName: "赵某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "未审批",
        },
        {
          id: 4,
          nurseId: 1111,
          nurseName: "王小虎",
          oldName: "陈某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "未审批",
        },
        {
          id: 5,
          nurseId: 2222,
          nurseName: "王小明",
          oldName: "李某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "已审批",
        },
        {
          id: 6,
          nurseId: 3333,
          nurseName: "张小红",
          oldName: "赵某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "未审批",
        },
        {
          id: 7,
          nurseId: 1111,
          nurseName: "王小虎",
          oldName: "陈某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "未审批",
        },
        {
          id: 8,
          nurseId: 2222,
          nurseName: "王小明",
          oldName: "李某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "已审批",
        },
        {
          id: 9,
          nurseId: 3333,
          nurseName: "张小红",
          oldName: "赵某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "未审批",
        },
        {
          id: 10,
          nurseId: 1111,
          nurseName: "王小虎",
          oldName: "陈某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "未审批",
        },
        {
          id: 11,
          nurseId: 2222,
          nurseName: "王小明",
          oldName: "李某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "已审批",
        },
        {
          id: 12,
          nurseId: 3333,
          nurseName: "张小红",
          oldName: "赵某某",
          startTime: "2021-11-25 13:47",
          endTime: "2021-11-27 13:47",
          reason: "有事需要回家处理",
          state: "未审批",
        },
      ],
      detailFlag: false,
      detailInfo: {
        id: "",
        nurseId: "",
        nurseName: "",
        oldName: "",
        startTime: "",
        endTime: "",
        reason: "",
        state: "",
      },
      illustrate:
        "各位同学：请假外出仍要做好日常的防护工作。【1】确实需要请假外出，务必如实申报，如有弄虚作假，严格按照校纪校规处理。审批通过，出校门时主动出示请假记录。【2】晚8点后不得请假外出（病假等特殊情况除外）。当天请假晚 9 点前必须回到学校（特殊情况请及时向辅导员说明）【3】若发现未按时回校，弄虚作假造成严重后果的，按照疫情期间的管理规定作出相应处理。特别提醒：此轮疫情已波及多个省市，请同学们非必要不离校。",
      reasonDialogFlag: false,
      addReason: "", //拒绝理由
    };
  },
  methods: {
    //进入详情界面
    approveDetail(index) {
      this.detailFlag = true;
      this.detailInfo = this.approveList[index];
      if (this.approveList[index].state == "未审批") {
        this.detailInfo.state = "审批中";
      } else if (this.approveList[index].state == "已审批") {
        this.detailInfo.state = "结束审批";
      }
    },
    //拒绝申请
    refuseClick() {
      this.reasonDialogFlag = true;
      this.detailFlag = false;
    },
    //同意申请
    agreeClick() {
      this.$alert("后台发送信息给其余护工", "", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
      this.detailFlag = false;
    },
  },
  created() {
    this.listLength = this.approveList.length;
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
#nurseLeaveApprove {
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
    flex-direction: column;
    .nowPage {
      display: flex;
      margin-top: 20px;
      margin-left: 30px;
      img {
        width: 20px;
        height: 20px;
      }
    }

    .choose {
      width: 95%;
      height: 60px;
      background: white;
      margin: 25px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .chooseTitle {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
        margin-left: 30px;
        width: 64px;
        height: 100%;
        justify-content: center;
        align-items: center;
        .chooseLabel {
          font-size: 16px;
          padding-bottom: 15px;
          margin-top: 20px;
        }
        .chooseLine {
          width: 50px;
          height: 5px;
          background: rgb(36, 114, 200);
        }
      }
      .chooseBox {
        margin-right: 60px;
      }
    }

    .conscorll {
      overflow-x: hidden;
      width: 100%;
      height: 490px;
      margin-top: 15px;
    }

    .wholeList {
      display: flex;
      //   flex-direction: column;
      flex-wrap: wrap;
      width: 90%;
      height: 490px;
      margin: 0px auto;
      word-break: break-all;
      word-wrap: break-word;
      .item {
        background: white;
        width: 28%;
        height: 120px;
        display: flex;
        flex-direction: column;
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 10px;
        margin-right: 20px;
        .itemTop {
          display: flex;
          //   height: 45px;
          width: 100%;
          justify-content: space-between;
          align-items: center;
        }
        .approve {
          display: flex;
          color: rgb(253, 148, 56);
          .approveImg {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
        }
        .itemTitle {
          width: 100%;
          font-weight: 600;
          flex-wrap: wrap;
          text-align: left;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .state {
          color: rgb(101, 209, 173);
        }
        .beginTime {
          text-align: left;
          margin-bottom: 3px;
        }
        .endTime {
          text-align: left;
        }
      }
    }

    .allRecord {
      margin-left: 900px;
      margin-top: 7px;
      .allRecordLabel {
        color: rgb(36, 114, 200);
      }
    }
  }
}
.el-dialog--center .el-dialog__body {
  background: rgb(240, 240, 240);
  padding: 0px;
}
.conscorll1 {
  overflow-x: hidden;
  width: 100%;
  height: 470px;
}
.detailContent {
  .detailMain {
    width: 100%;
    height: 470px;
    display: flex;
    flex-direction: column;
    .detailMainTop {
      width: 100%;
      height: 50px;
      background: white;
      margin-bottom: 15px;
      padding-bottom: 5px;
    }
    .otherInfo {
      width: 90%;
      //   height: 370px;
      background: white;
      border-radius: 10px;
      margin: 0 auto;
      padding: 15px;
      margin-bottom: 15px;
      .applyId {
        margin-bottom: 12px;
        .applyIdLabel {
          margin-bottom: 5px;
        }
      }
      .illustrate {
        font-size: 13px;
        color: rgb(140, 147, 155);
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
    }
  }
}
.color1 {
  font-size: 13px;
  color: rgb(101, 209, 173);
  margin-top: 10px;
  padding-left: 10px;
}
.color2 {
  font-size: 13px;
  color: rgb(253, 148, 56);
  margin-top: 10px;
  padding-left: 10px;
}
</style>