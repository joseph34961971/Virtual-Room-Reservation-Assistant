<template>
  <div class="UM">
    <!--<el-page-header
      content="User Meeting Page"
      @back="$router.back(-1)"
    >
    </el-page-header>-->
    <p class="mylogo">My Meetings</p>
    <!-- <el-button
      @click="getEventList"
    >
      getList
    </el-button> -->
    <el-main style="margin:30px 200px 10px 200px;">
      <el-table
        v-loading="listLoading"
        :data="eventList"
        border
        fit
        highlight-current-row
        style="width: 100%"
        sortable
      >
        <el-table-column
          label="會議名稱"
          align="center"
          min-width="140px"
          sortable
        >
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="會議室號碼"
          align="center"
          width="140px"
          sortable
        >
          <template slot-scope="{row}">
            <span>{{ row.room }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="開始時間"
          align="center"
          width="200px"
          prop="first_name"
          sortable
        >
          <template slot-scope="{row}">
            <span>{{ row.startTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="結束時間"
          align="center"
          width="200px"
          prop="first_name"
          sortable
        >
          <template slot-scope="{row}">
            <span>{{ row.endTime }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column
          label="時區"
          align="center"
          width="120px"
          prop="first_name"
          sortable="custom"
        >
          <template slot-scope="{row}">
            <span>{{ row.timeZone }}</span>
          </template>
        </el-table-column>-->
        <el-table-column
          label="參與成員"
          align="center"
          width="200px"
          prop="first_name"
          sortable="custom"
        >
          <template slot-scope="{row}">
            <span>{{ row.attendee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="詳細資訊"
          align="center"
          width="200px"
          prop="first_name"
          sortable="custom"
        >
          <template slot-scope="{row}">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200px"
          class-name="fixed-width"
        >
          <template slot-scope="{row, $index}">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row.eventID, row.calendarID, $index)"
            >
              刪除
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >
              編輯
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!-- update event dialog -->
    <el-dialog
      title="Update Event"
      :visible.sync="editEventDialogVisible"
      width="750px"
    >
      <el-form
        ref="dataForm"
        :model="formEventData"
        label-width="80px"
        style="width: 700px; margin-left:0px;"
        align="left"
      >
        <el-form-item
          label="會議名稱"
          :required="true"
        >
          <el-input
            v-model="formEventData.title"
            placeholder="請輸入會議名稱"
          />
        </el-form-item>
        <el-form-item
          label="會議時間"
          style="width: 95%"
          :required="true"
        >
          <el-select
            v-model="formEventData.selectedTime"
            :placeholder="defaultTime"
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
            v-model="formEventData.description"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="參與者"
          :required="true"
        >
          <template>
            <el-transfer
              filterable
              filter-placeholder="請輸入邀請人信箱"
              v-model="formEventData.attendee"
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
            @click="updateData"
          >
            確認編輯
          </el-button><br>
          <el-button 
          style="width: 95%"
          @click="reservationFormVisible = false"
          >
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator'
import { listEvents, insertEvents, sendMail, getEvents, updateEvents, deleteEvents } from '@/apis/testGoogleApis'
import { MongoGetUserList } from '@/apis/mongoTest'
import { data, event } from 'jquery'
import { get } from 'http'
import { TimePicker } from 'element-ui'
import { json } from 'body-parser'

@Component({
  name: 'dateSelect'
})

export default class test extends Vue {
  private date = ''
  private userName = ''
  private userEmail = ''
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
  private defaultTime = ''

  private users = [
    { label: 'joseph34961971@gmail.com', key: 'joseph34961971@gmail.com', disabled: false},
    { label: 'jam99998888@gmail.com', key: 'jam99998888@gmail.com', disabled: false},
    { label: 'yp93ruby@gmail.com', key: 'yp93ruby@gmail.com', disabled: false}
  ]

  private eventList = [{}]

  private formEventData = {
    title: '',
    selectedTime: '',
    description: '',
    attendee: []
  }

  private eventData = {
    title: '',
    room: '',
    startTime: '',
    endTime: '',
    timeZone: '',
    attendee: '',
    description: '',
    eventID: '',
    calendarID: ''
  }

  private editEventDialogVisible = false

  private userCalendarID = 'ooaqmbmd22ec3qfsmk015588j8@group.calendar.google.com'
  private userEventID = "dqqvsk5f6s60e44d3bkfjiepns"

  private listLoading = false

  created() {
    this.getUserInfo()
    this.getEventList()
    //deleteEvents("okuif14nfltn6dumpe0p187dms@group.calendar.google.com", "d4a7gvn7gt5sgcaldgeeh2eadg")
  }
  
  private async getUserInfo() {
    let t = await getEvents(this.userCalendarID, this.userEventID)
    const temp = JSON.parse(t)
    console.log(temp)
    this.userName = temp.summary
    this.userEmail = temp.description
  }

  private async getEventList() {
    this.listLoading = true
    this.eventList = [{}]
    await this.getUserInfo()
    for (let i in this.roomOptions) {
      //console.log(this.roomOptions[i].value)
      let temp = await listEvents(this.roomOptions[i].value)
      const data = JSON.parse(temp)
      //console.log(data)
      //console.log('****************************')
      if (data != 0) {
        for (let j = 0; j < data.items.length; j++) {
          console.log(data.items[j])
          if (data.items[j].location.search(this.userEmail) != -1) {
            // let tempEvent = this.defaultEvent
            // tempEvent.title = data[j].summary
            // tempEvent.room = data[j].organizer.displayName
            // tempEvent.startTime = data[j].start.dateTime
            // tempEvent.endTime = data[j].end.dateTime
            // tempEvent.timeZone = data[j].start.timeZone
            // tempEvent.attendee = data[j].description

            const tempEvent = {
              title: data.items[j].summary,
              room: data.items[j].organizer.displayName,
              startTime: data.items[j].start.dateTime,
              endTime: data.items[j].end.dateTime,
              timeZone: data.items[j].start.timeZone,
              attendee: data.items[j].location,
              description: data.items[j].description,
              eventID: data.items[j].id,
              calendarID: this.roomOptions[i].value
            }
            
            this.eventList.push(tempEvent)
          }
        }
      }
      else {
        console.log('nothingggg')
      }
    }
    console.log('===============')
    console.log(this.eventList)
    this.eventList.splice(0, 1)

    this.listLoading = false
  }

  private async handleDelete(eventID: any, calendarID: any, index: number) {
    this.$confirm('此操作會刪除會議, 是否繼續?', '提示', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      await deleteEvents(calendarID, eventID)
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.eventList.splice(index, 1)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消刪除'
      })
    })
  }

  private async handleUpdate(row: any) {
    console.log('handle update')
    this.eventData = Object.assign({}, row)

    this.formEventData.title = this.eventData.title
    this.formEventData.description = this.eventData.description

    for (let i in this.timeOptions) {
      this.timeOptions[i].disabled = false
    }

    let t = await listEvents(this.eventData.calendarID)
    const data = JSON.parse(t)
    if (data == 0) {
      console.log('nothing')
    }
    else {
      //console.log(typeof(data))
      for (let i = 0; i <  data.items.length; i++) {
        let tempStartTime = data.items[i].start.dateTime
        let tempEndTime = data.items[i].end.dateTime
        tempStartTime = tempStartTime.split('T')
        //console.log(tempStartTime[0])
        //console.log(this.date)
        let date = this.eventData.startTime.split('T')
        this.date = date[0]
        this.defaultTime = date[1].split(':')[0] + ":00 - " + String(Number(date[1].split(':')[0]) + 1) + ":00"
        // console.log('*************************')
        // console.log(date)
        if (tempStartTime[0] != this.date) {
          continue
        }
        tempStartTime = tempStartTime[1].split(':')[0]
        console.log(tempStartTime)
        for (let j in this.timeOptions) {
          if (this.timeOptions[j].start == (tempStartTime + ":00")) {
            this.timeOptions[j].disabled = true
            if (this.timeOptions[j].label == this.defaultTime) {
              this.timeOptions[j].disabled = false
            }
          }
        }
      }
    }
    this.editEventDialogVisible = true
    console.log(this.eventData)
  }

  private async updateData() {
    if (this.formEventData.selectedTime != '' && this.formEventData.title != '')
    {
      let tempTime = this.formEventData.selectedTime.split(' - ')
      let startTime = tempTime[0]
      let endTime = tempTime[1]
      console.log(this.formEventData.selectedTime)
      this.eventData.startTime = this.date + "T" + startTime + ":00" + "+08:00"
      this.eventData.endTime = this.date + "T" + endTime + ":00" + "+08:00"
      console.log(this.eventData)

      let attendeeStr = ''
      for (let i in this.formEventData.attendee) {
        console.log(this.formEventData.attendee[i])
        attendeeStr += String(this.formEventData.attendee[i])
        attendeeStr += '/'
        sendMail(this.formEventData.attendee[i], 'Meeting Invite Notification!!!', 'You have been invite to the this meeting by handsome boy,\nmeeting time: ' + this.eventData.startTime + " - " + this.eventData.endTime)
      }

      await updateEvents(this.eventData.startTime, this.eventData.endTime, this.formEventData.title, this.formEventData.description, attendeeStr, this.eventData.calendarID, this.eventData.eventID)
      this.editEventDialogVisible = false
      console.log(this.formEventData)
      this.getEventList()
    }
    else {
      this.$message({
        message: '請輸入會議名稱及時間',
        type: 'error',
        duration: 2000
      })
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
.mylogo {
  font-family: "Arial";
  font-size: 48px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(115, 175, 121, 1);
  text-align: center;
  margin-bottom: 60px;
}
.input {
  font-family: "Arial";
  font-size: 48px;
  font-weight: 30;
  line-height: 12px;
  color: rgba(115, 175, 121, 1);
  align-self: stretch;
  text-align: center;
  margin-bottom: 97px;
}

</style>