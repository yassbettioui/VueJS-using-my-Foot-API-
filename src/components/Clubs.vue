<template>

<div class="form-group">
<input  v-model="name" class="form-control" type="text" placeholder="football club name ...">
<input  v-model="coach" class="form-control" type="text" placeholder="coach ...">
<input  v-model="country" class="form-control" type="text" placeholder="country...">
<input  v-model="founded" class="form-control mb-3" type="date" placeholder="founded...">

<button v-if="myClub" @click="updateClub" class="btn btn-warning btn-block mb-2">UPDATE </button>
<button v-else @click="addClub" class="btn btn-success btn-block mb-2">ADD NEW CLUB</button>
</div>
<div class="form-group">
<input  v-model="search" v-on:keyup="searchClubs" class="form-control" type="text" placeholder="search club...">
</div>
<div>
<ul class="list-group">
<li list-group-item v-bind:key="club.id" v-for="club in resultclubs">

<Club :club="club"
 v-on:deleteClub="deleteOneClub"
 @updateClub="editClub"
 />

 </li>
</ul>
</div>

</template>

<script>
import axios from 'axios';
import Club from './Club';
export default {
    
name:"Clubs",
components:{
        Club
           },
data() {
    return {
        clubs: [],
        resultclubs: [],
        search:'',
        name:"",
        coach:"",
        country:"",
        founded:null,
        myClub:null,
        }
    },
methods: {
    addClub(){
       // e.preventDefault()
       if(this.name != ''){
        let newClub= {
             name:this.name,
             coach:this.coach,
             country:this.country,
             founded:this.founded,
  }
        axios.post('http://localhost:8081/clubs',newClub)
        .then(res=>{
            this.clubs=[res.data, ...this.clubs];
            this.resultclubs = [res.data,...this.resultclubs]
            this.name="";
            this.coach="";
            this.country="";
           // this.founded=null;
        }) }
    },
searchClubs(){
  this.resultclubs=this.clubs.filter((club)=>club.name.toLowerCase().includes(this.search.toLowerCase())
  )},
getClubs(){
     axios.get('http://localhost:8081/clubs')
    .then(res=> this.resultclubs=this.clubs=res.data._embedded.clubs)
    .catch(err=>console.log(err))
          },
   deleteOneClub(id){
       if (confirm('are you sure you delete this Club ?')){
axios.delete(`http://localhost:8081/clubs/${id}`)      
.then(() => {
    this.clubs= this.clubs.filter(club => club.id !== id);
})}
 },
 editClub(club){
this.myClub=club;
this.name=club.name;
this.coach=club.coach;
this.country=club.country;
this.founded=club.founded;
 },
 updateClub(){
     let club={
         ...this.myClub,
         name:this.name,
         coach:this.coach,
         country:this.country,
         founded:this.founded
}
     axios.put('http://localhost:8081/clubs/'+club.id,club)
     .then(res => {
         this.resultclubs= this.clubs = this.clubs.map(c=>{
             if(res.data.id==c.id){
                 return res.data
             }
             return c;
         })
         this.name='';
         this.coach='';
         this.country='';
         this.founded=null;
         this.myClub=null;

     });
 },
          },
created (){
    this.getClubs();
}
}

</script>



<style>

</style>