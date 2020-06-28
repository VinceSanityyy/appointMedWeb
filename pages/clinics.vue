<template>
  <div>
    <div class="content-header">
          <div class="container-fluid">
              <div class="row mb-2">
                  <div class="col-sm-6">
                      <h1 class="m-0 text-dark">
                          Clinic List
                      </h1>
                  </div>
                  <div class="col-sm-6">
                      <ol class="breadcrumb float-sm-right">
                          <li class="breadcrumb-item">
                              <a href="">Home</a>
                          </li>
                          <li class="breadcrumb-item active">
                              Clinic List
                          </li>
                      </ol>
                  </div>
              </div>
          </div>
      </div>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-hospital"></i>
                                Clinic List
                            </h3>
                        </div>
                        <div class="card-body table-responsive" style="overflow-y: auto; height: 610px;">
                            <div @click="editModal(clinics,index)" v-for="(clinics,index) in clinic" :key="index" class="callout callout-success" style="cursor: pointer">
                                <h5>{{clinics.name}}</h5>
                                <p>{{clinics.address}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                <div class="card card-primary card-outline">
                    <div class="card-body table-responsive">
                        <div id="map"  style="width: 1200px; height: 600px">
                                    
                        </div>
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
                <h5 class="modal-title" id="exampleModalLabel">Update Clinic</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <div class="form-group">
                                <label>Clicnic Name</label>
                               <input type="text" class="form-control" v-model="clinicName">
                            </div>
                             <div class="form-group">
                                <label>Display Address</label>
                               <input type="text" class="form-control" v-model="clinicAddress">
                            </div>
                             <div class="form-group">
                                <label >Picture</label>
                                <input @change="onFileSelected" type="file" required class="form-control"  placeholder="Address">   
                            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button  @click="updateClinic"  class="btn btn-primary">Save changes</button>
            </div>
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
            address:{
                lat:7.0650673,
                lng:125.5961476
            },
            clinic:[],
            clinicArray:[],
            markersInfo:[],
            image:'',
            imageUrl:'',
            upload:'',
            editMode:false,
            key:'',
            clinicName:'',
            clinicAddress:'',
            lat:'',
            lng:''
        }
    },
    methods:{
         initMap(){

            var center = new google.maps.LatLng(this.address.lat, this.address.lng)
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: center
            })
            
            for (let [key, clinic] of Object.entries(this.clinic)) {
                var clinicLat = clinic.lat;
                var clinicLng = clinic.lng;
                var details = clinic.name;
                var latLng = new google.maps.LatLng(clinicLat,clinicLng);
             
                var markers = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    },
                    size: new google.maps.Size(20, 20),
                });
                const contentString = '<div id="content"><p>' + details + '</p></div>';
                //for Info windows function
                
                this.infoWindowShow(markers, contentString);
                this.markersInfo.push(markers)
            }
        },
        loadScript() {
            if (window.google && window.google.maps) {
                this.initMap();
                return;
            }
            var self = this;
            var script = document.createElement("script");
            script.onload = function() {
                if (!window.google && !window.google.maps)
                    return void(console.error("no google maps script included"));
                self.initMap();
            };
            script.async = true;
            script.defer = true;
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZS1-x2tYC7qwUoiCsy3pJdezTeo2O6xA&libraries=geometry";
            document.getElementsByTagName("head")[0].appendChild(script);
        },
        infoWindowShow(markers, contentString) {
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            markers.addListener('click', function() {
                infowindow.open(markers.get('map'), markers);
            });
        },
        showMarker(id) {
            google.maps.event.trigger(this.markersInfo[id], 'click');
            console.log('clicked')
            console.log(this.markersInfo[id])
        },
        getClinicsList(){
              firebase.database().ref('clinics').on('value',(snapshot)=>{
                this.clinic = snapshot.val()
                this.loadScript()
            })
        },
        onFileSelected(event){ 
            console.log(event)
            this.imageFile = event.target.files[0]
            this.image = firebase.storage().ref('clinicImages/' + this.imageFile.name)
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
         editModal(clinics, index){
            this.editmode = true
            console.log(index)
            console.log(clinics)
            this.clinicName = clinics.name,
            this.clinicAddress = clinics.address
            this.key = index
            this.lat = clinics.lat
            this.lng = clinics.lng
            $('#exampleModal').modal('show')
        },
        updateClinic(){
            firebase.database().ref('clinics/' + this.key).set({
                name: this.clinicName,
                address: this.clinicAddress,
                // image: this.imageFile.name,
                imageUrl: this.imageUrl,
                lat: this.lat,
                lng: this.lng
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
            this.clinicName=''
            this.clinicAddress=''
            this.imageUrl=''
            this.key = ''
        },
    },
    created(){
        // console.log('created')
        this.getClinicsList()
        if (localStorage.getItem("user-email") === null) {
         this.$router.push('/login')
        }
    },
    mounted(){
        this.loadScript()
    },
    computed: {
        date() {
            return Object.entries(this.clinic);
        }
  }
}
</script>

<style>

</style>