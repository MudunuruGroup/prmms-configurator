<template>
  <v-card>
  <v-card-text>
    <div v-if="createSuccessMessage" class="success-message " style="color:#6666ff; ">{{ createSuccessMessage }}</div>
    <div v-if="updateSuccessMessage" class="success-message" style="color:#6666ff;">{{ updateSuccessMessage }}</div>
    </v-card-text>
    <v-card-text>
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">{{secretName}}</h3>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <!--v-text-field
        v-model="secretName"
        label="Secret name"
        filled
        background-color="transparent"
      ></v-text-field -->
      <v-text-field
        v-model="storage_connection_string"
        label="Storage connection string"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="blob_container"
        label="blob container"
        filled
        background-color="transparent"
      ></v-text-field>
     
      <v-btn class="text-capitalize mt-5 element-0" id="create" color="success" @click="submitForm('create')">Create</v-btn>
      <v-btn class="text-capitalize mt-5 element-0" id="update" color="success" @click="submitForm('update')">Update</v-btn>

    </v-card-text>
  </v-card>
</template>

<script>

import axios from 'axios'
//import Azureconfig from '../../../config/Azureconfig.js'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default {
  name: "StorageNewSecret",
  data: () => ({
    secretName: "prmms-sa-config",
    storage_connection_string: "",
    blob_container:"",

    createSuccessMessage: "",
  updateSuccessMessage: "",
  successMessageTimeout: 5000,
  
  }),
  created() {

// This code will be executed when the component is created
console.log('Component created');
const userData= JSON.parse(localStorage.getItem('userData'));
// You can perform initialization, data fetching, etc. here
//const url = Azureconfig.url.server_url+Azureconfig.url.api_secret_name_verify
      const urlpath = process.env.VUE_APP_SERVER_URL;
      const url = urlpath +'/api/verify-secret';
      const jsonData = {
    access_token: userData.secretToken,
    secretName:this.secretName,
   
  };
  try {    


 axios.post(url,jsonData,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization':userData.secretToken
      }
    })
.then((response) => {
//   console.log('Check user status')
   console.log(response.data);
   let data = response.data
 
//  alert('Secret success')
  if(response.data){
    data=atob(data);
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    
    this.storage_connection_string= jsonData.storage_connection_string;
    this.blob_container= jsonData.blob_container;
  

    document.getElementById('create').style.display='none';
   document.getElementById('update').style.display='block'
  }else{
    document.getElementById('create').style.display='block';
    document.getElementById('update').style.display='none'
  }    
    })
    .catch((error) => {
        console.log(error)
    
       console.log(error.response)
      
       
    })

} catch (error) {
  this.errorMessage = "Error listing secret properties: " + error.message;
}

},
  methods: {
    
    async submitForm(action) { 
      const urlpath = process.env.VUE_APP_SERVER_URL;
	console.log('urlpath  : ' + urlpath);
      const url = urlpath +'/api/secret';
      console.log('url1 : '+url);
     // const url = `https://ompuat.mudunuru.com:9545/api/secret`;
    const userData= JSON.parse(localStorage.getItem('userData'));
    
     console.log(userData)
     const jsonobject={
     
      storage_connection_string: this.storage_connection_string,
            blob_container: this.blob_container,
            
        
        }
      const jsonData = {
        access_token: userData.secretToken,
        secretName:this.secretName,
       // value:'secretName='+this.secretName+'&engine='+this.engine+'&DBName='+this.DBName+'&DBUserID='+this.DBUserID+'&DBPassword='+this.DBPassword+'&DBHost='+this.DBHost+'&Port='+this.Port
        value:btoa(JSON.stringify(jsonobject))
        // Add more key-value pairs as needed
      };
    try { 
     
    

     axios.put(url,jsonData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':userData.secretToken
          }
        })
    .then((response) => {
    //   console.log('Check user status')
       console.log(response.data);
    //   let data = response.data
    //   console.log(data);
    if (action === 'create') {
          this.createSuccessMessage = "Storage Created Successfully";
        } else if (action === 'update') {
          this.updateSuccessMessage = "Storage Updated Successfully";
        }
     this.$router.push({ name: 'StorageCreate' });
     setTimeout(() => {
          if (action === 'create') {
            this.createSuccessMessage = "";
          } else if (action === 'update') {
            this.updateSuccessMessage = "";
          }
        }, this.successMessageTimeout); // Clear the message after the specified time
      })
        .catch((error) => {
            console.log(error)
           
            // console.log(error.message)
            // console.log(error.config)
           console.log(error.response)
          
           
        })

    } catch (error) {
      this.errorMessage = "Error listing secret properties: " + error.message;
    }
    }, 
    
  },
};
</script>
