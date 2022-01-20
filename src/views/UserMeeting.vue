<template>
  <div class="UM">
    <el-page-header
      content="User Meeting Page"
      @back="$router.back(-1)"
    >
    </el-page-header>
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
        <el-table-column
          label="時區"
          align="center"
          width="120px"
          prop="first_name"
          sortable="custom"
        >
          <template slot-scope="{row}">
            <span>{{ row.timeZone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="與會者"
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
      width="60%"
    >
      <el-form
        ref="dataForm"
        :model="eventData"
        label-width="100px"
        style="width: 700px; margin-left:120px;"
        align="left"
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
          label="詳細資訊"
        >
          <el-input
            type="textarea"
            :rows="5"
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
            @click="updateData"
          >
            確認預約
          </el-button>
          <el-button @click="reservationFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator'
import { listUpcomingEvents, handleClientLoad, insertEvents, sendMail, getEvent, deleteEvents } from '@/apis/googleCal'
import { MongoGetUserList } from '@/apis/mongoTest'
import { event } from 'jquery'
import { get } from 'http'

@Component({
  name: 'dateSelect'
})

export default class test extends Vue {
  private userName = ''
  private userEmail = ''
  private roomOptions = [
    { value: 'okuif14nfltn6dumpe0p187dms@group.calendar.google.com', label: 'Room1' },
    { value: 'jteos2j98hjiu82j78e89quoss@group.calendar.google.com', label: 'Room2' },
    { value: '6jrgjttjpsnt5v519rr84o8m90@group.calendar.google.com', label: 'Room3' },
    { value: '3ctok2t3skph001bj29s4onfm4@group.calendar.google.com', label: 'Room4' },
    { value: 'jo63b6s8sn678tcesnpge03a6k@group.calendar.google.com', label: 'Room5' }
  ]
  private eventList = [{}]
  private defaultEvent = {
    title: '',
    room: '',
    startTime: '',
    endTime: '',
    timeZone: '',
    attendee: '',
    eventID: '',
    calendarID: ''
  }

  private eventData = {
    title: '',
    room: '',
    startTime: '',
    endTime: '',
    timeZone: '',
    attendee: '',
    eventID: '',
    calendarID: ''
  }
  private editEventDialogVisible = false

  private userCalendarID = 'ooaqmbmd22ec3qfsmk015588j8@group.calendar.google.com'
  private userEventID = "dqqvsk5f6s60e44d3bkfjiepns"

  private listLoading = false

  created() {
    handleClientLoad()
    this.getUserInfo()
    this.getEventList()
  }
  
  private async getUserInfo() {
    const temp = await getEvent(this.userCalendarID, this.userEventID)
    console.log(temp)
    this.userName = temp.summary
    this.userEmail = temp.description
  }

  private async getEventList() {
    this.listLoading = true
    await this.getUserInfo()
    for (let i in this.roomOptions) {
      //console.log(this.roomOptions[i].value)
      const data = await listUpcomingEvents(this.roomOptions[i].value)
      //console.log(data)
      //console.log('****************************')
      if (data != 0) {
        for (let j in data) {
          console.log(data[j])
          if (data[j].description.search(this.userEmail) != -1) {
            // let tempEvent = this.defaultEvent
            // tempEvent.title = data[j].summary
            // tempEvent.room = data[j].organizer.displayName
            // tempEvent.startTime = data[j].start.dateTime
            // tempEvent.endTime = data[j].end.dateTime
            // tempEvent.timeZone = data[j].start.timeZone
            // tempEvent.attendee = data[j].description

            const tempEvent = {
              title: data[j].summary,
              room: data[j].organizer.displayName,
              startTime: data[j].start.dateTime,
              endTime: data[j].end.dateTime,
              timeZone: data[j].start.timeZone,
              attendee: data[j].description,
              eventID: data[j].id,
              calendarID: this.roomOptions[i].value
            }
            
            this.eventList.push(tempEvent)
          }
        }
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
      await deleteEvents(eventID, calendarID)
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
    this.editEventDialogVisible = true
    console.log(this.eventData)
  }

  private async updateData() {
    console.log('update ')
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
  font-family: "Sora";
  font-size: 64px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(115, 175, 121, 1);
  text-align: center;
  margin-bottom: 40px;
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