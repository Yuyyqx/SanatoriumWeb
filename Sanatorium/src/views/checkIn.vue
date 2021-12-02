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
              <el-input placeholder="请输入" v-model="input1" style="width:60%;"> </el-input>
            </div>
            <div class="coninput">
              <label style="color: red">*</label>家属验证：
              <el-input placeholder="请输入" v-model="input1" style="width:60%;"> </el-input>
            </div>
            <div class="coninput">
              <label style="color: red">*</label>老人登记：
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
                  ><label style="color: red">*</label>入院类型：</label
                >
                <el-select
                  v-model="value1"
                  placeholder="请选择"
                  style="width: 60%;"
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
                    >{{ item.num }}——{{ item.type }}——价格最高{{
                      item.price
                    }}/月</label
                  >
                </div>
              </div>
              <div class="contype" >
                <label style="width: 100px"
                  ><label style="color: red">*</label>选择房间：</label
                >
                <el-cascader
                  v-model="valueRoom"
                  :options="optionsRoom"
                  @change="handleChangeRoom"
                  style="width: 60%;"
                ></el-cascader>
              </div>
              <div class="orderMeal">
                <div class="contype">
                  <label style="width: 110px"
                    ><label style="color: red">*</label>统一订餐：</label
                  >
                  <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    style="width: 100%;"
                  >
                  </el-switch>
                </div>
                <div style="margin-top: 5px; margin-left: -40px">
                  <label style="width: 100px; color: red; font-size: 12px"
                    >注：确定统一订餐是否需要备注事项</label
                  >
                </div>
              </div>
              <div class="conprice">
                <div>
                  价格列表
                </div>
                <div v-for="(item, index) in priceType">
                  <label class="conpricelabel"
                    >{{ item.num }}——{{ item.type }}——价格最高{{
                      item.price
                    }}/月</label
                  >
                </div>
              </div>
              <div class="orderMeal">
                <div class="contype">
                  <label style="width: 120px"
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
          <!--个人信息-->
          <div class="con1" v-if="active == 3">
            <div class="contitle">个人信息</div>
            <div class="conline"></div>
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
      priceType: [
        {
          num: "单人间",
          type: "任意类型",
          price: 5000,
        },
        {
          num: "三人间",
          type: "任意类型",
          price: 3000,
        },
        {
          num: "五人间",
          type: "任意类型",
          price: 2000,
        },
      ],
      valueRoom: [],
      optionsRoom: [
        {
          value: "A",
          label: "A楼",
          children: [
            {
              value: "1",
              label: "1层",
              children: [
                {
                  value: "101",
                  label: "101房间",
                },
                {
                  value: "102",
                  label: "102房间",
                },
                {
                  value: "103",
                  label: "103房间",
                },
                {
                  value: "104",
                  label: "104房间",
                },
              ],
            },
            {
              value: "B",
              label: "B楼",
              children: [
                {
                  value: "9",
                  label: "9层",
                },
                {
                  value: "10",
                  label: "10层",
                },
              ],
            },
          ],
        },
        {
          value: "C",
          label: "C楼",
          children: [
            {
              value: "11",
              label: "11层",
            },
          ],
        },
      ],
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
      if (this.active++ > 6) this.active = 0;
    },
    //上一步
    prev() {
      --this.active;
      if (this.active == 7) this.active = 0;
    },
    handleChangeRoom(value) {
      console.log(value);
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
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less">
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