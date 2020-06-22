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
                        <div class="card-body table-responsive">

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
            markersInfo:[],
        }
    },
    methods:{
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
        initMap(){
            var center = new google.maps.LatLng(this.address.lat, this.address.lng)
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: center
            })

            // other Markers
            for (var i = 0; i < this.clinic.length; i++) {
                var clinicLat = this.clinic.data[i].lat;
                var clinicLng = this.clinic.data[i].lng;
                var details = this.clinic.data[i].name;
                var latLng = new google.maps.LatLng(clinicLat,clinicLng);
                var markers = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                    },
                    size: new google.maps.Size(20, 20),
                });
                const contentString = '<div id="content"><p>' + details + '</p></div>';
                //for Info windows function
                console.log('Markers' + markers)
                this.infoWindowShow(markers, contentString);
                this.markersInfo.push(markers)
            }
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
        },
        getClinicsList(){
              firebase.database().ref('clinics').on('value',(snapshot)=>{
                this.clinic = snapshot.val()
                console.log(snapshot.val())
                this.loadScript()
            })
        },
    },
    created(){
        console.log('created')
        this.getClinicsList()
    },
    mounted(){
        this.loadScript()
    }
}
</script>

<style>

</style>