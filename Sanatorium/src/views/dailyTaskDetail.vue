<template>
  <div id="dailyTaskDetail">
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
            >每日任务 / 日常任务 /
            <label style="color: #63cda5">查看任务</label></label
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
              @click="drawer = true"
              >筛选任务</el-button
            >
          </div>
          <!--图表-->
          <div class="managePic">
            <div class="managePic2">
              <label
                >查看任务 /
                <label style="color: #63cda5">{{ taskName }}</label></label
              >
              <el-scrollbar class="conscorll">
                <el-table class="maintable" :data="tableData">
                  <el-table-column type="index" label="编号" width="70">
                  </el-table-column>
                  <el-table-column
                    prop="assignNurse"
                    label="指派护工"
                    width="140"
                  >
                  </el-table-column>
                  <el-table-column prop="oldName" label="照顾对象" width="140">
                  </el-table-column>
                  <el-table-column
                    prop="finishStatus"
                    label="完成状态"
                    width="140"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="sendStatus"
                    label="发布状态"
                    width="140"
                  >
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >提醒护工</el-button
                      >
                      <!-- <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button
                    > -->
                      <!-- <el-button
                      size="mini"
                      @click="handleDelete(scope.$index, scope.row)"
                      >查看</el-button
                    > -->
                    </template>
                  </el-table-column>
                </el-table>
              </el-scrollbar>
              <el-pagination
                class="mainpagination"
                background
                layout="prev, pager, next"
                :total="1000"
              >
              </el-pagination>
            </div>
            <!--右边图表-->
            <div class="managePic3">
              <!--完成柱状图-->
              <div class="managePic3Top">
                <div id="pie1">
                  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
                  <div id="main1" style="width: 100%; height: 200px"></div>
                </div>
              </div>
              <!--整体护工完成度-->
              <div class="managePic3Bottom">
                <div id="pie2">
                  <div id="main2" style="width: 100%; height: 200px"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--筛选任务-->
    <el-drawer
      title="筛选任务"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <span>
        <div class="contype">
          <label style="width: 100px"
            ><label style="color: red"></label>完成状态：</label
          >
          <el-select
            v-model="statusType"
            placeholder="请选择"
            style="width: 60%"
          >
            <el-option
              v-for="item in statusTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="orderMeal">
          <div class="contype" style="margin-left: -55px; margin-top: 30px">
            <label style="width: 150px"
              ><label style="color: red"></label>完成时间：</label
            >
            <el-time-select
              v-model="timeFinishValue"
              :picker-options="{
                start: '01:00',
                step: '01:00',
                end: '24:00',
              }"
              placeholder="选择时间"
            >
            </el-time-select>
          </div>
        </div>
        <div class="contype" style="display: flex">
          <label
            style="
              width: 130px;
              margin-left: 48px;
              margin-top: 35px;
              margin-bottom: 10px;
            "
            ><label style="color: red"></label>发布言论：</label
          >
          <el-switch
            v-model="isExpression"
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="width: 100%; margin-left: 30px; margin-top: 35px"
          >
          </el-switch>
        </div>
        <div class="contype">
          <label style="width: 95px; line-height: 40px; margin-left: -50px"
            ><label style="color: red"></label>指派对象：</label
          >
          <el-radio v-model="radio" label="1" style="margin-top: 12px"
            >全体护工</el-radio
          >
          <el-radio v-model="radio" label="2" style="margin-top: 12px"
            >按区分配</el-radio
          >
          <div style="margin-bottom: 20px">
            <el-radio v-model="radio" label="3" style="margin-top: 12px"
              >按级分配</el-radio
            >
            <el-radio v-model="radio" label="4" style="margin-top: 12px"
              >单人分配</el-radio
            >
          </div>
        </div>
        <!--按区分配-->
        <div class="contype" v-if="radio == 2">
          <label style="width: 100px"
            ><label style="color: red"></label>选择区域：</label
          >
          <el-cascader
            v-model="roomNumber"
            :options="roomNumberOptions"
            @change="handleChangeRoom"
            style="width: 60%"
          ></el-cascader>
        </div>
        <!--按级分配-->
        <div class="contype" v-if="radio == 3">
          <label style="width: 100px"
            ><label style="color: red"></label>选择等级：</label
          >
          <el-select
            v-model="gradeValue"
            placeholder="请选择"
            style="width: 60%"
          >
            <el-option
              v-for="item in gradeValueOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!--单人分配-->
        <div class="contype" v-if="radio == 4">
          <label style="width: 100px"
            ><label style="color: red"></label>输入姓名：</label
          >
          <el-autocomplete
            v-model="selectNurse"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          >
            <el-button slot="append" @click="addNurse">添加</el-button>
          </el-autocomplete>
        </div>
        <div class="attention" v-if="radio == 4">
          <div class="attention1" style="width: 53%; margin-left: 105px">
            <div>已选择的护工</div>
            <div>
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleCloseTag(tag)"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </div>
        <el-row style="margin-left: 200px; margin-top: 70px">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="chooseClick">筛选</el-button>
        </el-row>
      </span>
    </el-drawer>
  </div>
</template>
<script>
import RadialIndicator from "../components/RadialIndicator.vue";
import NavMenu from "../components/NavMenu.vue";
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "dailyTaskDetail",
  components: {
    RadialIndicator: RadialIndicator,
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
      array: ["全部", "单人间", "三人间", "五人间"],
      search: "",
      index: 0,
      select: "全部",
      tableData: [
        {
          assignNurse: "罗美珍",
          oldName: "王小虎",
          finishStatus: "未完成",
          sendStatus: "暂无",
        },
        {
          assignNurse: "陈向阳",
          oldName: "李曼",
          finishStatus: "已完成",
          sendStatus: "暂无",
        },
        {
          assignNurse: "陈向阳",
          oldName: "赵红",
          finishStatus: "已完成",
          sendStatus: "暂无",
        },
        {
          assignNurse: "陈向阳",
          oldName: "李曼",
          finishStatus: "未完成",
          sendStatus: "暂无",
        },
      ],
      roomNumber: "",
      roomNumberOptions: [
        {
          value: "1",
          label: "A楼",
          children: [
            {
              value: "2",
              label: "1层",
              children: [
                {
                  value: "3",
                  label: "101室",
                },
                {
                  value: "4",
                  label: "102室",
                },
                {
                  value: "5",
                  label: "103室",
                },
              ],
            },
            {
              value: "6",
              label: "2层",
              children: [
                {
                  value: "7",
                  label: "201室",
                },
              ],
            },
          ],
        },
        {
          value: "8",
          label: "B楼",
          children: [
            {
              value: "9",
              label: "9层",
              children: [
                {
                  value: "10",
                  label: "901室",
                },
              ],
            },
          ],
        },
      ],
      gradeValueOptions: [
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
      gradeValue: "",
      statusTypeOptions: [
        {
          value: "选项1",
          label: "未完成",
        },
        {
          value: "选项2",
          label: "已完成",
        },
      ],
      statusType: "",
      taskName: "",
      drawer: false,
      timeFinishValue: "",
      isExpression: false,
      selectNurse: "",
      nurseList: [],
      timeout: null,
      dynamicTags: [],
      radio: "1",
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleChange(value) {
      console.log(value);
    },
    //取消
    cancelClick() {
      this.drawer = false;
    },
    //筛选
    chooseClick() {
      this.drawer = false;
    },
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main1"));
      var myChart2 = echarts.init(document.getElementById("main2"));
      // 绘制图表1
      myChart.setOption({
        title: {
          text: "任务完成分布图", //主标题
          textStyle: {
            fontSize: 16,
          },
          subtext: "", //副标题
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let arr = params[2].value.split(",");
            for (let i in arr) {
              str += arr[i] + "<br/>";
            }
            return str;
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "14%", // 调整 legend 和图表的间距
          containLabel: true,
        },
        legend: {
          //图例
          textStyle: {
            color: "#000",
          },
          x: "right", // 可设定图例在左、右、居中
          y: "bottom",
          //   data: ['测试1', '测试2'], // 菜单数据
          selectedMode: false, //图例不可点击
        },
        xAxis: {
          type: "category",
          data: ["10:00", "12:00", "2:00", "4:00", "6:00"],
        },
        yAxis: { type: "value" },
        series: [
          {
            data: [2, 5, 3, 1, 0],
            type: "bar",
          },
        ],
      });
      // 绘制图表2
      myChart2.setOption({
        title: {
          text: "整体护工完成度", //主标题
          textStyle: {
            fontSize: 16,
          },
          subtext: "", //副标题
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: ["已完成", "未完成"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            // center: ["50%", "60%"],
            data: [
              { value: 11, name: "已完成" },
              { value: 9, name: "未完成" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    loadAll() {
      return [
        { value: "nurse1" },
        { value: "nurse2" },
        { value: "nurse13" },
        { value: "nurse14" },
        { value: "nurse15" },
        { value: "nurse22" },
        { value: "nurse7" },
      ];
    },
    querySearchAsync(queryString, cb) {
      var nurseList = this.nurseList;
      var results = queryString
        ? nurseList.filter(this.createStateFilter(queryString))
        : nurseList;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (selectNurse) => {
        return (
          selectNurse.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    //单人分配
    addNurse() {
      this.dynamicTags.push(this.selectNurse);
      console.log(this.dynamicTags);
    },
  },
  created() {
    this.taskName = this.$route.query.taskName;
  },
  mounted() {
    this.initData();
    this.nurseList = this.loadAll();
  },
};
</script>

<style lang="less" scoped>
#dailyTaskDetail {
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
        // background: white

        .managePic2 {
          width: 65%;
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
            font-weight: 600;
            .label1 {
              font-weight: 600;
              font-size: 16px;
            }
          }
          .conscorll {
            overflow-y: hidden;
            width: 100%;
            display: flex;
            flex-direction: column;
            //   height: 420px;
          }
          .maintable {
            width: 95%;
            margin: 20px auto;
          }
          .mainpagination {
            margin-top: 20px;
            margin-bottom: 20px;
            margin-left: 360px;
            width: 50%;
          }
        }

        .managePic3 {
          width: 33%;
          height: 100%;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          .managePic3Top {
            width: 100%;
            height: 48%;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
            padding-top: 3px;
            display: flex;
            flex-direction: column;
            padding-top: 5px;
          }
          .managePic3Bottom {
            margin-top: 20px;
            width: 100%;
            height: 48%;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
            padding-top: 3px;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
}
.attention {
  display: flex;
  width: 100%;
  padding: 10px 10px 10px 30px;
  .attention1 {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 140px;
    box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
    margin-right: 30px;
    padding: 10px;
    .el-tag + .el-tag {
      margin-left: 10px;
      margin-top: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
      margin-top: 10px;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
}
</style>