import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import main from '@/views/main.vue'
import manageOld from '@/views/manageOld.vue'
import manageRoomSpace from '@/views/manageRoomSpace.vue'
import manageRoomSpaceDetail from '@/views/manageRoomSpaceDetail.vue'
import checkIn from '@/views/checkIn.vue'
import manageAccount from '@/views/manageAccount.vue'
import manageNurse from '@/views/manageNurse.vue'
import highManageMain from '@/views/highManageMain.vue'
import dailyTask from '@/views/dailyTask.vue'
import customTask from '@/views/customTask.vue'
import taskDraft from '@/views/taskDraft.vue'
import historyTask from '@/views/historyTask.vue'
import dailyTaskDetail from '@/views/dailyTaskDetail.vue'
import customTaskDetail from '@/views/customTaskDetail.vue'
import wholeHealth from '@/views/wholeHealth.vue'
import checkIndicator from '@/views/checkIndicator.vue'
import checkIndicatorDetail from '@/views/checkIndicatorDetail.vue'
import recommendDiet from '@/views/recommendDiet.vue'
import setMeal from '@/views/setMeal.vue'
import setMealList from '@/views/setMealList.vue'
import nurseLeaveApprove from '@/views/nurseLeaveApprove.vue'
import familyVisitApprove from '@/views/familyVisitApprove.vue'
import familyAppointmentApprove from '@/views/familyAppointmentApprove.vue'
import familyActivityApprove from '@/views/familyActivityApprove.vue'
import familyRegisterApprove from '@/views/familyRegisterApprove.vue'
import highManageUser from '@/views/highManageUser.vue'
import highProfit from '@/views/highProfit.vue'
import highCameraDevice from '@/views/highCameraDevice.vue'
import highCameraAlert from '@/views/highCameraAlert.vue'
import exceptionSan from '@/views/exceptionSan.vue'
import highSensitiveOperation from '@/views/highSensitiveOperation.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '/main',
      name: 'main',
      component: main
    },{
      path: '/manageOld',
      name: 'manageOld',
      component: manageOld
    },{
      path: '/manageRoomSpace',
      name: 'manageRoomSpace',
      component: manageRoomSpace
    },{
      path: '/checkIn',
      name: 'checkIn',
      component: checkIn
    },{
      path: '/manageAccount',
      name: 'manageAccount',
      component: manageAccount
    },{
      path: '/manageRoomSpaceDetail',
      name: 'manageRoomSpaceDetail',
      component: manageRoomSpaceDetail
    },{
      path: '/manageNurse',
      name: 'manageNurse',
      component: manageNurse
    },{
      path: '/highManageMain',
      name: 'highManageMain',
      component: highManageMain
    },{
      path: '/dailyTask',
      name: 'dailyTask',
      component: dailyTask
    },{
      path: '/customTask',
      name: 'customTask',
      component: customTask
    },{
      path: '/taskDraft',
      name: 'taskDraft',
      component: taskDraft
    },{
      path: '/historyTask',
      name: 'historyTask',
      component: historyTask
    },{
      path: '/dailyTaskDetail',
      name: 'dailyTaskDetail',
      component: dailyTaskDetail
    },{
      path: '/customTaskDetail',
      name: 'customTaskDetail',
      component: customTaskDetail
    },{
      path: '/wholeHealth',
      name: 'wholeHealth',
      component: wholeHealth
    },{
      path: '/checkIndicator',
      name: 'checkIndicator',
      component: checkIndicator
    },{
      path: '/checkIndicatorDetail',
      name: 'checkIndicatorDetail',
      component: checkIndicatorDetail
    },{
      path: '/recommendDiet',
      name: 'recommendDiet',
      component: recommendDiet
    },{
      path: '/setMeal',
      name: 'setMeal',
      component: setMeal
    },{
      path: '/setMealList',
      name: 'setMealList',
      component: setMealList
    },{
      path: '/nurseLeaveApprove',
      name: 'nurseLeaveApprove',
      component: nurseLeaveApprove
    },{
      path: '/familyVisitApprove',
      name: 'familyVisitApprove',
      component: familyVisitApprove
    },{
      path: '/familyAppointmentApprove',
      name: 'familyAppointmentApprove',
      component: familyAppointmentApprove
    },{
      path: '/familyActivityApprove',
      name: 'familyActivityApprove',
      component: familyActivityApprove
    },{
      path: '/familyRegisterApprove',
      name: 'familyRegisterApprove',
      component: familyRegisterApprove
    },{
      path: '/highManageUser',
      name: 'highManageUser',
      component: highManageUser
    },{
      path: '/highProfit',
      name: 'highProfit',
      component: highProfit
    },{
      path: '/highCameraDevice',
      name: 'highCameraDevice',
      component: highCameraDevice
    },{
      path: '/highCameraAlert',
      name: 'highCameraAlert',
      component: highCameraAlert
    },{
      path: '/exceptionSan',
      name: 'exceptionSan',
      component: exceptionSan
    },{
      path: '/highSensitiveOperation',
      name: 'highSensitiveOperation',
      component: highSensitiveOperation
    }
  ]
})
