<template>
  <div class="ra-login">
    <h1>login page</h1>
    <router-link :to="{name:'Home'}">BackHome</router-link>
    <p class="my-logo">LOGO</p>
    <div class="flex-wrapper-one">
      <div class="flex-wrapper-two">
        <img
          alt=""
          class="mask"
          src="https://static.overlay-tech.com/assets/0269e77d-d347-4dd2-ac5a-5e9bb35f3d4b.png"
        />
      </div>
      <div class="acc-text-field">
        <div class="acc-text-area">
          <p class="acclabel">Account</p>
          <p class="account-input">Input</p>
        </div>
      </div>
      <div class="passtext-field">
        <div class="acc-text-area">
          <p class="acclabel">Password</p>
          <p class="account-input">Input</p>
        </div>
      </div>
      <div class="flex-wrapper-three">
        <p class="input"><router-link :to="{name:'Registration'}">create an account?</router-link></p>
        <div class="button">
          <p class="text-label">Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RaLogin"
};
</script>

<style lang="scss" scoped>
.ra-login {
  background-color: rgba(255, 255, 255, 1);
  padding: 78px 420px 82px 72px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.my-logo {
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
  padding: 114px 134px 160px;
  box-shadow: 5px 8px 20px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 1);
}
.flex-wrapper-two {
  background: linear-gradient(
    137deg,
    rgba(161, 203, 166, 1) -5%,
    rgba(44, 119, 53, 1) 108%
  );
  margin-bottom: 88px;
  border-radius: 50%;
  display: flex;
  align-items: flex-start;
}
.mask {
  width: 256px;
  height: 256px;
}
.acc-text-field {
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 7px 15px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.38);
}
.acc-text-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 296px;
}
.acclabel {
  font-family: "Roboto";
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.6);
  align-self: stretch;
}
.account-input {
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
  align-self: stretch;
}
.passtext-field {
  margin-bottom: 14px;
  border-radius: 4px;
  padding: 7px 15px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.38);
}
.flex-wrapper-three {
  display: flex;
  align-items: center;
}
.input {
  width: 160px;
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(115, 175, 121, 1);
  align-self: stretch;
  margin-right: 80px;
}
.button {
  background-color: rgba(115, 175, 121, 1);
  border-radius: 4px;
  padding: 6px 23.5px;
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