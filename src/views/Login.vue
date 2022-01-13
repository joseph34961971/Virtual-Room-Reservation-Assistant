<template>
  <div class="ra-register">
    <el-page-header
      content="Date Select Page"
      @back="$router.back(-1)"
    >
    </el-page-header>
    <p class="mylogo">VRRA</p>
    <div class="flex-wrapper-one">
      <p class="input">Login</p>
        <el-form
          ref="form"
          class="text-area"
          v-loading="loading"
          :model="form"
        >
          <h2
          class="label">User Name</h2>
          <el-form-item>
            <el-input
              class="input-two"
              v-model="form.userName"             
            />
          </el-form-item>
          <h2
          class="label">Password</h2>
          <el-form-item>
            <el-input
              class="input-two"
              v-model="form.password"              
            />
          </el-form-item>
        </el-form>
      <div class="flex-wrapper-two">
        <p class="input-three"><router-link :to="{name:'Registration'}">Create account</router-link></p>
        <el-button
          class="button"
          @click="submit"
        >
          Login
        </el-button>
      </div>
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
    userName: '',
    password: ''
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
    console.log(this.form)
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


<style lang="scss" scoped>
.ra-register {
  background-color: rgba(255, 255, 255, 1);
  padding: 78px 420px 82px 72px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
.flex-wrapper-one {
  background-color: rgba(255, 255, 255, 1);
  margin-left: 348px;
  border-radius: 20px;
  padding: 69px 134px 130px;
  box-shadow: 5px 8px 20px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: left;
  border: 2px solid rgba(0, 0, 0, 1);
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
.text-field {
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 7px 15px;
  display: flex;
  align-items: left;
  border: 1px solid rgba(0, 0, 0, 0.38);
}
.text-area {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 296px;
}
.label {
  font-family: "Roboto";
  font-size: 12px;
  // font-weight: 400;
  // line-height: 16px;
  color: rgba(0, 0, 0, 0.6);
  align-self: flex-start;
}
.input-two {
  font-family: "Roboto";
  font-size: 16px;
  // font-weight: 0;
  // line-height: 24px;
  // color: rgba(0, 0, 0, 0.87);
  align-self: flex-start;
}
.text-field-two {
  margin-bottom: 24px;
  border-radius: 4px;
  padding: 7px 15px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.38);
}
.text-area-two {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.flex-wrapper-two {
  display: flex;
  align-items: center;
}
.input-three {
  width: calc(100% - 102px);
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(115, 175, 121, 1);
  align-self: stretch;
  margin-right: 14px;
}
.button {
  background-color: rgba(115, 175, 121, 1);
  border-radius: 4px;
  padding: 6px 11.5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-label {
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.14px;
}
</style>

