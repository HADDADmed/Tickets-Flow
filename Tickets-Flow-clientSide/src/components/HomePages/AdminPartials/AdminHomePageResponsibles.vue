<script setup>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { collapsed, toggleSidebar, sidebarWidth } from '@/components/sidebar/state.js';
import { sidebarWidthNum } from '@/components/sidebar/state';
import MainNavBar from '@/components/MainNavBar.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });

// fetching users from the database
import axios from 'axios';
import { onMounted, ref } from 'vue';
const users = ref([]);
async function fetchUsers() {
  axios.get('http://localhost:8000/api/users/role/USER')
  .then(response => {
    users.value = response.data;
  })
  .catch(error => console.log(error));
}

// fetching responsibles from the database

const responsibles = ref([]);
async function fetchResponsibles() {
  axios.get('http://localhost:8000/api/users/role/RESPONSIBLE')
  .then(response => {
    responsibles.value = response.data;
    setTitle();

  })
  .catch(error => console.log(error));
}

onMounted(async () => {
  fetchUsers();
  fetchResponsibles();
});

const props = defineProps(['whatShouldIDisplay'])
var title = ref('');
var subtitle = ref('');
async function setTitle() {
  subtitle = 'count of Responsibles : ' + responsibles.value.length;
  title = 'List of all Responsibles';
}

const ADMIN =   'ADMIN';
let newRole = '';

// changeRole function
function changeRole(userId, oldRole) {
  console.log("changeRole");
  console.log("userId: " + userId);
    if (oldRole == 'USER' || oldRole == 'user') {
      newRole = 'RESPONSIBLE';
    } else if (oldRole == 'RESPONSIBLE' || oldRole == 'responsible') {
      newRole = 'USER';
    }
  console.log("newRole: " + newRole);
  axios.put('http://localhost:8000/api/users/change-user-role',{
    id: userId,
    role: newRole
  })
  .then(function (response) {
    console.log(response);
    console.log("Role changed succefuly");
  })
  .catch(function (error) {
    console.log(error);
  });
  
  toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Role Responsible Changed to User Successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "success",

                      });
router.push('/');

}
import Title from '@/components/Partials/Title.vue';

function deleteUser(userId) {
  
  axios.delete(`http://localhost:8000/api/users/${userId}`)
    .then(response => {
      fetchResponsibles();
      toaster.show(`<div><i class="fa-solid fa-circle-check"></i> User Deleted Successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "error",
                      });
    })
    .catch(error => {
      console.error('Error deleting user:', error);
      toaster.error("Error deleting user");
    });
}
</script>
<template> 

<div id="app">
    <Sidebar></Sidebar>
   <MainNavBar :whosAuthenticated=ADMIN></MainNavBar> 

    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <div v-if="whatShouldIDisplay == 'USERS'"></div>
           <Title :title=title :subtitle=subtitle></Title>
       <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">ChRole</th>
                            <th scope="col">DelResp</th>
                           
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="responsible in responsibles">
                                <th scope="row">{{responsible.id}}</th>
                                <td>{{ responsible.fullName }}</td>
                                <td>{{ responsible.email  }}</td>
                                <td>{{responsible.role}}</td>
                                <td>
                                    <a @click="changeRole(responsible.id,responsible.role)" class="btn btn-sm bg-success hoverC" > <i class="fa-solid fa-clock-rotate-left"> </i></a>
                                    </td>
                                    <td>
                                    <a @click="deleteUser(responsible.id)" class="btn btn-sm bg-danger hoverC" > <i class="fa-regular fa-trash-can"></i></a>
                                    </td>
                                </tr>
                        
                        </tbody>
                      </table>
    </div>
    </div>
 
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
.hoverC:hover {
  opacity: 1;
  transform: scale(1.2); /* Slightly bigger on hover */

} 
</style>

