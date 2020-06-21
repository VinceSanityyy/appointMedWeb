<template>
  <div>
        <div class="content-header">
          <div class="container-fluid">
              <div class="row mb-2">
                  <div class="col-sm-6">
                      <h1 class="m-0 text-dark">
                          Clinic Locations
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
                  <div class="col-md-3">
                      <div class="card card-primary card-outline">
                          <div class="card-header">
                                <h3 class="card-title">
                                <i class="fas fa-hospital"></i>
                                Clicnic Details
                                </h3>
                            </div>
                          <div class="card-body table-responsive">
                            <!-- <div class="form-group">
                                <label>Latitude</label>
                               <input type="text" class="form-control" disabled v-model="clickedEvent.lat">
                            </div>
                            <div class="form-group">
                                <label>Longitude</label>
                               <input type="text" class="form-control" disabled v-model="clickedEvent.lng">
                            </div> -->
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
                             <div class="form-group">
                               <button @click="addClinic" class="btn btn-primary btn-block">Submit Changes</button>
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
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
export default {
    layout:'adminLte',
    data(){
        return{
            address:{
                lat:7.0650673,
                lng:125.5961476
            },
            clickedEvent:{
                lat:0,
                lng:0
            },
            clinicName:'',
            clinicAddress:'',
            imageFile: null,
            image:'',
            imageUrl:'',
            upload:''
        }
    },
    methods:{
           initMap() {
            //center marker from circle
            var center = new google.maps.LatLng(this.address.lat, this.address.lng)
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: center
            })
            // const circle = new google.maps.Circle({
            //     map: map,
            //     trokeColor: '#FF0000',
            //     strokeOpacity: 0.8,
            //     strokeWeight: 2,
            //     fillColor: '#FF0000',
            //     fillOpacity: 0.35,
            //     radius: 3000,
            //     center: center
            // });
            const marker = new google.maps.Marker({
                position: this.address,
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            });


            let parent = this;
          
            const eventClicked = map.addListener('click', function(mapsMouseEvent) {
              
                console.log(mapsMouseEvent.latLng.lat())
                console.log(mapsMouseEvent.latLng.lng())
               
                parent.clickedEvent.lat = mapsMouseEvent.latLng.lat()
                parent.clickedEvent.lng = mapsMouseEvent.latLng.lng()
                
                var clickedMarker = new google.maps.Marker({
                    position: parent.clickedEvent,
                    title:"Hello World!"
                });
                console.log(parent.clickedEvent)

                clickedMarker.setMap(map);
                
            });
            

            // other Markers
            // for (var i = 0; i < this.values.data.length; i++) {
            //     var coords = this.values.data[i].coord;
            //     var details = this.values.data[i].name;
            //     var latLng = new google.maps.LatLng(coords['lat'], coords['lng']);
            //     var markers = new google.maps.Marker({
            //         position: latLng,
            //         map: map,
            //         icon: {
            //             url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            //         },
            //         size: new google.maps.Size(20, 20),
            //     });
            //     const contentString = '<div id="content"><p>' + details + '</p></div>';
            //     //for Info windows function
            //     this.infoWindowShow(markers, contentString);
            //     this.markersInfo.push(markers)
            // }

            //   console.log("Here")
            //   console.log(document.getElementById('map').offsetHeight)
            //   console.log(document.getElementById('map').offsetWidth)
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
        getCoordinates(lat,lng){
            console.log('HELLO')
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
        addClinic(){
            console.log('Clinic Added!')
             let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                onCancel: this.onCancel,
                color: '#c91010',
                loader: 'bars',
                width: 80,
                height: 100,
            })
            console.log(this.imageUrl)
            firebase.database().ref('clinics').push({
                name: this.clinicName,
                address: this.clinicAddress,
                lat: this.clickedEvent.lat,
                lng: this.clickedEvent.lng,
                image: this.imageFile.name,
                imageUrl: this.imageUrl
            }).then((res)=>{
                console.log('Added Successfully')
                loader.hide()
                toastr.success('Added!')
                this.image.put(this.imageFile)
            }).catch((err)=>{
                console.log(err)
                loader.hide()
            })

        }
    },
    mounted(){
        this.loadScript()
    }
}
</script>

<style>

</style>