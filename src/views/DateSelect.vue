<template>
  <div class="app" style="margin:20px 20px 20px 20px;">
    <el-page-header
      content="Date Select Page"
      @back="$router.back(-1)"
    >
    </el-page-header>
    <el-container class="app">
      <el-main style="margin:30px 200px 10px 200px;">
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
  
  create() {
    handleClientLoad()
  }

  private logout() {
    console.log('haha')
  }

  private enterDate() {
    //this.$router.push('Reservation')
    this.getList()
    this.reservationFormVisible = true
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
