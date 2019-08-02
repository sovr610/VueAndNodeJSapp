<template>
  <div id="tabs" class="container">
    <div class="tabs">
        <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">View Users</a>
        <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">Add User</a>
    </div>

    <div class="content">
      <div v-if="activetab === 1" class="tabcontent"> 
    <vdtnet-table
      ref="table"
      :fields="fields"
      :opts="options"
      :select-checkbox="1"
      :details="details"
    >

      <template slot="HEAD__details_control">
        Show Details
      </template>
    </vdtnet-table>
      </div>
      <div v-if="activetab === 2" class="tabcontent">
        <div class="tabTwoDiv">
          <div class="row">
            <div class="col">
              <label class="text">User ID:</label>
            </div>
            <div class="col">
              <input type="text" class="form-control" id="user_id"/>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col">
              <label class="text">User First Name:</label>
            </div>
            <div class="col">
              <input type="text" class="form-control" id="user_firstName"/>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col">
              <label class="text">User Last Name:</label>
            </div>
            <div class="col">
              <input type="text" class="form-control" id="user_lastName"/>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col">
              <label class="text">User Age:</label>
            </div>
            <div class="col">
              <input type="number" min="0" class="form-control" id="user_age"/>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col">
              <button class="btn-lg btn-success text" id="submit" v-on:click="addUser()">Submit</button>
            </div>
          </div>
          <br/>
          <label class="text text-center alert" id="errorMsg"></label>

        </div>
      </div>
    </div>
  </div>

</template>





<script>
import axios from 'axios';
import $ from 'jquery';

export default {
  name: "HelloWorld",
  data() {
    return {
      data: {

        singleUser: null,
        users: null,
        usersUpdateResponse: null,
        deleteUserResponse: null,
        addUserResponse: null,
        activetab: 1,
      },

      options: {
        ajax: {
          url: 'https://jsonplaceholder.typicode.com/users',
          dataSrc: (json) => {
            return json
          }
        },
        buttons: ['copy', 'csv', 'print'],
        /*eslint-disable */
        dom: "Btr<'row vdtnet-footer'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'pl>>",
        /*eslint-enable */
        responsive: false,
        processing: true,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: true,
        fixedHeader: true,
        saveState: true
      },
      fields: {
        id: {
          label: 'ID',
          sortable: true
        },
        actions: {
          isLocal: true,
          label: 'Actions',
          defaultContent: '<a href="javascript:void(0);" data-action="edit" class="btn btn-primary btn-sm"><i class="mdi mdi-square-edit-outline"></i> Edit</a>' +
            '<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete"></i> Delete</span>'
        },
        name: {
          label: 'Name',
          sortable: true,
          searchable: true,
          defaultOrder: 'desc'
        },
        username: {
          label: 'Username',
          sortable: false,
          searchable: true
        },
        email: {
          label: 'Email'
        },
        address: {
          label: 'Address',
          template: '{{ data.street }}, {{ data.suite }}, {{ data.city }} {{ data.zipcode }}'
        },
        phone: {
          label: 'Phone'
        },
        website: {
          label: 'Website',
          render: (data) => {
            return `https://${ data }`
          }
        }
      },
      quickSearch: '',
      details: {
        template: 'I\'m a child for {{ data.id }} yall'
      }


    }

  },

  props: {
    msg: String,
    activetab: 1,
  },
  methods: {
        doAjaxDelete(data, row, tr, target) {
      // do some ajax delete
      // then reload after ajax complete
      this.$refs.table.reload()
    },
    doSomethingAfterReload(data, table) {
      // some something after data loaded from server
    },
    getUsers: function(event){
      axios
      .get('http://localhost:8080/user')
      .then(response => (this.users = response))
      .catch(e => console.log(e));
    },
    addUser: function(event){
      var dat = {
        lastName: $('#user_lastName').val(),
        firstName: $('#user_firstName').val(),
        age: $('#user_age').val(),
        user_id: $('#user_id').val()
      };
       { crossdomain: true }
      axios.post('http://localhost:8080/user', {
        body: dat,
        crossdomain: true 
      })
      .then(response => {this.addUserResponse = response})
      .catch(e => console.log(e));
    },
    getUser: function(event){
      axios
      .get('http://localhost:8080/user?id=' + event)
      .then(response => (this.singleUser = response))
      .catch(e => console.log(e));
    },
    updateUser: function(event){
      axios
        .put("http://localhost:8080/user?id=" + event, event)
        .then(response => (this.usersUpdateResponse = response))
        .catch(e => console.log(e));
    },
    deleteUser: function(event){
       axios
        .delete("http://localhost:4444/user?id=" + event)
        .then(response => (this.deleteUserResponse = response))
        .catch(e => console.log(e));     
    }
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {  
    max-width: 620px; 
    min-width: 420px;
    margin: 40px auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
}

/* Style the tabs */
.tabs {
    overflow: hidden;
  margin-left: 20px;
    margin-bottom: -2px; // hide bottom border
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}

.tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}

/* Styling for active tab */
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}

/* Style the tab content */
.tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1
    
}

.tabTwoDiv{
  border-style:solid;
  border-width:1px;
  border-radius:10px;
  padding-top:20px;
  padding-bottom:20px;
  padding-right:20px;
}
</style>
