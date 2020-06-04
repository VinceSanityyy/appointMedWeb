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
                    <div class="card-body">
                        <table id="myTable" class="table table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doctor,key) in doctors" :key="key">
                                    <td>{{doctor.name}}</td>
                                    <td>{{doctor.address}}</td>
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
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent = "addDoctor">
            <div class="modal-body">
                 <div class="form-group">
                        <label for="exampleInputEmail1">Doctor Name</label>
                        <input v-model="name" type="text" required class="form-control"  placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Address</label>
                        <input v-model="address" type="text" required class="form-control"  placeholder="Address">
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

import Vue from 'vue'
import toastr from 'admin-lte/plugins/toastr/toastr.min.js'
// Vue.use(toastr)
// window.toastr = require('toastr')
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);
export default {
    layout:'adminLte',
    data(){
        return{
            editmode:false,
            name:'',
            address:'',
            doctors:[]
        }
    },
    methods:{
        addModal(){
            this.editMode = false
            // this.clearValues()
            $('#exampleModal').modal('show')
        },
         myTable(){
            $(document).ready( function () {
                $('#myTable').DataTable();
            });
        },
        addDoctor(){
            console.log('hello doc')
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                onCancel: this.onCancel,
                color: '#c91010',
                loader: 'bars',
                width: 80,
                height: 100,
            })
            firebase.database().ref('doctors').push({
                name: this.name,
                address: this.address
            }).then((res)=>{
                console.log('successadd')
                loader.hide()  
                toastr.success('Added!')
                $('#exampleModal').modal('hide')
            }).catch((err)=>{
                console.log(err)
                loader.hide()  
            })
        },
        getDoctors(){
            firebase.database().ref('doctors').on('value',(snapshot)=>{
                this.doctors = snapshot.val()
                this.myTable()
                console.log(snapshot.val())
            })
        }
    },
    created(){
        this.getDoctors()
        toastr.success('Added!')
    }
}
</script>

<style>

</style>