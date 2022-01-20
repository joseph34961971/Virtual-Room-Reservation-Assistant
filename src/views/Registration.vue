<template>
  <div class="ra-register">
    <p class="mylogo">VRRA</p>
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
      <div class="flex-wrapper-two">
        <el-button
          class="button"
          @click="initAuthN"
        >
          initAuth
        </el-button>
        <el-button
          class="button"
          @click="addEvent"
        >
          testADd
        </el-button>
        <el-button
          class="button"
          @click="signOut"
        >
          signOut
        </el-button>
        <el-button
          class="button"
          @click="sendNotification"
        >
          sendMail
        </el-button>
      </div>
      <div class="flex-wrapper-two">
        <el-button
          class="button"
          @click="testMongo"
        >
          mongoTest
        </el-button>
        <el-button
          class="button"
          @click="getMongoUsers"
        >
          mongoTest
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

