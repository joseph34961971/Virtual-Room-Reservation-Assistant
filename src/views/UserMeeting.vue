<template>
  <div class="UM">
    <div class="flex-wrapper-one">
      <p class="input">My Meeting</p>
        <el-table :data ="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
        <el-button
            type="success"
            @click="data"
          >
          確認
          </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator'
import { component } from 'vue/types/umd';
import About from './views/About.vue';


export default class test extends Vue{
  private data(){
    return{
      tableData: [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
    }
  }
}
</script>

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