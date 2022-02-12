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
                margin-left: 120px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >Excel导入</el-button
            >
            </el-upload>
            <el-button
              @click="addOneNurse"
              style="
                width: 7%;
                background: #63cda5;
                border: 1px solid #63cda5;
                margin-left: 30px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >新增护工</el-button
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
          <el-table class="maintable" :data="tableData"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 95%;">
            <el-table-column type="index" label="编号" width="60">
            </el-table-column>
            <el-table-column prop="userInfo" label="护工姓名" width="140">
              <template slot-scope="scope" style="width:100%">
                {{scope.row.userInfo.userRealName}}
              </template>
            </el-table-column>
            <el-table-column prop="userPhone" label="手机号" width="160">
            </el-table-column>
            <el-table-column prop="nurseHealth" label="照顾健康等级" width="140" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="monthlySalary" label="基本月薪" width="130">
            </el-table-column>
            <el-table-column prop="importWay" label="导入方式" width="130">
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

    <!--新增护工-->
    <el-dialog
      title="新增护工"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      :before-close="handleCloseAdd"
    >
      <span>
        <div style="display: flex">
          <label style="width: 110px">真实姓名：</label>
          <el-input
            placeholder="请输入"
            v-model="addName"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">手机号码：</label>
          <el-input
            placeholder="请输入"
            v-model="addPhone"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">身份证类型：</label>
          <el-select v-model="cardType" placeholder="请选择" @change="changeCardValue">
            <el-option
              v-for="item in cardOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">身份证：</label>
          <el-input
            placeholder="请输入"
            v-model="addCard"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>  
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">基本月薪：</label>
          <el-input
            placeholder="如：3000"
            v-model="addMonthlySalary"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">升级薪资：</label>
          <el-input
            placeholder="每个照顾级别升级的薪资。如：300"
            v-model="addAdditionalSalary"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px;margin-left:13px;">健康等级：</label>
          <el-checkbox-group 
            v-model="checkedHealth"
            @change="healthChange"
            > 
          <el-checkbox v-for="item in healthList" :label="item" :key="item" style="margin-left:0px;">{{item}}</el-checkbox>
          </el-checkbox-group>
          <!-- <el-select v-model="grade" placeholder="请选择" @change="changeGradeValue">
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addNewNurse"
          >新 增</el-button
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
      total: 0,//分页共有多少条数据
      currentPage: 1, //当前页数
      pageSize: 5, //一页4条数据
      nowUserName: '', //当前登录用户
      sanId: '',
      search: '',
      select: '',
      sanInfoId: '',
      dialogVisibleAdd: false, //新增护工
      addName: '',
      addPhone: '',
      cardType: '',
      addCard: '',
      addMonthlySalary: '',
      addAdditionalSalary: '',
      grade: '',
      gradeOptions: [
        {
          value: "选项1",
          label: "大体健康",
        },
        {
          value: "选项2",
          label: "恢复健康",
        },
        {
          value: "选项3",
          label: "基本自理",
        },
        {
          value: "选项4",
          label: "丧失自理",
        },
      ],
      healthLevel: '',
      cardOptions: [
        {
          value: "选项1",
          label: "居民身份证",
        },
        {
          value: "选项2",
          label: "港澳居民来往内地通行证",
        },
        {
          value: "选项3",
          label: "台湾居民来往大陆通行证",
        },
        {
          value: "选项4",
          label: "临时身份证",
        },
        {
          value: "选项5",
          label: "护照",
        },
      ],
      addCardType: '',
      uploadExcel: 'https://www.tangyihan.top/web/nurse/excelUpload',
      myHeaders:{'Access-Control-Allow-Origin':'*'},
      checkedHealth: [],
      healthList: ['大体健康','恢复健康','基本自理','丧失自理'],
    };
  },
  methods: {
    checkIn() {},
    handleCurrentChange() {},
    searchByKey() {},
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
    handleCloseAdd(done) {
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

     //当前分页有多少条数据
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //当前界面是分页的第几页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getNurseList();
        console.log(this.currentPage)
        // this.reload();
      },
      //跨页编号连续
      table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
      },
    //获取当前疗养院护工列表
    getNurseList() {
      this.$ajax
        .get(
          "https://www.tangyihan.top/web/nurse/getNursePage?current="+this.currentPage+"&sanInfoId="+this.sanInfoId+"&size=5"
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
    //新增护工，单个导入
    addOneNurse() {
      this.dialogVisibleAdd = true;
    },
    //选择健康等级
    changeGradeValue() {
      this.healthLevel=this.gradeOptions.find(val=>val.value==this.grade).label
      console.log(this.healthLevel)
    },
    //选择护工身份证类型
    changeCardValue() {
      this.addCardType=this.cardOptions.find(val=>val.value==this.cardType).label
      console.log(this.addCardType)
    },
    //新增护工接口，单个导入
    addNewNurse() {
       this.$ajax
        .post(
          "https://www.tangyihan.top/web/nurse/insertNurseByHand?additionalSalary="+this.addAdditionalSalary+"&cardId="+this.addCard+
          "&cardType="+this.addCardType+"&importWay="+"单个导入"+"&monthlySalary="+this.addMonthlySalary+
          "&nurseHealth="+this.healthLevel+"&phone="+this.addPhone+"&realName="+this.addName+"&sanId="+this.sanId+"&sanInfoId="+this.sanInfoId
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
      .post("https://www.tangyihan.top/web/nurse/excelUpload?sanId="+this.sanId+"&sanInfoId="+this.sanInfoId, formData).then(response => {
        console.log(response.data);
        this.reload();
        // // this.form.picUrl = process.env.VUE_APP_BASE_API + response.imgUrl
        // this.businessPicture = response.data.data
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
    healthChange(val) {
      console.log(val)
      this.healthLevel = val.join('+');
      console.log(this.healthLevel);
    }
  },
  created() {},
  mounted() {
    this.nowUserName = localStorage.getItem("userName");
    this.sanInfoId = localStorage.getItem("sanInfoId");
    this.sanId = localStorage.getItem("sanId");

    this.getNurseList();
  },
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