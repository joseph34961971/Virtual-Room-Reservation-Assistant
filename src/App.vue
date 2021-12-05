<template>
  <div id="app">
    <el-button
      type="success"
      @click="test"
    >
      按我!
    </el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { component } from 'vue/types/umd';

@Component({
  components: {
    test
  }
})

export default class test extends Vue {
  private num = '10'

  private test() {
    console.log(this.num)
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
