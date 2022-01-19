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
          placeholder="請選擇會議室"
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
        <template>
          <div class="block" style="margin-top:20px;">
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="選擇日期"
              value-format="yyyy-MM-dd"
              size="large"
            >
            </el-date-picker>
          </div>
        </template>
        <div
          align="right"
        >
          <el-button
            type="success"
            @click="enterDate"
          >
            確認
          </el-button>
          <el-button
            type="success"
            @click="getList"
          >
            getList
          </el-button>
        </div>
      </el-main>
      <el-dialog
        title="Reservation"
        :visible.sync="reservationFormVisible"
        width="40%"
      >
        <el-form
          ref="dataForm"
          :model="eventData"
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:120px;"
        >
          <el-form-item
            label="會議名稱"
          >
            <el-input
              v-model="eventData.title"
              placeholder="請輸入會議名稱"
            />
          </el-form-item>
          <el-form-item
            label="會議時間"
          >
            <el-select
              v-model="selectedTime"
              placeholder="請選擇時間"
              style="width: 200px"
              class="filter-item"
            >
              <el-option
                v-for="item in timeOptions"
                :key="item.label"
                :label="item.label"
                :value="item.label"
                :disabled="item.disabled"
              />
            </el-select>
            <!-- <el-time-select
              placeholder="結束时间"
              v-model="endTime"
              :picker-options="{
                start: '09:00',
                step: '01:00',
                end: '18:00',
                minTime: startTime
              }">
            </el-time-select> -->
          </el-form-item>
          <el-form-item
            label="參與者"
          >
            <el-input
              type="textarea"
              :rows="5"
              placeholder="請輸入參與者"
              v-model="eventData.description"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleReservation">確認預約</el-button>
            <el-button @click="reservationFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator'
import { listUpcomingEvents, handleClientLoad, insertEvents, sendMail } from '@/apis/googleCal'
import { component } from 'vue/types/umd';
import About from './views/About.vue';
import { ServerHeartbeatFailedEvent } from 'mongodb';
import { type } from 'jquery';


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

  private defaultTimeOptions = [
    { label: '08:00 - 09:00', start: '08:00', end: '09:00', disabled: false},
    { label: '09:00 - 10:00', start: '09:00', end: '10:00', disabled: false},
    { label: '10:00 - 11:00', start: '10:00', end: '11:00', disabled: false},
    { label: '11:00 - 12:00', start: '11:00', end: '12:00', disabled: false},
    { label: '12:00 - 13:00', start: '12:00', end: '13:00', disabled: false},
    { label: '13:00 - 14:00', start: '13:00', end: '14:00', disabled: false},
    { label: '14:00 - 15:00', start: '14:00', end: '15:00', disabled: false},
    { label: '15:00 - 16:00', start: '15:00', end: '16:00', disabled: false},
    { label: '16:00 - 17:00', start: '16:00', end: '17:00', disabled: false},
    { label: '17:00 - 18:00', start: '17:00', end: '18:00', disabled: false},
  ]
  private timeOptions = this.defaultTimeOptions
  private selectedTime = ''

  private calendarID = ''
  private startTime = ''
  private endTime = ''
  private eventData = {
    title: '',
    startTime: '',
    endTime: '',
    description: '',
    calendarID: ''
  }
  
  create() {
    handleClientLoad()
  }

  private async enterDate() {
    //this.$router.push('Reservation')
    //this.timeOptions = this.defaultTimeOptions

    for (let i in this.timeOptions) {
      this.timeOptions[i].disabled = false
    }

    if (this.calendarID != '') {
      
      this.listLoading = true
      const data = await listUpcomingEvents(this.calendarID)
      if (data == 0) {
        console.log('nothing')
      }
      else {
        let c = 0
        //console.log(typeof(data))
        for (let i in data) {
          let tempStartTime = data[i].start.dateTime
          let tempEndTime = data[i].end.dateTime
          tempStartTime = tempStartTime.split('T')
          //console.log(tempStartTime[0])
          //console.log(this.date)
          if (tempStartTime[0] != this.date) {
            continue
          }
          c = c + 1
          tempStartTime = tempStartTime[1].split(':')[0]
          console.log(tempStartTime)
          for (let j in this.timeOptions) {
            if (this.timeOptions[j].start == (tempStartTime + ":00")) {
              this.timeOptions[j].disabled = true
            }
          }
        }
      //console.log(c)

      }
      this.listLoading = false
      
      console.log(this.calendarID)
      console.log(this.date)
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
    const data = await listUpcomingEvents(this.calendarID)
    console.log(typeof(data))
    console.log('haga')
    if (data == 0) {
      console.log('nothing')
    }
    else {
      console.log(typeof(data))
      for (let i in data) {
        console.log(data[i].start.dateTime)
        
      }
    }
    this.listLoading = false
  }

  private handleReservation() {
    this.eventData.calendarID = this.calendarID
    let tempTime = this.selectedTime.split(' - ')
    this.startTime = tempTime[0]
    this.endTime = tempTime[1]
    console.log(this.selectedTime)
    this.eventData.startTime = this.date + "T" + this.startTime + ":00" + "+08:00"
    this.eventData.endTime = this.date + "T" + this.endTime + ":00" + "+08:00"
    console.log(this.eventData)
    insertEvents(this.eventData.startTime, this.eventData.endTime, this.eventData.title, this.eventData.description, this.eventData.calendarID)
    this.$notify({
      title: 'Success',
      message: 'Reservate Successfully',
      type: 'success',
      duration: 2000
    })
    this.reservationFormVisible = false
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
