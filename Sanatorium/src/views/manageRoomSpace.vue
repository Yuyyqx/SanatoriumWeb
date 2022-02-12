<template>
  <div id="manageRoomSpace">
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
        <div :class="nowUserName!=''?'userNameleft': 'topRight'" >
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
        <div class="nowPage">
          <img src="../../static/images/nowPage.png" />
          <label style="color: #888888"
            >疗养管理 / 管理房间 /
            <label style="color: #63cda5">空余情况管理</label></label
          >
        </div>

        <!--空余情况管理-->
        <div class="manage">
          <!--搜索框-->
          <div class="typeChoose">
            <div class="search">
              <el-input
                prefix-icon="el-icon-search"
                placeholder="请输入内容"
                class="s-input"
                v-model="search"
                type="text"
              >
                <el-select v-model="select" slot="prepend" placeholder="">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="单人间" value="1"></el-option>
                  <el-option label="三人间" value="2"></el-option>
                  <el-option label="五人间" value="3"></el-option>
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
              @click="addRoom"
              >设置房间</el-button
            >
          </div>
          <!--图表-->
          <div class="managePic">
            <div class="managePic1" v-for="(item,index) in options">
              <label>{{item.roomTypeName}}空余情况</label>
              <radial-indicator
                percentNum="33"
                speed="3"
                size="220"
                color="#8abf50"
                @animationFinished="animationFinished"
                backgroundColor="#c4dfa7"
                :content='item.roomTypeName'
                icon="mail"
                class="manageRadial"
                style="margin-top: 40px"
              />
              <button class="manageClick" @click="manageClick(index)">查看详情</button>
            </div>
            <!-- <div class="managePic1">
              <label>单人间空余情况</label>
              <radial-indicator
                percentNum="50"
                speed="3"
                size="220"
                color="#8abf50"
                @animationFinished="animationFinished"
                backgroundColor="#c4dfa7"
                content="单人间"
                icon="mail"
                class="manageRadial"
                style="margin-top: 40px"
              />
              <button class="manageClick" @click="manageClick">查看详情</button>
            </div> -->
            <!-- <div class="managePic1">
              <label>三人间空余情况</label>
              <radial-indicator
                percentNum="50"
                speed="3"
                size="220"
                color="#8abf50"
                @animationFinished="animationFinished"
                backgroundColor="#c4dfa7"
                content="三人间"
                icon="mail"
                class="manageRadial"
                style="margin-top: 40px"
              />
              <button class="manageClick" @click="manageClick1">
                查看详情
              </button>
            </div>
            <div class="managePic1">
              <label>五人间空余情况</label>
              <radial-indicator
                percentNum="87"
                speed="3"
                size="220"
                color="#8abf50"
                @animationFinished="animationFinished"
                backgroundColor="#c4dfa7"
                content="五人间"
                icon="mail"
                class="manageRadial"
                style="margin-top: 40px"
              /> -->
              <!-- <button class="manageClick" @click="manageClick2">
                查看详情
              </button> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <!--设置房间-->
    <el-dialog
      title="设置房间"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <div style="display: flex;margin-bottom:20px;">
          <label style="width: 110px">房间类型：</label>
          <el-input
            placeholder="请输入"
            v-model="roomTypeName"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex">
          <label style="width: 110px">床位数量：</label>
          <el-input
            placeholder="请输入"
            v-model="bedCount"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">单人价位：</label>
          <el-input
            placeholder="  /天"
            v-model="singleMonthlyPrice"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setNewRoomType"
          >设 置</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import RadialIndicator from "../components/RadialIndicator.vue";
import NavMenu from "../components/NavMenu.vue";
export default {
  name: "manageRoomSpace",
  components: {
    RadialIndicator: RadialIndicator,
    NavMenu: NavMenu,
  },
  inject: ['reload'],//注入reload方法
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
      array: ["全部", "单人间", "三人间", "五人间"],
      search: "",
      index: 0,
      select: "全部",
      tableData: [
        {
          roomNum: "A-911",
          used: "1/1",
          grade: "大体健康",
        },
        {
          roomNum: "A-912",
          used: "0/1",
          grade: "基本自理",
        },
        {
          roomNum: "A-913",
          used: "0/1",
          grade: "丧失能力",
        },
        {
          roomNum: "A-914",
          used: "0/1",
          grade: "丧失能力",
        },
      ],
      options: [
        {
          value: 0,
          label: "单人间",
          num: "33",
        },
        {
          value: 1,
          label: "三人间",
          num: "50",
        },
        {
          value: 2,
          label: "五人间",
          num: "87",
        },
      ],
      value: "单人间",
      percentNum: "33",
      dialogVisible: false,
      roomNum: "",
      price: "",
      roomType: "",
      nowUserName: '', //当前登录用户
      sanInfoId: '',
      sanId: '',
      bedCount: '',
      roomTypeName: '',
      singleMonthlyPrice: ''
    };
  },
  methods: {
    //下拉框
    bindPickerChange(e) {
      this.index = e.target.value;
    },
    //根据标题搜索
    searchByKey() {},
    selectChange(value) {
      console.log("aa:" + value);
      this.value = this.options[value].label;
      this.percentNum = this.options[value].num;
    },
    manageClick(index) {
      console.log(this.options[index].roomTypeName);
      this.$router.push({
        path: "/manageRoomSpaceDetail",
        query: {
          roomType: this.options[index].roomTypeName,
          roomTypeId: this.options[index].roomTypeId,
        },
      });
    },
    //设置房间
    addRoom() {
      this.dialogVisible = true;
    },
    //设置新的房间类型
    setNewRoomType() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/room/insertRoomType?bedCount="+
            this.bedCount+"&roomTypeName="+ this.roomTypeName+"&sanId="+this.sanId+
            "&sanInfoId="+this.sanInfoId+"&singleMonthlyPrice=" +
            this.singleMonthlyPrice
        )
        .then((response) => {
          console.log(response.data);
          alert("添加成功！")
          this.reload();
        })
        .catch((res) => {
          console.log(res);
        });
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    animationFinished() {},

    //获取当前房间类型列表
    getRoomTypeList() {
      this.$ajax
        .get(
          "https://www.tangyihan.top/web/room/getRoomTypeList?sanInfoId=" +
            this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.options = response.data.data
        })
        .catch((res) => {
          console.log(res);
        });
    }
  },
  created() {},
  mounted() {
    this.nowUserName = localStorage.getItem("userName");
    this.sanInfoId = localStorage.getItem("sanInfoId");
    this.sanId = localStorage.getItem("sanId");

    this.getRoomTypeList();
  },
};
</script>

<style lang="less" scoped>
#manageRoomSpace {
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
    .manage {
      width: 95%;
      height: 110px;
      background: white;
      margin: 25px auto;
      border-radius: 10px;
      box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
      padding-top: 1px;

      .typeChoose {
        width: 100%;
        height: 45px;
        margin-top: 28px;
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

      .managePic {
        width: 100%;
        height: 450px;
        display: flex;
        margin-top: 75px;
        // background: white;
        .managePic1 {
          width: 32%;
          height: 100%;
          background: white;
          margin-right: 25px;
          border-radius: 10px;
          box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
          padding-top: 3px;
          display: flex;
          flex-direction: column;
          label {
            font-weight: 600;
            font-size: 16px;
            text-align: left;
            margin: 20px;
          }
          .selectPic {
            margin: 30px auto;
          }
          .manageRadial {
            margin: 0px auto;
          }
          .manageClick {
            width: 90px;
            background: #63cda5;
            border: 1px solid #63cda5;
            height: 35px;
            margin: 20px auto;
            text-align: center;
            color: white;
            font-size: 14px;
            margin-top: 20px;
          }
        }

        .managePic2 {
          width: 67%;
          height: 100%;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
          padding-top: 3px;
          display: flex;
          flex-direction: column;
          label {
            text-align: left;
            margin: 20px;
            .label1 {
              font-weight: 600;
              font-size: 16px;
            }
          }

          .maintable {
            width: 95%;
            margin: 20px auto;
          }
          .mainpagination {
            margin-top: 20px;
            margin-bottom: 20px;
            margin-left: 140px;
            width: 50%;
          }
        }
      }
    }
  }
}
</style>