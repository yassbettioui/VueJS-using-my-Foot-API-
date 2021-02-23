<template>

<h2>{{club.name}} | ({{club.country}})</h2>
<h5>{{club.coach}}</h5>
<div class="text-right"> 
       <button @click="updateMyClub" class="btn btn-info btn-sm">Edit</button>
       <button @click="deleteClub" class="btn btn-danger btn-sm">X</button> 
</div>
</template>


<script>
export default {
props:['club'],
methods:{
       deleteClub(){
              this.$emit('deleteClub',this.club.id)
       },
       updateMyClub(){
              this.$emit('updateClub',this.club)
       }
      },
}
</script>


<style>
.is-completed {
text-decoration:line-through
}
</style>