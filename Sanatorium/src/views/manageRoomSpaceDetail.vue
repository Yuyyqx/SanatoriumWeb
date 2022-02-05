<template>
  <div id="manageRoomSpaceDetail">
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
              >新增房间</el-button
            >
            <el-button
              style="
                width: 10%;
                background: #63cda5;
                border: 1px solid #63cda5;
                margin-left: 30px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >切换房间类型</el-button
            >
          </div>
          <!--图表-->
          <div class="managePic">
            <div class="managePic2">
              <label
                ><label class="label1">房间查询 / </label
                ><label style="color: #63cda5; margin-left: -20px">{{
                  roomType
                }}</label></label
              >
              <!-- <el-button
                style="
                  width: 10%;
                  background: #63cda5;
                  border: 1px solid #63cda5;
                  margin-left: 690px;
                "
                type="primary"
                size="mini"
                >新增房间</el-button
              > -->
              <el-table class="maintable" :data="tableData" 
              :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign:'center'}">
                <el-table-column type="index" label="编号" width="80">
                </el-table-column>
                <el-table-column prop="building" label="楼号" width="180">
                </el-table-column>
                <el-table-column prop="roomNumber" label="房间号码" width="180">
                </el-table-column>
                <el-table-column prop="usedBed" label="已用床位" width="160">
                </el-table-column>
                <!-- <el-table-column prop="beds" label="床位数量" width="145">
                  <template slot-scope="scope">
                {{scope.row.beds.length}}
              </template>
                </el-table-column> -->
                <el-table-column prop="healthLevel" label="护助等级">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                      >编辑</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="clearRoom(scope.$index, scope.row)"
                      >清空</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button
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
      </div>
    </div>
    <!--新增房间-->
    <el-dialog
      title="新增房间"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <div style="display: flex">
          <label style="width: 110px">父级单位：</label>
          <el-input
            placeholder="请输入"
            v-model="roomType"
            :disabled="true"
            style="margin-left: 0px; width: 60%"
          >
          </el-input>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">房间号码：</label>
          <el-cascader
            ref="cascaderMallCatergory"
            v-model="roomNumber"
            :options="roomNumberOptions"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </div>
        <div style="display: flex; margin-top: 20px">
          <label style="width: 110px">护助等级：</label>
          <el-select v-model="grade" placeholder="请选择" @change="changeGradeValue">
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewRoom"
          >新 增</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import RadialIndicator from "../components/RadialIndicator.vue";
import NavMenu from "../components/NavMenu.vue";
export default {
  name: "manageRoomSpaceDetail",
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
          roomNum: "911",
          used: "1/1",
          grade: "大体健康",
          buildNum: "A",
          equipment: "优",
        },
        {
          roomNum: "912",
          used: "0/1",
          grade: "基本自理",
          buildNum: "A",
          equipment: "优",
        },
        {
          roomNum: "913",
          used: "0/1",
          grade: "丧失能力",
          buildNum: "A",
          equipment: "优",
        },
        {
          roomNum: "914",
          used: "0/1",
          grade: "丧失能力",
          buildNum: "A",
          equipment: "优",
        },
      ],
      value: "",
      percentNum: "33",
      dialogVisible: false,
      roomType: "",
      roomNumber: [],
      grade: "",
      roomNumberOptions: [
        {
          value: "1",
          label: "A楼",
          children: [
            {
              value: "11",
              label: "1",
              children: [
                {
                  value: "111",
                  label: "101",
                },
                {
                  value: "112",
                  label: "102",
                },
                {
                  value: "113",
                  label: "103",
                },
              ],
            },
            {
              value: "12",
              label: "2",
              children: [
                {
                  value: "121",
                  label: "201",
                },{
                  value: "122",
                  label: "202",
                },{
                  value: "123",
                  label: "203",
                },
              ],
            },
          ],
        },
        {
          value: "2",
          label: "B楼",
          children: [
            {
              value: "29",
              label: "9",
              children: [
                {
                  value: "291",
                  label: "901",
                },{
                  value: "292",
                  label: "902",
                },
                {
                  value: "293",
                  label: "903",
                },
                {
                  value: "2916",
                  label: "916",
                },
              ],
            },
          ],
        },
      ],
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
      total: 0,//分页共有多少条数据
      currentPage: 1, //当前页数
      pageSize: 4, //一页4条数据
      nowUserName: '', //当前登录用户
      roomTypeId: '',//当前房间号
      addBuilding: '',//添加楼号
      addFloor: '',//添加层数
      addRoomNumber: '',//添加房间号
      sanId: '',
      healthLevel: ''
    };
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
        this.getRoomList();
        console.log(this.currentPage)
        // this.reload();
      },
      //跨页编号连续
      table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
      },
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
    //新增房间
    addRoom() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //获取选择的楼号、层数以及房间号
    handleChange(value) {
      console.log(value);
      if (this.roomNumber.length != 0) {       
        let arr = this.$refs['cascaderMallCatergory'].getCheckedNodes()[0].pathLabels
        console.log('arr', arr);
        this.addBuilding = arr[0];
        this.addFloor = arr[1];
        this.addRoomNumber = arr[2];
      }
    },
    changeGradeValue() {
      this.healthLevel=this.gradeOptions.find(val=>val.value==this.grade).label
      console.log(this.healthLevel)
    },

    //获取当前房间类型的房间列表
    getRoomList() {
      this.$ajax
        .get(
          "https://www.tangyihan.top/web/room/getRoomList?current="+this.currentPage+"&roomTypeId="+this.roomTypeId+"&size=4"
        )
        .then((response) => {
          console.log(response.data);
          this.tableData = response.data.data.records
          this.total = response.data.data.total
          // sessionStorage.setItem("currentPage", this.currentPage);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //新增房间接口
    addNewRoom() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/room/insertRoom?building="+this.addBuilding+"&floor="+this.addFloor+
          "&healthLevel="+this.healthLevel+"&roomNumber="+this.addRoomNumber+"&roomTypeId="+this.roomTypeId+"&sanId="+this.sanId
        )
        .then((response) => {
          console.log(response.data);
          this.reload();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //删除房间接口
    handleDelete(index, row){
      console.log(index, row);
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/room/deleteRoom?roomId="+row.roomId+"&roomTypeId="+this.roomTypeId+"&sanId="+this.sanId
        )
        .then((response) => {
          console.log(response.data);
          this.reload();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //清空房间接口
    clearRoom(index, row) {
      console.log(index, row);
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/room/clearRoom?roomId="+row.roomId+"&roomTypeId="+this.roomTypeId+"&sanId="+this.sanId
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
  created() {
    this.roomType = this.$route.query.roomType;
    this.roomTypeId = this.$route.query.roomTypeId;
  },
  mounted() {
    this.nowUserName = sessionStorage.getItem("userName");
    this.sanId = sessionStorage.getItem("sanId");

    if (this.currentPage == 1) {
      this.getRoomList();
    }
  },
};
</script>

<style lang="less" scoped>
#manageRoomSpaceDetail {
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
        //       .choose {
        //           margin-left: -200px;
        //       }
        //     .el-dropdown-link {
        //     cursor: pointer;
        //     color: #333333;
        //   }
        //   .el-icon-arrow-down {
        //     font-size: 12px;
        //   }
        //   .demonstration {
        //     display: block;
        //     color: #8492a6;
        //     font-size: 14px;
        //     margin-bottom: 20px;
        //   }
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
        // background: white

        .managePic2 {
          width: 100%;
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
            margin-left: 650px;
            width: 50%;
          }
        }
      }
    }
  }
}
</style>