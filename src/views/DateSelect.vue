<template>
  <div class="app" style="margin:20px 20px 20px 20px;">
    <el-page-header
      content="Date Select Page"
      @back="$router.back(-1)"
    >
    </el-page-header>
    <el-container class="app">
      <el-main style="margin:30px 200px 10px 200px;">
        <el-select
          v-model="calendarID"
          placeholder="選擇會議室"
          style="width: 200px"
          class="filter-item"
        >
          <el-option
            v-for="item in roomOptions"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-calendar
          v-model="date"
        >
        </el-calendar>
        <div align="right">
          <el-button
            type="success"
            @click="enterDate"
          >
            確認
          </el-button>
        </div>
      </el-main>
      <el-dialog
        title="test"
        :visible.sync="reservationFormVisible"
        width="80%"
      >
        <h1>haha</h1>
      </el-dialog>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator'
import { listUpcomingEvents, handleClientLoad } from '@/apis/googleCal'
import { component } from 'vue/types/umd';
import About from './views/About.vue';
import { ServerHeartbeatFailedEvent } from 'mongodb';

@Component({
  name: 'dateSelect'
})

export default class test extends Vue {
  private date = ''
  private reservationFormVisible = false
  private listLoading = false
  private roomOptions = [
    { value: 'okuif14nfltn6dumpe0p187dms@group.calendar.google.com', label: 'Room1' },
    { value: 'jteos2j98hjiu82j78e89quoss@group.calendar.google.com', label: 'Room2' },
    { value: '6jrgjttjpsnt5v519rr84o8m90@group.calendar.google.com', label: 'Room3' },
    { value: '3ctok2t3skph001bj29s4onfm4@group.calendar.google.com', label: 'Room4' },
    { value: 'jo63b6s8sn678tcesnpge03a6k@group.calendar.google.com', label: 'Room5' }
  ]

  private calendarID = ''
  
  create() {
    handleClientLoad()
  }

  private logout() {
    console.log('haha')
  }

  private enterDate() {
    //this.$router.push('Reservation')
    if (this.calendarID != '') {
      this.getList()
      console.log(this.calendarID)
      this.reservationFormVisible = true
    }
    else {
      this.$message({
        message: '請選擇會議室',
        type: 'error',
        duration: 2000
      })
    }
    
  }

  private async getList() {
    this.listLoading = true
    const data = await listUpcomingEvents()
    console.log(data)
    this.listLoading = false
  }

}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #409EFF;
  margin-top: 60px;
}
</style>
