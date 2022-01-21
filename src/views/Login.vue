<template>
  <div class="ra-register">
    <div class="flex-wrapper-one">
      <p class="input">Login</p>
      <div class="flex-wrapper-two">
        <img
          alt=""
          class="mask"
          src="https://i.imgur.com/6Xhftd2.png"
        />
      </div>
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
              type="password"
              class="input-two"
              v-model="form.password"              
            />
          </el-form-item>
        </el-form>
      <div class="flex-wrapper-two">
        <p class="input-three"><router-link :to="{name:'Registration'}">Create account?</router-link></p>
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
import {MongoGetUserList} from '@/apis/mongoTest';

@Component({
  name: 'login'
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

  private async submit() {
    if(this.form.userName == "" || this.form.password == "" )
    {
      this.$message({
          message: '請填寫帳號或密碼!',
          type: 'error',
          duration: 3000
          });
          return;
    }

      const userList = await MongoGetUserList();
      const userListN = JSON.parse(userList);

      console.log(userListN);
      for(let i = 0;i<userListN.length;i++)
      {
        if(userListN[i].userName == this.form.userName && userListN[i].password == this.form.password)
        {
          this.$message({
          message: '歡迎，'+userListN[i].lastName+userListN[i].firstName,
          type: 'success',
          duration: 3000
          });
          this.$router.push('DateSelect');
          return;
        }
      }

      this.$message({
          message: '輸入的帳號或者密碼有誤!',
          type: 'error',
          duration: 3000
      });
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
  width: calc(100%);
  background-color: rgba(255, 255, 255, 1);
  padding: 0px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-left: 0px;
  border-radius: 20px;
  padding: 40px 100px 100px;
  box-shadow: 5px 8px 20px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: left;
  border: 2px solid rgba(0, 0, 0, 1);
}
.input {
  width: calc(100%);
  font-family: "Arial";
  font-size: 48px;
  font-weight: 30;
  line-height: 12px;
  color: rgba(115, 175, 121, 1);
  align-self: stretch;
  text-align: center;
}
.text-field {
  width: calc(100%);
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 7px 15px;
  display: flex;
  align-items: left;
  border: 1px solid rgba(0, 0, 0, 0.38);
}
.text-area {
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 328px;
}
.label {
  font-family: "Arial";
  font-size: 16px;
  // font-weight: 400;
  // line-height: 16px;
  color: rgba(0, 0, 0, 0.4);
  align-self: flex-start;
  align-items: left;
  margin-bottom: 2px;
}
.input-two {
  width: calc(100%);
  font-family: "Arial";
  font-size: 16px;
  // font-weight: 0;
  // line-height: 24px;
  // color: rgba(0, 0, 0, 0.87);
  align-self: flex-start;
  margin-bottom: 0px;
}
.text-field-two {
  width: calc(100%);
  margin-bottom: 24px;
  border-radius: 4px;
  padding: 7px 15px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.38);
}
.text-area-two {
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.flex-wrapper-two {
  width: calc(100%);
  display: flex;
  align-items: center;
}
.input-three {
  width: calc(100%);
  font-family: "Arial";
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  color: rgba(115, 175, 121, 1);
  align-items: left;
  margin-right: 14px;
  display: flex;
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
.text-label {
  font-family: "Arial";
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.14px;
}
.mask{
  margin-bottom: 60px;
}
</style>

