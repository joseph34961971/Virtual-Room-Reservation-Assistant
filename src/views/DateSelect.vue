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
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { component } from 'vue/types/umd';
import About from './views/About.vue';

@Component({
  name: 'dateSelect'
})

export default class test extends Vue {
  private testDate = ''
  private value = ''
  private date = ''

  private test() {
    console.log(this.value)
  }

  private logout() {
    console.log('haha')
  }

  private enterDate() {
    console.log(this.date)
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
