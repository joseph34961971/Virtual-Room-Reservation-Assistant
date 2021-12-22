<template>
  <div class="dateselect">
    <h1>This is an about page</h1>
    <el-date-picker
      v-model="testDate"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>

    <el-button
      type="success"
      @click="test"
    >
      確認!
    </el-button>
    <br>
    <router-link :to="{name:'Home'}">BackHome</router-link>
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