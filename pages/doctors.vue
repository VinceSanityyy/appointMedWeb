<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">
              Doctors
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">
                Doctors
              </li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-primary card-outline">
                    <div class="card-header">
                        <button @click="addModal" class="btn btn-primary" style="float:right;">Add Doctor</button>
                    </div>
                    <div class="card-body table-responsive">
                        <table id="myTable" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Doctor Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Speciality</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doctor,key) in doctors" :key="key">
                                    <td>
                                        <img :src=doctor.imageUrl height="42" width="42" class="img-rounded">
                                    </td>
                                    <td>{{doctor.name}}</td>
                                    <td>{{doctor.address}}</td>
                                    <td>{{doctor.email}}</td>
                                    <td>{{doctor.speciality}}</td>
                                    <td>
                                        &emsp;
                                        <a href="#" >
                                        <i class="fa fa-edit" @click="editModal(doctor,key)"></i>
                                        </a>
                                        &emsp;
                                         <a href="#">
                                        <i class="fa fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Doctor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent = "editmode ? updateDoctor() : addDoctor()">
            <div class="modal-body">
                 <div class="form-group">
                        <label for="exampleInputEmail1">Doctor Name</label>
                        <input v-model="name" type="text" required class="form-control"  placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Address</label>
                        <input v-model="address" type="text" required class="form-control"  placeholder="Address">
                    </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input v-model="email" type="email" required class="form-control"  placeholder="Email">
                    </div>
                     <div class="form-group">
                        <label for="exampleInputEmail1">Specialization</label>
                        <v-select v-model="speciality"  :options="arr"></v-select>
                    </div>
                    <div class="form-group">
                        <label >Picture</label>
                        <input @change="onFileSelected" type="file" required class="form-control"  placeholder="Address">
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
            </form>
            </div>
        </div>
    </div>
    <!-- Modal -->
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import Vue from 'vue'
import toastr from 'admin-lte/plugins/toastr/toastr.min.js'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)
Vue.use(Loading);
export default {
    layout:'adminLte',
    data(){
        return{
            editmode:false,
            key:'',
            name:'',
            address:'',
            doctors:[],
            imageFile: null,
            image:'',
            specialist:[],
            speciality:'',
            arr:[],
            imageUrl:'',
            defaultPass: 'appointmed',
            email:''

        }
    },
    methods:{
        addModal(){
            // this.clearValues()
            console.log('add Modal')
            this.editmode = false
            $('#exampleModal').modal('show')
            
        },
        onFileSelected(event){ 
            console.log(event)
            this.imageFile = event.target.files[0]
            this.image = firebase.storage().ref('doctorImages/' + this.imageFile.name)
            this.upload = this.image.put(this.imageFile)
            var self = this
            self.upload.on('state_changed', function (snapshot) {
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  break;
              }
            }, function (error) {
                console.log(error)
            }, function () {
              self.upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                self.imageUrl = downloadURL;
              });
            });
        },
         myTable(){
            $(document).ready( function () {
                $('#myTable').DataTable();
            });
        },
        addDoctor(){
            console.log('hello doc')
            this.createDoctorInAuth()
        },
        getDoctors(){
            firebase.database().ref('users/doctors').on('value',(snapshot)=>{
                this.doctors = snapshot.val()
                this.myTable()
                console.log(snapshot.val())
            })
        },
        editModal(doctor, key){
            this.editmode = true
            console.log(key)
            console.log(doctor)
            this.name = doctor.name,
            this.address = doctor.address
            this.key = key
            this.email = doctor.email
            this.speciality = doctor.speciality
            $('#exampleModal').modal('show')
        },
        updateDoctor(){
            firebase.database().ref('users/doctors/' + this.key).set({
                name: this.name,
                address: this.address,
                email: this.email,
                uid: this.key,
                speciality: this.speciality,
                imageUrl: this.imageUrl
            }).then((res)=>{
                console.log('updated')
                toastr.success('Updated!')
                $('#exampleModal').modal('hide')
                this.editmode = false
                // this.getDoctors()
                this.clearValues()
            })
        },
        clearValues(){
            this.name=''
            this.address=''
            this.key=''
            this.speciality = ''
            this.email = ''
        },
        getSpecialityList(){
              firebase.database().ref('speciality').on('value',(snapshot)=>{
                this.specialist = snapshot.val()
                // console.log(snapshot.val())
                snapshot.forEach(ss => {
                    this.arr.push(ss.child('speciality').val());
                });
                console.log(this.arr);
            })
          
        },
        createDoctorInAuth(){
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                onCancel: this.onCancel,
                color: '#c91010',
                loader: 'bars',
                width: 80,
                height: 100,
            })
            firebase.auth().createUserWithEmailAndPassword(this.email, this.defaultPass).then((res)=>{
            console.log(res.user.uid)
            loader.hide()  

            firebase.database().ref('users/doctors/'+res.user.uid).set({
                name: this.name,
                address: this.address,
                image: this.imageFile.name,
                speciality: this.speciality,
                imgeUrl: this.imageUrl,
                email: this.email,
                uid: res.user.uid,
                type: 'doctor'
            }).then((res)=>{
                console.log('successadd')
                loader.hide()  
                toastr.success('Added!')
                $('#exampleModal').modal('hide')
                this.image.put(this.imageFile)
            }).catch((err)=>{
                console.log(err)
                loader.hide()  
            })
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Doctor Added in Auth Table')
            });
        }
    },
    created(){
        this.getDoctors()
        this.getSpecialityList()
        if (localStorage.getItem("user-email") === null) {
         this.$router.push('/login')
        }
    },
//      computed:{
//        isSignedIn(){
//            return  this.$store.state.authenticated;
//        }
//    }
}
</script>

<style>

</style>