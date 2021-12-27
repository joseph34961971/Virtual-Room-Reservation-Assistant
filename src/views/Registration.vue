<template>
  <div class="ra-register">
    <h1>login page</h1>
    <router-link :to="{name:'Home'}">BackHome</router-link>
    <p class="mylogo">LOGO</p>
    <div class="flex-wrapper-one">
      <p class="input">Register</p>
      <div class="text-field">
        <div class="text-area">
          <p class="label">First name</p>
          <p class="input-two">Input</p>
        </div>
      </div>
      <div class="text-field">
        <div class="text-area">
          <p class="label">Last name</p>
          <p class="input-two">Input</p>
        </div>
      </div>
      <div class="text-field">
        <div class="text-area">
          <p class="label">Username</p>
          <p class="input-two">Input</p>
        </div>
      </div>
      <div class="text-field">
        <div class="text-area">
          <p class="label">Password</p>
          <p class="input-two">Input</p>
        </div>
      </div>
      <div class="text-field">
        <div class="text-area">
          <p class="label">Confirm Password</p>
          <p class="input-two">Input</p>
        </div>
      </div>
      <div class="text-field-two">
        <div class="text-area-two">
          <p class="label">Email</p>
          <p class="input-two">Input</p>
        </div>
      </div>
      <div class="flex-wrapper-two">
        <p class="input-three"><router-link :to="{name:'Login'}">Back to login</router-link></p>
        <div class="button">
          <p class="text-label">register</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RaRegister"
};
</script>

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
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 1);
}
.input {
  font-family: "Roboto";
  font-size: 48px;
  font-weight: 400;
  line-height: 24px;
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
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.38);
}
.text-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 296px;
}
.label {
  font-family: "Roboto";
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.6);
  align-self: stretch;
}
.input-two {
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
  align-self: stretch;
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