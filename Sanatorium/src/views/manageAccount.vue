<template>
  <div id="manageAccount">
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
            >疗养管理 / <label style="color: #63cda5">管理账号</label></label
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
                  placeholder="导入方式"
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
              @click="addAccount"
              style="
                width: 7%;
                background: #63cda5;
                border: 1px solid #63cda5;
                margin-left: 120px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >新增账号</el-button
            >
            <el-upload
              ref="upload"
              :action="uploadExcel"
              :show-file-list="false"
              multiple
              :http-request="uploadImage"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-button
              style="
                background: #63cda5;
                border: 1px solid #63cda5;
                margin-left: 30px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >Excel导入</el-button
            >
            </el-upload>
          </div>
        </div>

        <!--管理账号-->
        <div class="maincontent">
          <el-table
            class="maintable"
            :data="tableData"
            style="width: 95%; margin: 20px auto"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            @row-click="rowClick" 
          >
            <el-table-column type="index" label="编号" width="80">
            </el-table-column>
            <el-table-column prop="sanEmail" label="账号邮箱" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="180">
            </el-table-column>
            <el-table-column prop="importWay" label="导入方式" width="140">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120">
              <template slot-scope="scope" style="whidth:100%;">{{scope.row.createTime | dateYMDHMSFormat}}</template>
            </el-table-column>
            <el-table-column prop="isTopManager" label="是否为最高管理员" width="160">
              <template slot-scope="scope">{{scope.row.isTopManager | isTopM}}</template>
            </el-table-column>
            <!-- <el-table-column prop="area" label="管理区域" width="120">
            </el-table-column> -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click.stop="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
                <el-button
                  size="mini"
                  @click.stop="handleDisable(scope.$index, scope.row)"
                  >{{scope.row.isDisable | isOpenFilter}}</el-button
                >
                <el-button
                  size="mini"
                  @click.stop="handleEdit(scope.$index, scope.row)"
                  >操作追溯</el-button
                >
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

    <!--新增账号-->
    <el-dialog
      title="新增账号"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <div style="display: flex">
          <label style="width: 110px">账号邮箱：</label>
          <el-input
            placeholder="请输入"
            v-model="email"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">账号密码：</label>
          <el-input
            placeholder=""
            v-model="password"
            :disabled="true"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">手机号码：</label>
          <el-input
            placeholder="请输入"
            v-model="amountPhone"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px; margin-left: 10px">
          <label style="width: 120px">是否禁用：</label>
          <el-switch
            v-model="isOpen"
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="width: 100%; margin-left: 0px"
            @change="isOpenClick"
          >
          </el-switch>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewAccount"
          >新 增</el-button
        >
      </span>
    </el-dialog>

    <!--修改账号-->
    <el-dialog
      title="修改账号"
      :visible.sync="dialogVisibleEdit"
      width="30%"
      :before-close="handleCloseEdit"
    >
      <span>
        <div style="display: flex">
          <label style="width: 110px">账号邮箱：</label>
          <el-input
            placeholder="请输入"
            v-model="editEmail"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">手机号码：</label>
          <el-input
            placeholder="请输入"
            v-model="editPhone"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editAccount"
          >更 新</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import NavMenu from "../components/NavMenu.vue";
export default {
  name: "manageAccount",
  components: {
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
      tableData: [],
      type: "",
      dialogVisible: false,
      email: "",
      password: "123456",
      amountPhone: '',
      isOpen: false,
      isOpenFlag: 0,
      total: 0,//分页共有多少条数据
      currentPage: 1, //当前页数
      pageSize: 6, //一页4条数据
      nowUserName: '', //当前登录用户
      sanId: '',
      sanInfoId: '',
      select: '',
      search: '',
      uploadExcel: 'https://www.tangyihan.top/web/sanatoriumUser/excelUploadSan',
      myHeaders:{'Access-Control-Allow-Origin':'*'},
      dialogVisibleEdit: false,
      editEmail: "",
      editPhone: '',
      updateSanId: ''
    };
  },
  filters: {
    isTopM: function (value) {
      if (value == 1) return '是'
      else
      return '否'
    },
    isOpenFilter: function (value) {
      if (value == 1) return '开启'
      else
      return '禁用'
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
        this.getAccountList();
        console.log(this.currentPage)
        // this.reload();
      },
      //跨页编号连续
      table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
      },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleCloseEdit(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //新增账号
    addAccount() {
      this.dialogVisible = true;
    },
    searchByKey() {},

    //获取当前疗养院管理账号列表
    getAccountList() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/sanatoriumUser/getAccountPage?current="+this.currentPage+"&sanId="+this.sanId+"&sanInfoId="+this.sanInfoId+"&size=6"
        )
        .then((response) => {
          console.log(response.data);
          this.tableData = response.data.data.records
          this.total = response.data.data.total
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //新增管理账号接口
    addNewAccount() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/sanatoriumUser/insertAccount?email="+this.email+"&isDisable="+this.isOpenFlag+
          "&phone="+this.amountPhone+"&sanId="+this.sanId+"&sanInfoId="+this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.reload();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //删除管理账号接口
    handleDelete(index, row) {
      console.log(index, row);
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/sanatoriumUser/delAccount?delSanId="+row.sanId+"&sanId="+this.sanId+
          "&sanInfoId="+this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.reload();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //监控禁用按钮状态
    isOpenClick(val) {
      if(val == false) {
        this.isOpenFlag = 0
      } else {
        this.isOpenFlag = 1
      }
      console.log(this.isOpenFlag)
    },
    //开启或禁用账号
    handleDisable(index, row) {
      console.log(index, row);
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/sanatoriumUser/banAccount?banSanId="+row.sanId+"&sanId="+this.sanId+
          "&sanInfoId="+this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.reload();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    // 上传excel方法
    uploadImage(param){
      const formData = new FormData()
      formData.append('file', param.file)
      this.$ajax
      .post("https://www.tangyihan.top/web/sanatoriumUser/excelUploadSan?sanId="+this.sanId+"&sanInfoId="+this.sanInfoId, formData).then(response => {
        console.log(response.data);
        this.reload();
      }).catch(response => {
        console.log('上传失败')
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
    },
    rowClick(row,column) {
      console.log(row,column)
      this.editEmail = row.sanEmail
      this.editPhone = row.phone
      this.updateSanId = row.sanId
      this.dialogVisibleEdit = true;
    },
    //修改账号接口
    editAccount() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/sanatoriumUser/updateMyAccount?email="+this.editEmail+
          "&phone="+this.editPhone+"&sanId="+this.sanId+"&sanInfoId="+this.sanInfoId+"&updateSanId="+this.updateSanId
        )
        .then((response) => {
          console.log(response.data);
          this.reload();
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

    this.getAccountList();
  },
};
</script>

<style lang="less" scoped>
#manageAccount {
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
      flex-direction: column;
      margin: 15px auto;
      background: white;
      width: 95%;
      height: 490px;
      .maintop {
        display: flex;
        flex-direction: row;
        width: 95%;
        margin: 30px auto;
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