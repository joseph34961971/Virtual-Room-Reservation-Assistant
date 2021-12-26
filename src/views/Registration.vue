<template>
  <div>
    <el-header>
      註冊
    </el-header>
    <div class="edit-form">
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        label-position="right"
        label-width="180px"
      >
        <el-form-item
          label="姓名"
        >
          <el-input
            v-model="form.name"
          />
        </el-form-item>
        <el-form-item
          label="電子信箱"
        >
          <el-input
            v-model="form.mail"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  private form = {
    name: '',
    mail: ''
  }
  private loading = false

  private test() {
    console.log(this.value)
  }

  private logout() {
    console.log('haha')
  }

  private enterDate() {
    console.log(this.date)
  }

  private submit() {
    console.log(this.form.name)
    console.log(this.form.mail)
  }

}
</script>

<style scoped>
.app-container {
  width: 100%;
}

.edit-form {
  width: 50%;
  margin: auto;
}
</style>
