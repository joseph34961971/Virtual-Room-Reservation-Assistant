<template>
  <div class="app" style="margin:20px 20px 20px 20px;">
    
    <el-container class="app">
      <el-main style="margin:30px 200px 10px 200px;">
        <el-select
          v-model="calendarID"
          placeholder="請選擇會議室"
          style="width: 400px"
          class="filter-item"
        >
          <el-option
            v-for="item in roomOptions"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-calendar v-model="date" @click="testCal(data)">
          <template 
            slot-scope="{ data }"
            slot="dateCell"
            @click="testCal(data)"
          >
            <div @click="testCal(data)">
              <p
                :class="data.isSelected ? 'is-selected' : ''"
                v-on="data.isSelected ? assignToDate(data): ''"
              >
                {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : ''}}
              </p>
            </div>
          </template>
        </el-calendar>
        <!-- <template>
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
        </template> -->
        <div
          align="right"
        >
          <el-button
            type="primary"
            @click="enterDate"
          >
            SELECT
          </el-button>
        </div>
      </el-main>
      <el-dialog
        title="Reservation"
        :visible.sync="reservationFormVisible"
        width="750px"
      >
        <el-form
          ref="dataForm"
          :model="eventData"
          label-width="80px"
          style="width: 700px; margin-left:0px;"
          align="left"
        >
          <el-form-item
            label="會議名稱"
          >
            <el-input
              v-model="eventData.title"
              placeholder="請輸入會議名稱"
              style="width: 95%"
            />
          </el-form-item>
          <el-form-item
            label="會議時間"
          >
            <el-select
              v-model="selectedTime"
              placeholder="請選擇時間"
              style="width: 95%"
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
            label="詳細資訊"
          >
            <el-input
              type="textarea"
              :rows="5"
              style="width: 95%"
              placeholder="請輸入會議資訊"
              v-model="eventData.description"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="參與者"
          >
            <template>
              <el-transfer
                filterable
                filter-placeholder="請輸入邀請人信箱"
                v-model="attendee"
                :data="users"
                :titles="['使用者列表', '被邀請']"
              >
              </el-transfer>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 95%; margin-bottom:10px; margin-top:40px;"
              @click="handleReservation"
            >
              確認預約
            </el-button><br>
            <el-button 
              class="button"
              style="width: 95%"
              @click="reservationFormVisible = false"
            >
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator'
import { listEvents, insertEvents, sendMail, getEvents } from '@/apis/testGoogleApis'
import { MongoGetUserList } from '@/apis/mongoTest'
import { component } from 'vue/types/umd';
import About from './views/About.vue';
import { ServerHeartbeatFailedEvent } from 'mongodb';
import { type } from 'jquery';
import { get } from 'http';
import { JsonWebTokenError } from 'jsonwebtoken';


@Component({
  name: 'dateSelect'
})

export default class test extends Vue {
  private test = ''
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

  // private users = [
  //   { label: 'joseph34961971@gmail.com', key: 'joseph34961971@gmail.com', disabled: false},
  //   { label: 'jam99998888@gmail.com', key: 'jam99998888@gmail.com', disabled: false},
  //   { label: 'yp93ruby@gmail.com', key: 'yp93ruby@gmail.com', disabled: false}
  // ]

  private users = [{}]

  //private tempUser = [{}]
  private attendee = []

  private userCalendarID = 'ooaqmbmd22ec3qfsmk015588j8@group.calendar.google.com'
  private userEventID = "dqqvsk5f6s60e44d3bkfjiepns"

  private userName = ''
  private userEmail = ''
  // private userData = {
  //   userName: '',
  //   userEmail: ''
  // }
  
  async created() {
    this.getUserInfo()
    this.getAllUsers()
  }

  private async getAllUsers() {
    const temp = await MongoGetUserList()
    const allUsers = JSON.parse(temp)
    for (let i = 0; i < allUsers.length; i++) {
      //console.log(allUsers[i])
      const tempUser = {
        label: allUsers[i].userName,
        key: allUsers[i].email,
        disabled: false
      }

      this.users.push(tempUser)
    }
    this.users.splice(0, 1)
    console.log(this.users)
  }

  private async getUserInfo() {
    let t = await getEvents(this.userCalendarID, this.userEventID)
    const temp = JSON.parse(t)
    console.log(temp)
    this.userName = temp.summary
    this.userEmail = temp.description
  }

  private async enterDate() {
    //this.$router.push('Reservation')
    //this.timeOptions = this.defaultTimeOptions
    
    //insertEvents('2022-01-01T09:00:00-08:00','2022-01-01T15:00:00-08:00','joseph','joseph34961971@gmail.com','ooaqmbmd22ec3qfsmk015588j8@group.calendar.google.com')
    //const temp = await listUpcomingEvents('ooaqmbmd22ec3qfsmk015588j8@group.calendar.google.com')
    //console.log(temp)
    await this.getUserInfo()
    console.log(this.userName)

    for (let i in this.timeOptions) {
      this.timeOptions[i].disabled = false
    }

    if (this.calendarID != '' && this.date != '') {
      
      this.listLoading = true
      let temp = await listEvents(this.calendarID)
      const data = JSON.parse(temp)
      console.log('this is data')
      console.log(data)
      if (data == 0) {
        console.log('nothing')
      }
      else {
        let c = 0
        //console.log(typeof(data))
        for (let i = 0; i < data.items.length; i++) {
          console.log('haaaaa')
          console.log(data.items[i])
          let tempStartTime = data.items[i].start.dateTime
          let tempEndTime = data.items[i].end.dateTime
          tempStartTime = tempStartTime.split('T')
          console.log('**********************************')
          console.log(tempStartTime)
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
      if (this.calendarID == '') {
        this.$message({
          message: '請選擇會議室',
          type: 'error',
          duration: 2000
        })
      }
      if (this.date == '') {
        this.$message({
          message: '請選擇會議日期',
          type: 'error',
          duration: 2000
        })
      }
    }
    
  }

  private async getList() {
    this.listLoading = true
    const data = await listEvents(this.calendarID)
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

  private async handleReservation() {
    this.eventData.calendarID = this.calendarID
    let tempTime = this.selectedTime.split(' - ')
    this.startTime = tempTime[0]
    this.endTime = tempTime[1]
    console.log(this.selectedTime)
    this.eventData.startTime = this.date + "T" + this.startTime + ":00" + "+08:00"
    this.eventData.endTime = this.date + "T" + this.endTime + ":00" + "+08:00"
    console.log(this.eventData)

    console.log(this.attendee)

    let attendeeStr = ''
    for (let i in this.attendee) {
      console.log(this.attendee[i])
      attendeeStr += String(this.attendee[i])
      attendeeStr += '/'
      //sendMail(this.attendee[i], 'Meeting Invite Notification!!!', '您已使用VRRA成功預約會議室!\n\n會議室資訊如下\n會議室名稱: ' + this.eventData.title + '\n會議開始時間: ' + this.eventData.startTime + '\n會議結束時間: ' + this.eventData.endTime + '\n會議室描述及備註: ' + this.eventData.description + '\n參與會議者: ' + attendeeStr + '\n\n請準時參與該預約會議!!')
    }

    for (let i in this.attendee) {
      sendMail(this.attendee[i], 'Meeting Invite Notification!!!', '您已使用VRRA成功預約會議室!\n\n會議室資訊如下\n會議室名稱: ' + this.eventData.title + '\n會議開始時間: ' + this.eventData.startTime + '\n會議結束時間: ' + this.eventData.endTime + '\n會議室描述及備註: ' + this.eventData.description + '\n參與會議者: ' + attendeeStr + '\n\n請準時參與該預約會議!!')

    }
    console.log(attendeeStr)

    await insertEvents(this.eventData.startTime, this.eventData.endTime, this.eventData.title, this.eventData.description, attendeeStr, this.eventData.calendarID)
    this.$notify({
      title: 'Success',
      message: 'Reservate Successfully',
      type: 'success',
      duration: 2000
    })
    
    this.eventData.title = ''
    this.eventData.startTime = ''
    this.eventData.endTime = ''
    this.eventData.description = ''
    this.attendee = []
    this.selectedTime = ''

    this.reservationFormVisible = false
  }

  private handleCancel() {
    this.reservationFormVisible = false
  }

  private testCal(data: any) {
    console.log(data.day)
  }

  private assignToDate(data: any) {
    this.date = data.day
    //console.log(this.date)
  }

}
</script>

<style lang="scss">
.button{
  align-items: right;
  justify-content: center;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c925d;
  margin-top: 60px;
}
</style>
