<script setup>

import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';

import { ref, onMounted } from 'vue';
import { sidebarWidthNum } from '../sidebar/state';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });

//get user from local storage
const user = ref(JSON.parse(localStorage.getItem('user')));
const Categories = ref([]);
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
  const fromWho = ref('');
const router = useRouter();
const route = useRoute();
const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');
const ticket_id = route.params.id;
console.log("ticket_id: " + ticket_id);
let statusT = '';
const ticket = ref({
    title: '',
    description: '',
    category_id: '',
    user_id: '',
    
});
const ticketDb = ref({
});

// if (ticket_id != 0) {
//     const ticket = async () => {
//         const response = await fetch('http://localhost:8000/api/tickets/' + ticket_id);
//         ticket.value = await response.json();
//     };
//     onMounted(fetchIssues);
// } 

// fetch ticket from database by id 


  onMounted(async () => {
    const response = await fetch('http://localhost:8000/api/categories');
    const data = await response.json();
    Categories.value = data;

    setTitle()
    console.log('hello')
    console.log(Categories.value);
});


function saveTicket() {
  ticket.value.user_id= user.value.id; 
  // save to database using axios
  console.log("ticket.value: " + ticket.value.user_id);
  axios.post('http://localhost:8000/api/tickets', ticket.value)
  .then(function (response) {
    console.log(response);
    toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Ticket Created successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "success",

                      });
    router.push({ name: 'ticketlist' });
  })
  .catch(function (error) {
    console.log(error);
  });



}
//axios categorise from the database /api/categories 


function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}
// Create a reactive reference

console.log("whosAuthenticated from tickett page 1: " + whosAuthenticated);
console.log("localStorage.getItem('token'): " + localStorage.getItem('token'));
console.log("localStorage.getItem('user'): " + localStorage.getItem('user'));
// console.log("localStorage.getItem('user').role: " + JSON.parse(localStorage.getItem('user')).role);

const props = defineProps({
     addORedit: {
         type: String,
     }
});

const statuses = ref(['OPEN','PENDING','CLOSED']);

function   cancel(){
  router.push('/')
}

var title = ref('');
var subtitle = ref('');
async function setTitle() {
  subtitle.value = '';
  title.value = 'Add new Ticket ';
}
  import Title from '@/components/Partials/Title.vue';
</script>

<template>

<div id="app">
    <Sidebar></Sidebar>
    <MainNavBar></MainNavBar> 
    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <!-- ADD NEW ISSUE  -->
        <div >
                  <Title :title=title :subtitle=subtitle></Title>
                      <h3 class="mx-5" for="Title">Title</h3>

                    <div  style="margin-bottom: 20px;" class="d-flex justify-content-around">  

                      <div  class="input-group input-group-lg mx-5">
                      <input type="email" class="form-control" v-model="ticket.title" id="Title" aria-describedby="emailHelp" placeholder="Enter Ticket Title">
                      </div>

                  <div>
                  
                  </div>

                      <div class="input-group nput-group-lg rounded ">
                        <select  v-model="ticket.category_id" style="width: 200px;" class="custom-select" id="inputGroupSelect02">
                          <option v-for="(category, index) in Categories" :value="category.id" :key="index">{{ category.name }}</option>
                        </select>
                        <div class="input-group-append input-group-lg" style="margin-left: 7px;">
                          <label class="input-group-text" for="inputGroupSelect02">Category</label>
                        </div>
                      </div>
                          
                
                    </div>   

                    <div v-if="(whosAuthenticated == 'ADMIN' || whosAuthenticated == 'RESPONSIBLE')" style="margin-right: 150px;" ><!-- //status input  -->
                    <div class="input-group nput-group-lg rounded mx-5 d-flex justify-content-center "  >
                        <select v-model="ticket.status" style="width: 200px;" class="custom-select" id="inputGroupSelect02">
                          <option selected v-for="(status, index) in statuses" :value="status" :key="index">{{ status  }}</option>
                        </select>
                        <div class="input-group-append input-group-lg" style="margin-left: 7px;">
                          <label class="input-group-text" for="inputGroupSelect02">Status</label>
                        </div>
                        </div></div>

                  <h3 class="mx-5" style="margin-top: -20px;" for="Content" >Ticket Content</h3>

                  <div  style="margin-top: -50px;"  class="d-flex justify-content-around mx-5">  
                    <div class="input-group mt-5">
                    <textarea v-model="ticket.description" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                    </div>
                    </div>
          </div>
          <div class="d-flex justify-content-around" style="margin-top: 30px;">
          <button type="button" style="width: 100px; height: 100px;" @click="saveTicket()" class="btn btn-success btn-lg btn-block rounded-circle ">Save</button>
          <button type="button" style="width: 100px; height: 100px;" class="btn btn-danger btn-lg btn-block rounded-circle ">Cancel</button>
        </div>

      </div>
      </div>
    
</template>

<style scoped>
#app {
  
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
