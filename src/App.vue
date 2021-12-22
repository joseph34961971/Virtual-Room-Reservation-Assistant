<template>
  <div id="app">
    <router-view/>
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
