<template>
  <div class="input-click-main" @click="myclick">
    <div style="width: 100%" v-show="show">{{mydata}}</div>
    <el-input v-if="type==1" ref="myinput" type="input" v-model="mydata" v-show="!show" @blur="myblur"></el-input>
    <el-input v-else ref="myinput" type="textarea" :rows="5" v-model="mydata" v-show="!show" @blur="myblur"></el-input>
  </div>
</template>
<script>
  export default{
//    props:['data','type'],
    props:{
      data:{
        type:String,
        default:''
      },
      type:{
        type:Number,
        default:1
      }
    },
    data(){
      return{
        show:true,
        mydata:this.data
      }
    },
    methods:{
      myclick(){
        this.show=false;
         if(this.type==1){
           this.$nextTick(_ => {
            this.$refs.myinput.$refs.input.focus();
          });
         }
         else{
           this.$nextTick(_ => {
            this.$refs.myinput.$refs.textarea.focus();
          });
         }
      },
      myblur(){
        this.show=true;
      },
    },
    watch:{
      mydata:{
        handler(val){
          this.$emit('update:data',val);
        },
        deep:true,
      },
      data:{
        handler(val){
          this.mydata=this.data;
        },
        deep:true,
      }
    }
  }
</script>
<style>
  .input-click-main{
    /*width: 100%;*/
    min-height: 50%;
    min-width: 50%;
    display: inline-block;
    cursor: pointer;
  }
</style>