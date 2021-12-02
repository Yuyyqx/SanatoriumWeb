<template>
  <div id="highManageUser">
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
            >基础信息管理 / 
            <label style="color: #63cda5">管理用户</label></label
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
                <el-select v-model="select" slot="prepend" placeholder="用户角色">
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
          </div>
        </div>

        <!--管理用户-->
        <div class="maincontent">
          <el-table class="maintable" :data="tableData">
            <el-table-column type="index" label="编号" width="80">
            </el-table-column>
            <el-table-column prop="name" label="用户姓名" width="140">
            </el-table-column>
            <el-table-column prop="sex" label="用户性别" width="100">
            </el-table-column>
            <el-table-column prop="account" label="用户账号" width="180">
            </el-table-column>
            <el-table-column prop="role" label="用户角色" width="140">
            </el-table-column>
            <el-table-column prop="sun" label="所属疗养院" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="140">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div style="margin-bottom: 5px">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)"
                    >禁用</el-button
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
  name: "highManageUser",
  components: {
    NavMenu: NavMenu,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
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
      tableData: [
        {
          name: "罗美珍",
          sex: '女',
          account: "2211315784",
          role: '护工',
          sun: '仁和康复敬老院',
          createTime: '2020-12-17'
        },
        {
          name: "陈向阳",
          sex: '女',
          account: "2211315785",
          role: '护工',
          sun: '新生活敬老院',
          createTime: '2020-12-17'
        },
        {
          name: "李曼",
          sex: '女',
          account: "19858103789",
          role: '家属',
          sun: '',
          createTime: '2020-12-20'
        },
        {
          name: "王建国",
          sex: '男',
          account: "17858002157",
          role: '家属',
          sun: '',
          createTime: '2020-12-20'
        },
        {
          name: "钱玉",
          sex: '女',
          account: "17858042187",
          role: '家属',
          sun: '',
          createTime: '2020-12-20'
        },
      ],
      type: "",
      dialogVisible: false,
      infoName: "",
      infoAccount: "",
      infoCard: "33032719851201****",
      infoDate: "1985-12-01",
      dialogVisible1: false,
    };
  },
  methods: {
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

<style lang="less">
#highManageUser {
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