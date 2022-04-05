<template>
  <div id="highSensitiveOperation">
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
        <div class="titleTip" style="margin-top: 15px; margin-left: 12px">
          <div class="titleLine"></div>
          <div style="padding-left: 10px">敏感操作日志</div>
        </div>

        <!--筛选-->
        <div class="chooseTabs">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="今天" name="first">
              <div class="tabcontent">
                <!--导航栏-->
                <div class="tabLeft">
                  <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                  >
                    <el-menu-item index="1">
                      <span slot="title"
                        >停用员工<label style="color: rgb(198, 199, 201)"
                          >(2)</label
                        ></span
                      >
                    </el-menu-item>
                    <el-menu-item index="2">
                      <span slot="title"
                        >修改主号信息<label style="color: rgb(198, 199, 201)"
                          >(2)</label
                        ></span
                      >
                    </el-menu-item>
                    <el-menu-item index="3">
                      <span slot="title"
                        >消息记录导出<label style="color: rgb(198, 199, 201)"
                          >(0)</label
                        ></span
                      >
                    </el-menu-item>
                    <el-menu-item index="4">
                      <span slot="title"
                        >管理权限变更<label style="color: rgb(198, 199, 201)"
                          >(0)</label
                        ></span
                      >
                    </el-menu-item>
                  </el-menu>
                </div>
                <!--表格-->
                <div class="tabRight">
                  <el-table class="maintable" :data="tableData">
                    <el-table-column
                      prop="staff"
                      label="被停用的员工"
                      width="200"
                    >
                      <template slot-scope="scope">
                        <div style="display: flex; margin-left: 35px">
                          <img
                            style="
                              width: 35px;
                              height: 35px;
                              margin-left: -5px;
                              margin-right: 5px;
                            "
                            src="../../static/images/a12.jpg"
                          />
                          <div style="margin-top: 0px">
                            {{ scope.row.staff }}
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="state" label="状态" width="200">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作者" width="200">
                    </el-table-column>
                    <el-table-column prop="date" label="操作时间">
                    </el-table-column>
                  </el-table>
                  <div class="tabRightBottom">
                    <div>
                      共 4 项，每页显示<label style="color: rgb(75, 73, 148)">
                        5
                      </label>
                    </div>
                    <el-pagination
                      class="mainpagination"
                      background
                      layout="prev, pager, next"
                      :total="1"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="昨天" name="second"></el-tab-pane>
            <el-tab-pane label="最近7天" name="third"></el-tab-pane>
            <el-tab-pane label="最近30天" name="fourth"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "../components/NavMenu.vue";
export default {
  name: "highSensitiveOperation",
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
            },
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
                value: "/highSensitiveOperation",
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
      activeName: "first",
      tableData: [
        {
          staff: "杨立达",
          state: "已停用",
          operate: "高级管理员",
          date: "2021-11-30 15:38",
        },
        {
          staff: "周瑶",
          state: "已停用",
          operate: "高级管理员",
          date: "2021-11-30 15:38",
        },
        {
          staff: "张翰文",
          state: "已停用",
          operate: "高级管理员",
          date: "2021-11-30 15:38",
        },
        {
          staff: "陈梦琪",
          state: "已停用",
          operate: "高级管理员",
          date: "2021-11-30 15:38",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose() {},
    handleOpen() {},
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
#highSensitiveOperation {
  display: flex;
  // justify-content: center;
  // align-content: center;
  width: 100%;
  height: 100%;
  //   background: rgb(236, 241, 247);
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
    .chooseTabs {
      margin-top: 30px;
      background: white;
      width: 95%;
      height: 490px;
      margin: 15px auto;
      .tabcontent {
        display: flex;
        width: 100%;
        height: 100%;
        .tabLeft {
          width: 20%;
          height: 100%;
        }
        .tabRight {
          width: 76%;
          height: 100%;
          display: flex;
          flex-direction: column;
          margin: 15px auto;
          .maintable {
            width: 95%;
            margin: 0px auto;
          }
          .tabRightBottom {
            display: flex;
            margin-top: 15px;
            margin-left: 50px;
            .mainpagination {
              margin-left: 580px;
              width: 5%;
            }
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
  padding: 10px 20px;
  .titleLine {
    width: 7px;
    height: 20px;
    background: rgb(36, 114, 200);
  }
}
</style>