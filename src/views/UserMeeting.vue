<template>
  <div class="UM">
    <div class="flex-wrapper-one">
      <p class="input">My Meeting</p>
      <div class="meeting">
      <div>
          <p>2000/12/12</p>
          <p>Room3</p>
      </div>
      </div>
      <div class="meeting">
      <div>
          <p>2000/12/12</p>
          <p>Room3</p>
      </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex-wrapper-one {
  background-color: rgba(255, 255, 255, 1);
  margin-left: 348px;
  border-radius: 20px;
  padding: 10px 10px 10px;
  box-shadow: 5px 8px 20px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 1);
  
}
.meeting {
  background-color: rgba(255, 255, 255, 1);
  margin-left: 30px;
  border-radius: 20px;
  padding: 10px 60px 10px 60px;
  box-shadow: 5px 8px 20px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 1);
  float: left;
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
</style>