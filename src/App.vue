<template>
  <div id="app">
    <el-header align="left">
    
        <div class='fcenter'>VRRA
        <div class='fright'>
          <el-button
          type="primary"
          class="button"
          @click="$router.push('DateSelect')"
        >
        RESERVE
        </el-button>
        <el-button
          type="primary"
          class="button"
          @click="$router.push('UserMeeting')"
        >
        MY MEETING
        </el-button>
        </div>
        </div>
        
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
.header {
  text-align:center;
}
.fright {
  float:right;
}
.fcenter {
  font-family: "Arial";
  font-size: 64px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(115, 175, 121, 1);
  margin-left:60px;
}
.button {
  background-color: rgba(115, 175, 121, 1);
  color: rgba(255, 255, 255, 1);
  font-weight: bolder;
  font-family: "Arial";
  border-radius: 4px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
