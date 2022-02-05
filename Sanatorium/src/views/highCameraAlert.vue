<template>
  <div id="highCameraAlert">
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
            >核心信息管理 /
            <label style="color: #63cda5">摄像头警报信息</label></label
          >
        </div>

        <div class="manage">
          <div class="buttonList">
            <!--选择地区-->
            <v-distpicker class="picker" @selected="selected"></v-distpicker>

            <!--选择处理状态-->
            <el-select
              v-model="cameraValue"
              placeholder="选择处理状态"
              style="margin-left: 30px"
            >
              <el-option
                v-for="item in cameraOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button
              style="
                width: 5%;
                background: #63cda5;
                border: 1px solid #63cda5;
                margin-left: 50px;
                margin-top: 3px;
                height: 35px;
              "
              type="primary"
              size="mini"
              >筛选</el-button
            >
          </div>
        </div>

        <!--图表-->
        <div class="graphList">
          <div class="maincontentleft">
            <el-table class="maintable" :data="tableData">
              <el-table-column type="index" label="编号" width="50">
              </el-table-column>
              <el-table-column prop="type" label="报警类型" width="110">
              </el-table-column>
              <el-table-column prop="time" label="报警时间" width="150">
              </el-table-column>
              <el-table-column prop="deal" label="默认处理" width="150">
              </el-table-column>
              <el-table-column prop="ifDeal" label="是否处理及时" width="110">
              </el-table-column>
              <el-table-column prop="actualDeal" label="实际处理" width="80">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >删除</el-button
                  >
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
          <!--图表-->
          <div class="maincontentright">
            <!--设备概况-->
            <div id="pie1">
              <div id="main1" style="width: 100%; height: 245px"></div>
            </div>

            <!--设备使用情况图-->
            <div id="pie2" style="margin-top: 15px">
              <div id="main2" style="width: 100%; height: 235px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "../components/NavMenu.vue";
import vDistpicker from "v-distpicker";
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "highCameraAlert",
  components: {
    NavMenu: NavMenu,
    vDistpicker,
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
          type: "户外摔倒",
          time: "2021-11-29 09:26",
          deal: "就近呼救",
          ifDeal: "是",
          actualDeal: "",
        },
        {
          type: "户外摔倒",
          time: "2021-11-29 10:34",
          deal: "就近呼救",
          ifDeal: "是",
          actualDeal: "",
        },
        {
          type: "室内摔倒",
          time: "2021-11-29 09:49",
          deal: "就近呼救+护工救助",
          ifDeal: "是",
          actualDeal: "",
        },
        {
          type: "生命体征微弱",
          time: "2021-11-29 16:38",
          deal: "拨打120,发送报警",
          ifDeal: "是",
          actualDeal: "",
        },
        {
          type: "户外摔倒",
          time: "2021-11-29 16:45",
          deal: "就近呼救",
          ifDeal: "是",
          actualDeal: "",
        },
        {
          type: "户外摔倒",
          time: "2021-11-29 17:26",
          deal: "就近呼救",
          ifDeal: "否",
          actualDeal: "",
        },
      ],
      cameraOptions: [
        {
          value: "选项1",
          label: "待使用",
        },
        {
          value: "选项2",
          label: "工作中",
        },
        {
          value: "选项3",
          label: "待修理",
        },
        {
          value: "选项4",
          label: "已损坏",
        },
      ],
      cameraValue: "",
      value1: "",
      area: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main1"));
      var myChart2 = echarts.init(document.getElementById("main2"));
      // 绘制图表1
      myChart.setOption({
        title: {
          text: "今日警报", //主标题
          padding: [10, 0, 0, 0],
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
          data: ["已处理", "未处理"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "60%"],
            data: [
              { value: 9, name: "已处理" },
              { value: 1, name: "未处理" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            bottom: 30,
          },
        ],
      });
      //绘制图表2
      myChart2.setOption({
        title: {
          text: "报警状态图", //主标题
          padding: [10, 0, 0, 0],
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
          right: "15%",
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
          name: "时间",
          type: "category",
          data: ["11-27", "11-28", "11-29"],
        },
        yAxis: {
          name: "设备数量/个",
          type: "value",
          min: 0, // 设置y轴刻度的最小值
          max: 1000, // 设置y轴刻度的最大值
          splitNumber: 6, // 设置y轴刻度间隔个数
        },
        series: [
          {
            data: [567, 320, 612],
            type: "bar",
          },
        ],
      });
    },
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    //选择地区
    selected(data) {
      this.area = data.province.value + data.city.value + data.area.value;
    },
  },
  created() {},
  mounted() {
    this.initData();

    //显示当前日期时间
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style lang="less" scoped>
#highCameraAlert {
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
      height: 70px;
      background: white;
      margin: 25px auto;
      // border-radius: 10px;
      // box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
      padding-top: 1px;
      .buttonList {
        margin-top: 15px;
        margin-left: 35px;
        display: flex;
      }
    }

    .graphList {
      width: 95%;
      height: 510px;
      margin: 0px auto;
      display: flex;
      .maincontentleft {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
        background: white;
        width: 72%;
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
          margin-left: 420px;
          width: 50%;
        }
      }

      .maincontentright {
        display: flex;
        flex-direction: column;
        background: white;
        width: 25%;
        height: 490px;
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