<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>

    <h2>Ecosystem</h2>
  <div class="row">
    <div class="col">
      <label class="text">User ID:</label>
    </div>
    <div class="col">
      <input type="text" class="form-control" id="user_id"/>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <label class="text">First Name</label>
    </div>
    <div class="col">
      <input type="text" class="form-control" id="first_name"/>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <label class="text">Last Name</label>
    </div>
    <div class="col">
      <input type="text" class="form-control" id="last_name"/>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <label class="text">age:</label>
    </div>
    <div class="col">
      <input type="text" class="form-control" id="age"/>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <button class="btn btn-success" v-on:click="add_user">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      users: null,
      msg: 'users'
    }
  },
  meathods:{
    add_user: function (event){
      axios.post('http://localhost:4444/user', {
        first
      })
        .then(response => (this.users = response));
    },
    get_users: function(){
      axios
        .get('http://localhost:4444/user')
        .then(response => (this.users = response));
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
