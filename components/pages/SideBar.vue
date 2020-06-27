<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar elevation-4 sidebar-light-teal">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: .8"
      >
      <span class="brand-text font-weight-light">AppointMed</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="dist/img/user2-160x160.jpg"
            class="img-circle elevation-2"
            alt="User Image"
          >
        </div>
        <div class="info">
          <a href="#" class="d-block">Alexander Pierce</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column text-sm"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <nuxt-link to="doctors" class="nav-link">
              <i class="nav-icon fa fa-user-md" />
              <p>
                Doctors
              </p>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="specialist" class="nav-link">
              <i class="nav-icon fa fa-stethoscope" />
              <p>
                Speciality
              </p>
            </nuxt-link>
          </li>

          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-hospital" />
              <p>
                Clinics
                <i class="fas fa-angle-left right" />
              </p>
            </a>
           <ul class="nav nav-treeview">
             <li class="nav-item">
              <nuxt-link to="addClinic" class="nav-link">
                <p>
                <i class="far fa-circle nav-icon" />
                  Add Clinic
                </p>
              </nuxt-link>
             </li>
            <li class="nav-item">
              <nuxt-link to="clinics" class="nav-link">
                <p>
                <i class="far fa-circle nav-icon" />
                  Clinic List
                </p>
              </nuxt-link>
             </li>
           </ul>
          </li>
          <li class="nav-item">
            <a @click="logout"  href="#" class="nav-link">
              <i class="nav-icon fa fa-sign-out"></i>
              <p>
                Log Out
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>


<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
export default {
    methods:{
    logout(){
      this.$router.push('/login'),
      this.firebaseSignOut()   
    },
    firebaseSignOut(){
        firebase.auth().signOut().then(function() {
                console.log('gawas')
            }).catch(function(error) {
                console.log(error)
            })   
        }
    },
    mounted(){
      firebase.auth().onAuthStateChanged(user =>{
          console.log(user)
        //   this.user = user.email
      })
  }
}
</script>