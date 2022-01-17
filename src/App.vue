<template>
  <div id="app">
    <el-header align="right">
        <el-button
          type="primary"
          @click="$router.push('/')"
        >
          <i class="el-icon-s-home"></i>
        </el-button>
        <el-button
          type="primary"
          @click="$router.push('UserMeeting')"
        >
          <i class="el-icon-s-custom"></i>
        </el-button>
      </el-header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { component } from 'vue/types/umd';

@Component({
  name: 'appContainer',
  data: function() {
    return {
      message: 'test message'
    } 
  }
})

export default class test extends Vue {
  private testDate = ''

  private test() {
    console.log(this.testDate)
  }

}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
