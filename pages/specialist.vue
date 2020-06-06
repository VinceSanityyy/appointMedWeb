<template>
  <div>
      <div class="content-header">
          <div class="container-fluid">
              <div class="row mb-2">
                  <div class="col-sm-6">
                      <h1 class="m-0 text-dark">
                          Doctor Speciality
                      </h1>
                  </div>
                  <div class="col-sm-6">
                      <ol class="breadcrumb float-sm-right">
                          <li class="breadcrumb-item">
                              <a href="">Home</a>
                          </li>
                          <li class="breadcrumb-item active">
                              Speciality
                          </li>
                      </ol>
                  </div>
              </div>
          </div>
      </div>
      <section class="content">
          <div class="container-fluid">
              <div class="row">
                  <div class="col-md-12">
                      <div class="card card-primary card-outline">
                          <div class="card-header">
                              <button class="btn btn-primary" @click="addModal" style="float:right">
                                  Add Doctor Speciality
                              </button>
                          </div>
                          <div class="card-body table-responsive">
                              <table id="myTable" class="table table-bordered table-striped">
                                  <thead>
                                      <tr>
                                          <th>
                                              Speciality
                                          </th>
                                          <th>
                                              Actions
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(data,key) in specialist" :key="key">
                                          <td>
                                              {{data.speciality}}
                                          </td>
                                          <td>
                                            &emsp;
                                            <a href="#" >
                                                <i class="fa fa-edit" @click="editModal(data,key)"></i>
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
                <h5 class="modal-title" id="exampleModalLabel">Speciality</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent = "editmode ? updateSpeciality() : addSpeciality()">
            <div class="modal-body">
                 <div class="form-group">
                        <label for="exampleInputEmail1">Speciality</label>
                        <input v-model="speciality" type="text" required class="form-control"  placeholder="Eg. Heart">
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
Vue.use(Loading);
export default {
    layout:'adminLte',
    data(){
        return{
            speciality:'',
            editmode:false,
            specialist:[],
            key:''
        }
    },
    methods:{
        addModal(){
            this.editmode = false
            $('#exampleModal').modal('show')
        },
        addSpeciality(){
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                onCancel: this.onCancel,
                color: '#c91010',
                loader: 'bars',
                width: 80,
                height: 100,
            })
            firebase.database().ref('speciality').push({
                speciality: this.speciality
            }).then((res)=>{
                console.log('successadd')
                loader.hide()  
                toastr.success('Added!')
                $('#exampleModal').modal('hide')
            })
        },
        getSpecialityList(){
              firebase.database().ref('speciality').on('value',(snapshot)=>{
                this.specialist = snapshot.val()
                this.myTable()
                console.log(snapshot.val())
            })
        },
        myTable(){
            $(document).ready( function () {
                $('#myTable').DataTable();
            });
        },
        editModal(data,key){
            this.editmode = true
            console.log(key)
            this.speciality = data.speciality,
            this.key = key
            $('#exampleModal').modal('show')
        },
        updateSpeciality(){
            firebase.database().ref('speciality/' + this.key).set({
                speciality: this.speciality
            }).then((res)=>{
                console.log('updated')
                toastr.success('Updated!')
                $('#exampleModal').modal('hide')
                this.key = ""
                this.speciality = ""
            })
        }
    },
    created(){
        this.getSpecialityList()
    }
}
</script>

<style>

</style>