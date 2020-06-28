(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{198:function(t,e,l){var n=l(8),o=l(199)(!0);n(n.S,"Object",{entries:function(t){return o(t)}})},199:function(t,e,l){var n=l(10),o=l(25),c=l(20),r=l(49).f;t.exports=function(t){return function(e){for(var l,d=c(e),m=o(d),h=m.length,i=0,v=[];h>i;)l=m[i++],n&&!r.call(d,l)||v.push(t?[l,d[l]]:d[l]);return v}}},208:function(t,e,l){"use strict";l.r(e);l(24);var n=l(46),o=(l(26),l(15),l(198),l(23)),c=(l(191),l(192),l(1)),r=l(193),d=l.n(r),m=l(189),h=l.n(m);l(190);c.a.use(h.a);var v={layout:"adminLte",data:function(){return{address:{lat:7.0650673,lng:125.5961476},clinic:[],clinicArray:[],markersInfo:[],image:"",imageUrl:"",upload:"",editMode:!1,key:"",clinicName:"",clinicAddress:"",lat:"",lng:""}},methods:{initMap:function(){for(var t=new google.maps.LatLng(this.address.lat,this.address.lng),map=new google.maps.Map(document.getElementById("map"),{zoom:13,center:t}),e=0,l=Object.entries(this.clinic);e<l.length;e++){var o=Object(n.a)(l[e],2),c=(o[0],o[1]),r=c.lat,d=c.lng,details=c.name,m=new google.maps.LatLng(r,d),h=new google.maps.Marker({position:m,map:map,icon:{url:"http://maps.google.com/mapfiles/ms/icons/green-dot.png"},size:new google.maps.Size(20,20)}),v='<div id="content"><p>'+details+"</p></div>";this.infoWindowShow(h,v),this.markersInfo.push(h)}},loadScript:function(){if(window.google&&window.google.maps)this.initMap();else{var t=this,script=document.createElement("script");script.onload=function(){window.google||window.google.maps?t.initMap():console.error("no google maps script included")},script.async=!0,script.defer=!0,script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZS1-x2tYC7qwUoiCsy3pJdezTeo2O6xA&libraries=geometry",document.getElementsByTagName("head")[0].appendChild(script)}},infoWindowShow:function(t,e){var l=new google.maps.InfoWindow({content:e});t.addListener("click",(function(){l.open(t.get("map"),t)}))},showMarker:function(t){google.maps.event.trigger(this.markersInfo[t],"click"),console.log("clicked"),console.log(this.markersInfo[t])},getClinicsList:function(){var t=this;o.database().ref("clinics").on("value",(function(e){t.clinic=e.val(),t.loadScript()}))},onFileSelected:function(t){console.log(t),this.imageFile=t.target.files[0],this.image=o.storage().ref("clinicImages/"+this.imageFile.name),this.upload=this.image.put(this.imageFile);var e=this;e.upload.on("state_changed",(function(t){switch(t.state){case o.storage.TaskState.PAUSED:console.log("Upload is paused");break;case o.storage.TaskState.RUNNING:console.log("Upload is running");t.bytesTransferred,t.totalBytes}}),(function(t){console.log(t)}),(function(){e.upload.snapshot.ref.getDownloadURL().then((function(t){console.log("File available at",t),e.imageUrl=t}))}))},editModal:function(t,e){this.editmode=!0,console.log(e),console.log(t),this.clinicName=t.name,this.clinicAddress=t.address,this.key=e,this.lat=t.lat,this.lng=t.lng,$("#exampleModal").modal("show")},updateClinic:function(){var t=this;o.database().ref("clinics/"+this.key).set({name:this.clinicName,address:this.clinicAddress,imageUrl:this.imageUrl,lat:this.lat,lng:this.lng}).then((function(e){console.log("updated"),d.a.success("Updated!"),$("#exampleModal").modal("hide"),t.editmode=!1,t.clearValues()}))},clearValues:function(){this.clinicName="",this.clinicAddress="",this.imageUrl="",this.key=""}},created:function(){this.getClinicsList(),null===localStorage.getItem("user-email")&&this.$router.push("/login")},mounted:function(){this.loadScript()},computed:{date:function(){return Object.entries(this.clinic)}}},f=l(7),component=Object(f.a)(v,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[t._m(0),t._v(" "),l("section",{staticClass:"content"},[l("div",{staticClass:"container-fluid"},[l("div",{staticClass:"row"},[l("div",{staticClass:"col-md-3"},[l("div",{staticClass:"card card-primary card-outline"},[t._m(1),t._v(" "),l("div",{staticClass:"card-body table-responsive",staticStyle:{"overflow-y":"auto",height:"610px"}},t._l(t.clinic,(function(e,n){return l("div",{key:n,staticClass:"callout callout-success",staticStyle:{cursor:"pointer"},on:{click:function(l){return t.editModal(e,n)}}},[l("h5",[t._v(t._s(e.name))]),t._v(" "),l("p",[t._v(t._s(e.address))])])})),0)])]),t._v(" "),t._m(2)])])]),t._v(" "),l("div",{staticClass:"modal fade",attrs:{id:"exampleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[l("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[l("div",{staticClass:"modal-content"},[t._m(3),t._v(" "),l("div",{staticClass:"modal-body"},[l("div",{staticClass:"form-group"},[l("label",[t._v("Clicnic Name")]),t._v(" "),l("input",{directives:[{name:"model",rawName:"v-model",value:t.clinicName,expression:"clinicName"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.clinicName},on:{input:function(e){e.target.composing||(t.clinicName=e.target.value)}}})]),t._v(" "),l("div",{staticClass:"form-group"},[l("label",[t._v("Display Address")]),t._v(" "),l("input",{directives:[{name:"model",rawName:"v-model",value:t.clinicAddress,expression:"clinicAddress"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.clinicAddress},on:{input:function(e){e.target.composing||(t.clinicAddress=e.target.value)}}})]),t._v(" "),l("div",{staticClass:"form-group"},[l("label",[t._v("Picture")]),t._v(" "),l("input",{staticClass:"form-control",attrs:{type:"file",required:"",placeholder:"Address"},on:{change:t.onFileSelected}})])]),t._v(" "),l("div",{staticClass:"modal-footer"},[l("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")]),t._v(" "),l("button",{staticClass:"btn btn-primary",on:{click:t.updateClinic}},[t._v("Save changes")])])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content-header"},[e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row mb-2"},[e("div",{staticClass:"col-sm-6"},[e("h1",{staticClass:"m-0 text-dark"},[this._v("\n                          Clinic List\n                      ")])]),this._v(" "),e("div",{staticClass:"col-sm-6"},[e("ol",{staticClass:"breadcrumb float-sm-right"},[e("li",{staticClass:"breadcrumb-item"},[e("a",{attrs:{href:""}},[this._v("Home")])]),this._v(" "),e("li",{staticClass:"breadcrumb-item active"},[this._v("\n                              Clinic List\n                          ")])])])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("h3",{staticClass:"card-title"},[e("i",{staticClass:"fas fa-hospital"}),this._v("\n                                Clinic List\n                            ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-md-9"},[e("div",{staticClass:"card card-primary card-outline"},[e("div",{staticClass:"card-body table-responsive"},[e("div",{staticStyle:{width:"1200px",height:"600px"},attrs:{id:"map"}})])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[this._v("Update Clinic")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}],!1,null,null,null);e.default=component.exports}}]);