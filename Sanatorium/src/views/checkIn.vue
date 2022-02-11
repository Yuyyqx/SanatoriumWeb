<template>
  <div id="checkIn">
      <div class="mantip">
          <div class="maintop">
            <el-steps
              :active="active"
              finish-status="success"
              align-center
              style="margin-left: 0px"
            >
              <el-step title="信息验证" style="width: 550px"></el-step>
              <el-step title="登记房间"></el-step>
              <el-step title="预约护工"></el-step>
              <el-step title="个人信息"></el-step>
              <el-step title="注意事项"></el-step>
              <el-step title="医疗备案"></el-step>
              <el-step title="欢迎入住"></el-step>
            </el-steps>
          </div>
          </div>
        <!--登记入住-->
        <div class="maincontent">
          <!--信息验证-->
          <div class="con" v-if="active == 0">
            <div class="contitle">信息验证</div>
            <div class="conline"></div>
            <div class="coninput">
              <label style="color: red">*</label>家属账号：
              <el-input placeholder="请输入" v-model="familyAmmount" style="width:60%;"> </el-input>
            </div>
            <div class="coninput">
              <label style="color: red">*</label>家属验证：
              <el-input placeholder="请输入" v-model="familyCode" style="width:60%;"> </el-input>
            </div>
            <div class="coninput">
              <label style="color: red">*</label>老人登记：
              <el-select v-model="chooseOldValue" placeholder="请选择" @focus="getOldListFamily" @change="changeOldInfoValue">
                <el-option
                  v-for="item in options"
                  :key="item.oldId"
                  :label="item.oldName"
                  :value="item.oldId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <!--登记房间-->
          <div class="con1" v-if="active == 1">
             <div class="contitle">登记房间</div>
            <div class="conline"></div>
            <el-scrollbar class="conscorll">
              <div class="contype">
                <label style="width: 100px"
                  ><label style="color: red">*</label>护理等级：</label
                >
                <el-select
                  v-model="grade"
                  placeholder="请选择"
                  style="width: 60%;"
                  @change="changeGradeValue"
                >
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="conprice">
                <div>
                  价格列表
                </div>
                <div v-for="(item, index) in priceType">
                  <label class="conpricelabel"
                    >{{ item.roomTypeName }}——剩余房间数量 {{item.allBed-item.usedBed}}——价格{{
                      item.singleMonthlyPrice
                    }}/月</label
                  >
                </div>
              </div>
              <div class="contype" >
                <label style="width: 100px"
                  ><label style="color: red">*</label>房间类型：</label
                >
                <el-select
                  v-model="valueRoom"
                  placeholder="请选择"
                  style="width: 60%;"
                  @change="handleChangeRoom"
                >
                  <el-option
                    v-for="item in priceType"
                    :key="item.roomTypeId"
                    :label="item.roomTypeName"
                    :value="item.roomTypeId"
                  >
                  </el-option>
                </el-select>
              </div>
              <div style="margin-top: 5px; margin-left: -40px">
                  <label style="width: 100px; color: red; font-size: 12px"
                    >注：默认或不选则房间类型不限</label
                  >
                </div>
              <div class="contype" >
                <label style="width: 100px"
                  ><label style="color: red">*</label>选择床位：</label
                >
                <el-cascader
            ref="cascaderMallCatergory"
            v-model="roomNumber"
            :options="roomNumberOptions"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
              </div>
              <div class="contype" v-if="bedMoneyFlag" style="margin-left:-5px;">
                <label style="width: 110px;line-height: 40px;"
                  ><label style="color: red">*</label>床位费用：</label
                >
                <el-input
                  placeholder="请输入"
                  v-model="bedMoney"
                  :disabled="true"
                  style="width:60%;"
                >
                </el-input>
              </div>
              <div class="orderMeal">
                <div class="contype">
                  <label style="width: 220px"
                    ><label style="color: red">*</label>是否在疗养院订餐：</label
                  >
                  <el-switch
                    v-model="orderMealSan"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    style="width: 100%;"
                    @change="orderMealSanChange"
                  >
                  </el-switch>
                </div>
                <div style="margin-top: 5px; margin-left: -40px">
                  <label style="width: 100px; color: red; font-size: 12px"
                    >注：确定统一订餐是否需要备注事项</label
                  >
                </div>
              </div>
              <div class="orderMeal" v-if="orderMealFlag != 0">
                <div class="contype">
                  <label style="width: 190px"
                    ><label style="color: red">*</label>是否自定义套餐：</label
                  >
                  <el-switch
                    v-model="orderMealMy"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    style="width: 100%;"
                    @change="orderMealMyChange"
                  >
                  </el-switch>
                </div>
              </div>
              <div class="orderMeal">
                <div class="contype">
                  <label style="width: 90px"
                    ><label style="color: red">*</label>收费推送：</label
                  >
                  <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    style="width: 60%;"
                  >
                  </el-switch>
                  <label
                    style="color: red; font-size: 12px;margin-left:-220px;"
                    >（建议开启）</label
                  >
                </div> 
               </div>
            </el-scrollbar>
          </div>
          <!--预约护工-->
          <div class="con1" v-if="active == 2">
             <div class="contitle">预约护工</div>
            <div class="conline"></div>
            <el-scrollbar class="conscorll">
              <div class="contype">
                <label style="width: 100px;line-height:40px;"
                  ><label style="color: red">*</label>评估等级：</label
                >
                <el-select
                  v-model="gradeOld"
                  placeholder="请选择"
                  style="width: 60%;"
                  @change="changeGradeOldValue"
                >
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div style="margin-top:15px;">
                <el-table
    ref="multipleTable"
    :data="nurseData"
    tooltip-effect="dark"
    style="width: 85%;margin:0 auto;"
    @select="handleSelectionChange"
    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="userRealName"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="monthlySalary"
      label="工资/月"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
              </div>
            </el-scrollbar>
          </div>
          <!--个人信息-->
          <div class="con1" v-if="active == 3">
            <div class="contitle">个人信息</div>
            <div class="conline"></div>
            <el-scrollbar class="conscorll">
              <div class="contype">
                <label style="width: 110px;line-height: 40px;"
                  ><label style="color: red">*</label>老人姓名：</label
                >
                <el-input
                  placeholder="请输入"
                  v-model="oldName"
                  :disabled="true"
                  style="width:60%;"
                >
                </el-input>
              </div>
              <div class="contype">
                <label style="width: 110px;line-height: 40px;"
                  ><label style="color: red">*</label>老人身份证：</label
                >
                <el-input
                  placeholder="请输入"
                  v-model="oldCard"
                  :disabled="true"
                  style="width:60%;"
                >
                </el-input>
              </div>
              <div class="contype">
                <label style="width: 110px;line-height: 40px;"
                  ><label style="color: red">*</label>出生年月：</label
                >
                <el-input
                  placeholder="请输入"
                  v-model="oldDate"
                  :disabled="true"
                  style="width:60%;"
                >
                </el-input>
              </div>
              <div class="contype">
                <label style="width: 110px;line-height: 40px;"
                  ><label style="color: red">*</label>老人性别：</label
                >
                <el-radio v-model="radio" label="1" style="margin-top:12px;">男</el-radio>
                <el-radio v-model="radio" label="2" style="margin-top:12px;">女</el-radio>
              </div>
              <div class="contype">
                <label style="width: 110px;line-height: 40px;"
                  ><label style="color: red">*</label>第一联疗人：</label
                >
                <el-input
                  placeholder="请输入"
                  v-model="oldFirst"
                  style="width:60%;"
                >
                </el-input>
              </div>
              <div class="contype">
                <label style="width: 110px;line-height: 40px;"
                  ><label style="color: red">*</label>家庭住址：</label
                >
                <el-input
                  placeholder="请输入"
                  v-model="oldAddress"
                  style="width:60%;"
                >
                </el-input>
              </div>
            </el-scrollbar>
          </div>
          <!--注意事项-->
          <div class="con2" v-if="active == 4">
            <div class="contitle">注意事项</div>
            <div class="conline"></div>
            <el-scrollbar class="conscorll">
            <div class="attention">
              <label style="width: 110px"
                ><label style="color: red">*</label>饮食注意：</label
              >
              <div class="attention1" style="margin-right: 110px">
                <div>忌口</div>
                <div>
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    >+ New Tag</el-button
                  >
                </div>
              </div>
            </div>
            <div class="attention">
              <div class="attention1" style="width:53%;margin-left:90px;">
                <div>喜爱</div>
                <div>
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    >+ New Tag</el-button
                  >
                </div>
              </div>
            </div>
            <div class="attention" style="margin-top: 10px;margin-left:-15px;">
              <label style="width: 110px">身体注意：</label>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="如：体质疏松"
                v-model="textarea"
                style="width: 55%"
              >
              </el-input>
            </div>
            <div class="attention" style="margin-top: 10px;margin-left:-15px;">
              <label style="width: 110px">其他注意：</label>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入"
                v-model="textarea"
                style="width: 55%"
              >
              </el-input>
            </div>
            </el-scrollbar>
          </div>

          <div style="margin-top: 10px">
            <el-button
              style="margin-top: 12px; width: 180px;background: rgb(6,117,123);color:white;"
              @click="prev"
              v-if="active != 0"
              >上一步</el-button
            >
            <el-button
              style="margin-top: 12px; width: 180px;background: rgb(6,117,123);color:white;"
              @click="next"
              v-if="active != 6"
              >下一步</el-button
            >
            <el-button
              style="margin-top: 12px; width: 180px"
              @click="next"
              v-if="active == 6"
              >提交</el-button
            >
          </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkIn",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      activeIndex: "aa",
      type: "",
      active: 0,
      options: [
        {
          value: "选项1",
          label: "老人1",
        },
        {
          value: "选项2",
          label: "老人2",
        },
        {
          value: "选项3",
          label: "老人3",
        },
        {
          value: "选项4",
          label: "老人4",
        },
        {
          value: "选项5",
          label: "老人5",
        },
      ],
      value: "",
      options1: [
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
      value1: "",
      priceType: [],
      valueRoom: [],
      roomNumber: [],
      roomNumberOptions: [],
      oldName: "张三",
      oldCard: "330327200112012508",
      oldDate: "1980年12月11日",
      radio: "1",
      oldFirst: "13376815652",
      oldAddress: "xxxxxxxxxxxxx",
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      textarea: "",
      sanId: '',
      sanInfoId: '',
      familyAmmount: '',//家属账号
      familyCode: '',//家属验证码
      chooseOldValue: '',//选择的老人信息
      healthLevel: '',//入院类型
      grade: '',
      orderMealSan: true,//是否在疗养院订餐
      orderMealMy: false,//是否自定义套餐
      orderMealFlag: 1,
      roomTypeId: '不限',//房间类型默认不限
      bedId: '',//床位ID
      bedMoneyFlag: false,//是否显示床位费用
      bedMoney: '',
      isOrderMeal: 1,//是否订餐
      gradeOld: '',
      nurseData: [
        {
          nurseId: "3904867874",
          userRealName: '王小虎',
          monthlySalary: '3000'
        }
      ],//护工列表
      multipleSelection: [],
      firstConnectId: '',//老人第一联系人家属ID
      chooseNurseId: '',//选择的护工ID
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //下一步
    next() {
      if(this.active==2) {
        this.$ajax
        .post(
          "https://www.tangyihan.top/web/old/registerOld_3_next?baseHealth="+this.healthLevel+"&bedId="+this.bedId+
          "&familyOldId="+this.chooseOldValue+"&firstConnectId="+this.firstConnectId+"&isOrderMeal="+this.isOrderMeal+
          "&nurseId="+this.chooseNurseId+"&sanId="+this.sanId+"&sanInfoId="+this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.roomNumberOptions = response.data.data
        })
        .catch((res) => {
          console.log(res);
        });
      }
      if (this.active++ > 6) this.active = 0;
    },
    //上一步
    prev() {
      --this.active;
      if (this.active == 7) this.active = 0;
    },
    handleChangeRoom(value) {
      console.log(value);
      this.roomTypeId = value;
      //根据护理等级和房间类型返回房间列表（当选择房间类型时）
      if(this.grade!='') {
        this.$ajax
        .post(
          "https://www.tangyihan.top/web/old/registerOld_2_choose?healthLevel="+this.healthLevel+
          "&roomTypeId="+this.roomTypeId+"&sanId="+this.sanId+"&sanInfoId="+this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.roomNumberOptions = response.data.data
        })
        .catch((res) => {
          console.log(res);
        });
      }
    },
    //获取选择的楼号、层数、房间号以及床位
    handleChange(value) {
      console.log(value);
      this.bedId = value[3];
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/old/registerOld_2_pay?bedId="+this.bedId+"&sanId="+this.sanId
        )
        .then((response) => {
          console.log(response.data);
          this.bedMoney = response.data.data
          this.bedMoneyFlag = true
        })
        .catch((res) => {
          console.log(res);
        });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    //根据家长账号和验证码获取老人列表接口
    getOldListFamily() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/old/registerOld_1?code="+this.familyCode+"&sanId="+this.sanId+"&userAccount="+this.familyAmmount
        )
        .then((response) => {
          console.log(response.data);
          this.options = response.data.data.oldList
          this.firstConnectId = response.data.data.userId
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //获取房间类型价格的列表
    getRoomTypeMoneyList() {
      this.$ajax
        .post(
          "https://www.tangyihan.top/web/old/registerOld_2_date?sanId="+this.sanId+"&sanInfoId="+this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.priceType = response.data.data
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //选择老人
    changeOldInfoValue() {
      // this.healthLevel=this.options.find(val=>val.value==this.chooseOldValue).label
      console.log(this.chooseOldValue)
    },
    //根据入住类型返回对应房间接口
    changeGradeValue() {
      this.healthLevel=this.options1.find(val=>val.value==this.grade).label
      console.log(this.healthLevel)
      //根据护理等级和房间类型返回房间列表（当不选择房间类型时）
      if(this.roomTypeId=='不限') {
        this.$ajax
        .post(
          "https://www.tangyihan.top/web/old/registerOld_2_choose?healthLevel="+this.healthLevel+
          "&roomTypeId="+this.roomTypeId+"&sanId="+this.sanId+"&sanInfoId="+this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.roomNumberOptions = response.data.data
        })
        .catch((res) => {
          console.log(res);
        });
      }
    },
    //是否在疗养院订餐
    orderMealSanChange(val) {
      console.log(val)
      if (val==false) {
        this.isOrderMeal = 0
      }
    },
    //是否自定义套餐
    orderMealMyChange(val) {
      console.log(val)
      if(val==true&&this.isOrderMeal==1) {
        this.isOrderMeal = 2
      }
    },
    //根据老人健康评估等级返回护工列表接口
    changeGradeOldValue() {
      this.healthLevel=this.options1.find(val=>val.value==this.grade).label
      console.log(this.healthLevel)
      //根据护理等级和房间类型返回房间列表（当不选择房间类型时）
      if(this.roomTypeId=='不限') {
        this.$ajax
        .post(
          "https://www.tangyihan.top/web/old/registerOld_3_choose?healthLevel="+this.healthLevel+
          "&sanId="+this.sanId+"&sanInfoId="+this.sanInfoId
        )
        .then((response) => {
          console.log(response.data);
          this.nurseData = response.data.data
        })
        .catch((res) => {
          console.log(res);
        });
      }
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(selection,row) {
        this.multipleSelection = row;
        console.log(selection,row)
        this.chooseNurseId = row.nurseId
      }
  },
  created() {},
  mounted() {
    this.sanInfoId = sessionStorage.getItem("sanInfoId");
    this.sanId = sessionStorage.getItem("sanId");

    this.getRoomTypeMoneyList();
  },
};
</script>

<style lang="less" scoped>
#checkIn {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-content: center;
  width: 100%;
  height: 730px;
  background: rgb(236, 241, 247);
}



  .mantip {
        height: 180px;
        background: rgb(6,117,123);
        width: 100%;
        position: relative;
        z-index: 0;
        .maintop {
        display: flex;
        flex-direction: row;
        margin: 20px auto;
        margin-top: 45px;
        width: 60%;
        background: rgb(6,117,123);
        border-radius: 10px;
      }
      }
  .maincontent {
      display: flex;
      flex-direction: column;
      margin: 0px auto;
      margin-top: -45px;
      // margin-bottom: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 2px 2px rgba(119, 118, 118, 0.33);
      padding-top: 3px;
      width: 32%;
      height: 580px;
      z-index: 999;
      // position: absolute;
      .con {
        display: flex;
        flex-direction: column;
        height: 450px;
        margin-bottom: 40px;
        .contitle {
          width: 100%;
          height: 60px;
          line-height: 60px;
          margin-left: 20px;
          font-size: 20px;
          font-weight: 600;
          text-align: left;
          // border-bottom: 1px solid rgba(119, 118, 118, 0.33);
        }
        .conline {
          width: 95%;
          height: 1px;
          background: rgba(66, 66, 66, 0.33);
          box-shadow: 0 0 1px 1px rgba(119, 118, 118, 0.33);
          margin: 0 auto;
          margin-bottom: 30px;
        }
        .coninput {
          padding: 15px 10px 10px 40px;
          width: 100%;
          display: flex;
        }
      }
      .con1 {
        display: flex;
        flex-direction: column;
        height: 470px;
        margin-bottom: 20px;
        overflow: hidden;
        .contitle {
          width: 100%;
          height: 60px;
          line-height: 60px;
          margin-left: 20px;
          font-size: 20px;
          font-weight: 600;
          text-align: left;
          // border-bottom: 1px solid rgba(119, 118, 118, 0.33);
        }
        .conline {
          width: 95%;
          height: 1px;
          background: rgba(66, 66, 66, 0.33);
          box-shadow: 0 0 1px 1px rgba(119, 118, 118, 0.33);
          margin: 0 auto;
          margin-bottom: 20px;
        }
        .conscorll {
          // overflow-x: hidden;
          // overflow-y: scroll;
          width: 100%;
          display: flex;
          flex-direction: column;
          height: 420px;
        }
        .coninput {
          padding: 15px 10px 10px 30px;
          width: 100%;
          display: flex;
        }
          .contype {
            display: flex;
            width: 100%;
            padding: 15px 10px 10px 30px;
          }
          .conprice {
            width: 80%;
            height: 120px;
            margin-top: 20px;
            border-radius: 10px;
            box-shadow: 0 0 2px 1px rgba(119, 118, 118, 0.33);
            margin-left: 40px;
            padding-top: 10px;
            margin-bottom: 10px;
            div {
              width: 100%;
              height: 25px;
            }
            .conpricelabel {
              width: 100%;
              height: 100%;
              margin-left: -15px;
            }
          }
          .orderMeal {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-left: 5px;
          }
      }
      .con2 {
        display: flex;
        flex-direction: column;
        height: 470px;
        margin-bottom: 20px;
        .contitle {
          width: 100%;
          height: 60px;
          line-height: 60px;
          margin-left: 20px;
          font-size: 20px;
          font-weight: 600;
          text-align: left;
          // border-bottom: 1px solid rgba(119, 118, 118, 0.33);
        }
        .conline {
          width: 95%;
          height: 1px;
          background: rgba(66, 66, 66, 0.33);
          box-shadow: 0 0 1px 1px rgba(119, 118, 118, 0.33);
          margin: 0 auto;
          margin-bottom: 30px;
        }
         .conscorll {
          overflow-x: hidden;
          width: 100%;
          display: flex;
          flex-direction: column;
          height: 420px;
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
      }
}
</style>