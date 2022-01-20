<template>
  <div class="ra-register">
    <div class="flex-wrapper-one">
      <p class="input">Register</p>
        <el-form
          ref="form"
          class="text-area"
          v-loading="loading"
          :model="form"
        >          
          <h2
          class="label">First Name</h2>
          <el-form-item>
            <el-input
              class="input-two"
              v-model="form.firstName"      
            />
          </el-form-item>
          <h2
          class="label">Last Name</h2>
          <el-form-item>
            <el-input
              class="input-two"
              v-model="form.lastName"            
            />
          </el-form-item>
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
          <h2
          class="label">Confirm Password</h2>
          <el-form-item>
            <el-input
              class="input-two"
              v-model="form.confirmPassword"              
            />
          </el-form-item>
          <h2
          class="label">Email</h2>
          <el-form-item>
            <el-input
              class="input-two"
              v-model="form.mail"              
            />
          </el-form-item>
        </el-form>
      <div class="flex-wrapper-two">
        <p class="input-three"><router-link :to="{name:'Login'}">Back to login</router-link></p>
        <el-button
          class="button"
          @click="submit"
        >
          Register
        </el-button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { component } from 'vue/types/umd';
import About from './views/About.vue';
import {handleClientLoad,handleAuthClick,initAuth,testAdd,handleSignoutClick,sendMail,listUpcomingEvents,getEvent} from '@/apis/googleCal';
import {MongoAddUser,MongoGetUserList} from '@/apis/mongoTest';

@Component({
  name: 'registration'
})

export default class test extends Vue {
  private testDate = ''
  private value = ''
  private date = ''
  private form = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmPassword: '',
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
    console.log(this.form.firstName)
    console.log(this.form.mail)
    
    //handleAuthClick(this.form.firstName);
  }

  private initAuthN()
  {
    initAuth();
  }

  private addEvent()
  {
    testAdd();
  }

  private signOut()
  {
    handleSignoutClick(this.form.firstName);
  }

  private async sendNotification()
  {
    //sendMail('jeff99998888@yahoo.com','d','ad');
    const temp = await getEvent('vtchjno2gq18jhundmsr1rjbno@group.calendar.google.com','io3fiuum12prqoiicl2j8mfi20');
    console.log(temp);
  }

  private async testMongo()
  {
    MongoAddUser(this.form.firstName,this.form.lastName,this.form.userName,this.form.mail,this.form.password);
  }

  private async getMongoUsers()
  {
    const userList = await MongoGetUserList();
    console.log(userList);
  }

  created()
  {
    handleClientLoad();
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
  margin-bottom: 98px;
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
  margin-top: 2px;
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
  margin-bottom: 16px;
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
  align-self: stretch;
  align-items: left;
  margin-left: 0px;
  display: flex;
}
.button {
  background-color: rgba(115, 175, 121, 1);
  color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
}
.text-label {
  width: calc(100%);
  font-family: "Arial";
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.14px;
}
</style>

