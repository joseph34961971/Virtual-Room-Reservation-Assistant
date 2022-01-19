<template>
  <div class="UM">
    <el-page-header
      content="User Meeting Page"
      @back="$router.back(-1)"
    >
    </el-page-header>

    <el-button
      @click="getEventList"
    >
      getList
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator'
import { listUpcomingEvents, handleClientLoad, insertEvents, sendMail } from '@/apis/googleCal'
import { MongoGetUserList } from '@/apis/mongoTest'

@Component({
  name: 'dateSelect'
})

export default class test extends Vue {
  private userIDEvent = "dqqvsk5f6s60e44d3bkfjiepns"
  private userName = ''
  private userEmail = ''
  private roomOptions = [
    { value: 'okuif14nfltn6dumpe0p187dms@group.calendar.google.com', label: 'Room1' },
    { value: 'jteos2j98hjiu82j78e89quoss@group.calendar.google.com', label: 'Room2' },
    { value: '6jrgjttjpsnt5v519rr84o8m90@group.calendar.google.com', label: 'Room3' },
    { value: '3ctok2t3skph001bj29s4onfm4@group.calendar.google.com', label: 'Room4' },
    { value: 'jo63b6s8sn678tcesnpge03a6k@group.calendar.google.com', label: 'Room5' }
  ]

  create() {
    handleClientLoad()
    this.getUserInfo()
  }
  
  private getUserInfo() {
    console.log('haha')
  }

  private getEventList() {
    for (let i in this.roomOptions) {
      console.log(this.roomOptions[i].value)
    }
  }
}

</script>

<style lang="scss" scoped>
.flex-wrapper-one {
  background-color: rgba(255, 255, 255, 1);
  margin-left: 348px;
  border-radius: 20px;
  padding: 10px 10px 10px;
  box-shadow: 5px 8px 20px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 1);
  
}
.meeting {
  background-color: rgba(255, 255, 255, 1);
  margin-left: 30px;
  border-radius: 20px;
  padding: 10px 60px 10px 60px;
  box-shadow: 5px 8px 20px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 1);
  float: left;
}
.input {
  font-family: "Roboto";
  font-size: 48px;
  font-weight: 30;
  line-height: 12px;
  color: rgba(115, 175, 121, 1);
  align-self: stretch;
  text-align: center;
  margin-bottom: 97px;
}
</style>