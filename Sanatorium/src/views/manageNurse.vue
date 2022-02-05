<template>
  <div id="manageNurse">
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
            >疗养管理 / 管理护工 /
            <label style="color: #63cda5">护工信息管理</label></label
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
                <el-select v-model="select" slot="prepend" placeholder="房间号">
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
              >Excel导入</el-button
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
              >清空护工</el-button
            >
          </div>
        </div>

        <!--管理护工-->
        <div class="maincontent">
          <el-table class="maintable" :data="tableData">
            <el-table-column type="index" label="编号" width="80">
            </el-table-column>
            <el-table-column prop="name" label="护工姓名" width="140">
            </el-table-column>
            <el-table-column prop="account" label="护工账号" width="180">
            </el-table-column>
            <el-table-column prop="room" label="房间号" width="140">
            </el-table-column>
            <el-table-column prop="bed" label="床位" width="140">
            </el-table-column>
            <el-table-column prop="oldname" label="老人姓名" width="140">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div style="margin-bottom: 5px">
                  <el-button
                    size="mini"
                    @click="infoClick(scope.$index, scope.row)"
                    >个人信息</el-button
                  >
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >查看任务</el-button
                  >
                  <el-button
                    size="mini"
                    @click="getOld(scope.$index, scope.row)"
                    >分配老人</el-button
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
      </div>
    </div>
    <!--查看个人信息-->
    <el-dialog
      title="个人信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <div style="display: flex">
          <label style="width: 110px">姓&nbsp;&nbsp;名：</label>
          <el-input
            placeholder=""
            v-model="infoName"
            disabled
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">账&nbsp;&nbsp;号：</label>
          <el-input
            placeholder=""
            v-model="infoAccount"
            disabled
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">身份证：</label>
          <el-input
            placeholder=""
            v-model="infoCard"
            disabled
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">出生年月：</label>
          <el-input
            placeholder=""
            v-model="infoDate"
            disabled
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!--分配的老人-->
    <el-dialog
      title="当前老人"
      :visible.sync="dialogVisible1"
      width="47%"
      :before-close="handleClose1"
    >
      <span>
        <div style="display: flex">
          <div class="oldInfoList" v-for="(item, index) in oldInfoList">
            <div class="oldInfoLeft">
              <img
                style="width: 26px; height: 26px; margin-top: 5px"
                src="../../static/images/a12.jpg"
              />
            </div>
            <div class="oldInfoRight">
              <label>姓名：{{ item.oldName }}</label>
              <label>性别：{{ item.oldSex }}</label>
              <label>房间：{{ item.room }}</label>
              <label>身份证：{{ item.oldCard }}</label>
              <el-button
                size="mini"
                type="danger"
                @click="cancelOld(index)"
                style="margin-top: 5px; margin-left: 110px; width: 30%"
                >解除</el-button
              >
            </div>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import NavMenu from "../components/NavMenu.vue";
export default {
  name: "manageNurse",
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
      tableData: [
        {
          name: "罗美珍",
          account: "2211315784",
          room: "A-9-110",
          bed: "1",
          oldname: "王小虎",
        },
        {
          name: "罗美珍",
          account: "2211315784",
          room: "A-9-110",
          bed: "2",
          oldname: "王建国",
        },
        {
          name: "陈向阳",
          account: "2211315785",
          room: "B-8-001",
          bed: "1",
          oldname: "李曼",
        },
        {
          name: "陈向阳",
          account: "2211315785",
          room: "B-8-001",
          bed: "2",
          oldname: "赵红",
        },
        {
          name: "陈向阳",
          account: "2211315785",
          room: "B-8-001",
          bed: "5",
          oldname: "钱玉",
        },
      ],
      type: "",
      dialogVisible: false,
      infoName: "",
      infoAccount: "",
      infoCard: "33032719851201****",
      infoDate: "1985-12-01",
      dialogVisible1: false,
      oldInfoList: [
        {
          oldName: "李曼",
          oldSex: "女",
          room: "B-8-001",
          oldCard: "33032219810709",
        },
        {
          oldName: "赵红",
          oldSex: "女",
          room: "B-8-001",
          oldCard: "33032219801101",
        },
        {
          oldName: "钱玉",
          oldSex: "女",
          room: "B-8-001",
          oldCard: "330322198107011",
        },
      ],
    };
  },
  methods: {
    //登录
    onSubmit() {
      console.log("username:" + this.form.username);
      console.log("password:" + this.form.password);
      //获取用户登录接口
      this.$ajax
        .get(
          "http://localhost:63342/test/controller/check_user.php?username=" +
            this.form.username +
            "&password=" +
            this.form.password
        )
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.resultCode == 200) {
            this.$router.push({
              path: "/index",
              query: {
                username: this.form.username,
                password: this.form.password,
              },
            });
            sessionStorage.setItem("userName", this.form.username);
            sessionStorage.setItem("userID", response.data.data[0].userid);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //登记入住
    checkIn() {
      this.$router.push({ path: "/checkIn" });
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //查看护工个人信息
    infoClick(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
      this.infoName = this.tableData[index].name;
      this.infoAccount = this.tableData[index].account;
    },
    //当前需要照料的老人信息
    getOld(index, row) {
      console.log(index, row);
      this.dialogVisible1 = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //与老人解除绑定关系
    cancelOld(index) {
      console.log(this.oldInfoList[index].oldName);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
#manageNurse {
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
      flex-direction: column;
      margin: 15px auto;
      background: white;
      width: 95%;
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
        margin-left: 670px;
        width: 50%;
      }
    }
  }
}
.oldInfoList {
  display: flex;
  width: 32%;
  height: 130px;
  border: 1px solid #84888f;
  margin-left: 5px;
  .oldInfoLeft {
    width: 20%;
    margin: 10px auto;
  }
  .oldInfoRight {
    width: 80%;
    margin: 13px auto;
    display: flex;
    flex-direction: column;
    text-align: left;
  }
}
</style>