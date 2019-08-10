<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="content">
      <div v-if="activetab === 1" class="tabcontent">
        <dataTable></dataTable>
      </div>
      <div v-if="activetab === 2" class="tabcontent">
        <div class="tabTwoDiv">
          <div class="row">
            <div class="col">
              <label class="text">User ID:</label>
            </div>
            <div class="col">
              <input type="text" class="form-control" id="user_id" />
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col">
              <label class="text">User First Name:</label>
            </div>
            <div class="col">
              <input type="text" class="form-control" id="user_firstName" />
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col">
              <label class="text">User Last Name:</label>
            </div>
            <div class="col">
              <input type="text" class="form-control" id="user_lastName" />
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col">
              <label class="text">User Age:</label>
            </div>
            <div class="col">
              <input type="number" min="0" class="form-control" id="user_age" />
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col">
              <button class="btn-lg btn-success text" id="submit" v-on:click="addUser()">Submit</button>
            </div>
          </div>
          <br />
          <label class="text text-center alert" id="errorMsg"></label>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import dataTable from "@/components/dataTable.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    dataTable
  }
};
</script>
