<template>
  <div id="manageOld">
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
            >疗养管理 / <label style="color: #63cda5">管理老人</label></label
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
          </div>
        </div>

        <!--管理老人-->
        <div class="maincontent">
          <el-table
            class="maintable"
            :data="tableData"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column type="index" label="编号" width="60">
            </el-table-column>
            <el-table-column prop="oldName" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="oldInfo" label="性别" width="110">
              <template slot-scope="scope" style="whidth: 100%">{{
                scope.row.oldInfo.sex | filterSex
              }}</template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="110">
              <template slot-scope="scope" style="whidth: 100%">{{
                scope.row.oldInfo.age
              }}</template>
            </el-table-column>
            <el-table-column prop="baseHealth" label="入住类型" width="140">
            </el-table-column>
            <el-table-column prop="bed" label="入住房间" width="180">
              <template slot-scope="scope" style="whidth: 100%">{{
                scope.row.bed.b_f_r_b
              }}</template>
            </el-table-column>
            <el-table-column prop="nurse" label="护工联系" width="160">
              <template slot-scope="scope">
                <div style="display: flex; margin-left: 35px">
                  <img
                    style="
                      width: 26px;
                      height: 26px;
                      margin-left: -5px;
                      margin-right: 5px;
                    "
                    src="../../static/images/a12.jpg"
                  />
                  <div style="margin-top: 2px">
                    {{ scope.row.nurse.userInfo.userRealName }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div style="margin-bottom: 5px">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >恢复出院</el-button
                  >
                  <el-button
                    size="mini"
                    @click="handleGetInfo(scope.$index, scope.row)"
                    >个人信息</el-button
                  >
                </div>
                <div>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >注意事项</el-button
                  >
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >医疗备案</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="mainpagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!--个人信息-->
    <el-dialog
      title="个人信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <div style="display: flex">
          <label style="width: 110px; line-height: 40px">老人姓名：</label>
          <el-input
            placeholder=""
            disabled
            v-model="infoName"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px; line-height: 40px">老人性别：</label>
          <el-input
            placeholder=""
            disabled
            v-model="infoSex"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px; line-height: 40px">身份证号：</label>
          <el-input
            placeholder=""
            disabled
            v-model="infoCard"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px; line-height: 40px">家庭住址：</label>
          <el-input
            placeholder=""
            disabled
            v-model="infoAddress"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px; line-height: 40px">第一疗联人：</label>
          <el-input
            placeholder=""
            disabled
            v-model="infoFirstPhone"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px; line-height: 40px">其他疗联人：</label>
          <el-input
            placeholder=""
            disabled
            v-model="infoOtherPhones"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import NavMenu from "../components/NavMenu.vue";
export default {
  name: "manageOld",
  components: {
    NavMenu: NavMenu,
  },
  inject: ["reload"], //注入reload方法
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
      tableData: [],
      type: "",
      total: 0, //分页共有多少条数据
      currentPage: 1, //当前页数
      pageSize: 3, //一页3条数据
      search: "",
      select: "",
      nowUserName: "", //当前登录用户
      sanId: "",
      sanInfoId: "",
      dialogVisible: false, //是否显示个人信息
      infoName: "",
      infoSex: "",
      infoCard: "",
      infoAddress: "",
      infoFirstPhone: "",
      infoOtherPhones: "",
    };
  },
  filters: {
    filterSex: function (value) {
      if (value == 1) return "男";
      else return "女";
    },
  },
  methods: {
    //当前分页有多少条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //当前界面是分页的第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getOldList();
      console.log(this.currentPage);
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
    searchByKey() {},

    //获取当前疗养院老人列表
    getOldList() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/old/getOldPage?current=" +
            this.currentPage +
            "&sanId=" +
            this.sanId +
            "&sanInfoId=" +
            this.sanInfoId +
            "&size=3"
        )
        .then((response) => {
          console.log(response.data);
          this.tableData = response.data.data.records;
          this.total = response.data.data.total;
        })
        .catch((res) => {
          console.log(res);
        });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //获取个人信息接口
    handleGetInfo(index, row) {
      this.dialogVisible = true;
      console.log(index, row);
      this.infoName = row.oldName;
      if (row.oldInfo.sex == 0) {
        this.infoSex = "女";
      } else {
        this.infoSex = "男";
      }

      this.infoCard = row.oldCardId;
      this.infoAddress = row.oldInfo.address;
      this.infoFirstPhone = row.firstPhone;
      this.infoOtherPhones = row.otherPhones;
    },
  },
  created() {},
  mounted() {
    this.nowUserName = localStorage.getItem("userName");
    this.sanInfoId = localStorage.getItem("sanInfoId");
    this.sanId = localStorage.getItem("sanId");

    this.getOldList();
  },
};
</script>

<style lang="less" scoped>
#manageOld {
  display: flex;
  width: 100%;
  height: 100%;
  background: rgb(236, 241, 247);
}

.left {
  width: 15%;
  height: 750px;
  background: #435063;
  text-align: left;
  .exa {
    margin: 15px;
    margin-left: 20px;
    display: flex;
    #logo {
      width: 51px;
      height: 45px;
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
  .top {
    width: 100%;
    height: 4%;
    display: flex;
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
</style>