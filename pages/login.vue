<template>
  <div id="loginBox">
       <div class="login-box">
      <div class="login-logo">
         <a href="#"><b>Appoint</b>Med</a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
         <div class="card-body login-card-body">
            <p class="login-box-msg">Sign in to start your session</p>
           
               <div class="input-group mb-3">
                  <input v-model="email" type="email" class="form-control" placeholder="Email">
                  <div class="input-group-append">
                     <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                     </div>
                  </div>
               </div>
               <div class="input-group mb-3">
                  <input v-model="password" type="password" class="form-control" placeholder="Password">
                  <div class="input-group-append">
                     <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                     </div>
                  </div>
               </div>
               <div class="row">
                 
                  <!-- /.col -->
                  <div class="col-12">
                     <button @click="login" type="submit" class="btn btn-primary btn-block">Sign In</button>
                  </div>
                  <!-- /.col -->
               </div>
            
         </div>
         <!-- /.login-card-body -->
      </div>
   </div>
  </div>
</template>


<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

import Vue from 'vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);
export default {
  layout:'none',
  data(){
      return{
        email:'',
        password:''
      }
  },
  methods:{
    login () {
      console.log('Clicked')
        let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
            onCancel: this.onCancel,
            color: '#c91010',
            loader: 'bars',
            width: 80,
            height: 100,
            })
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
        loader.hide()  
        this.$router.push('/doctors')
      //   this.$store.commit('changeAuthState',true);
      //   this.$store.commit('getUserDetails',user);
        console.log(user.user.email)
        localStorage.setItem('user-email',user.user.email)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
#loginBox {
  position: fixed; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>