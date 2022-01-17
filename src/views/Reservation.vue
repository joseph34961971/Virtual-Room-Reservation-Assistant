<template>
  <div class="app" style="margin:20px 20px 20px 20px;">
    <el-page-header
      content="Date Select Page"
      @back="$router.back(-1)"
    >
    </el-page-header>
    <el-container class="app">
      <el-main style="margin:30px 200px 10px 200px;">
        <!-- <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            :label="$t('table.actions')"
            align="center"
            width="200px"
            class-name="fixed-width"
          >
            <el-table-column
              :label="$t('account.number')"
              align="center"
              min-width="140px"
            >
              <template slot-scope="{row}">
                <span>{{ row.account_number }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table> -->
      </el-main>
      <el-dialog
        title="test"
        :visible.sync="vis"
        width="80%"
      >
        <h1>haha</h1>
      </el-dialog>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator'
import { listUpcomingEvents } from '@/apis/googleCal'
import { component } from 'vue/types/umd';
import About from './views/About.vue';

@Component({
  name: 'reservation'
})

export default class test extends Vue {
  private list = []
  private listLoading = true
  private vis = false
  private calendarId = 'ooaqmbmd22ec3qfsmk015588j8@group.calendar.google.com'

  create() {
    this.getList
  }

  private getList() {
    this.listLoading = true
    const data = listUpcomingEvents()
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