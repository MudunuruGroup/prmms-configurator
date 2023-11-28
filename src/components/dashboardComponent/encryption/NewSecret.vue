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
        label="Secret Name"
        filled
        background-color="transparent"
      ></v-text-field -->
      <v-text-field
        v-model="key"
        label="Key"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="iv"
        label="IV"
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
  name: "encryptionSecret",
  data: () => ({
    secretName: "prmms-aes-config",
    key: "",
    iv: "",
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

	console.log("KEY   1 : " + this.key);
	console.log("IV   1 : " + this.iv);


	console.log("KEY   2 : " + atob(jsonData.key));
	console.log("IV   2 : " + atob(jsonData.iv));

    
    this.key= atob(jsonData.key);
    this.iv= atob(jsonData.iv);
   

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
    // async base64UrlEncode(input) {
    //   const base64 = Buffer.from(input).toString('base64');
    //   return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    // },
    async submitForm(action) { 
      const urlpath = process.env.VUE_APP_SERVER_URL;
	console.log('urlpath  : ' + urlpath);
      const url = urlpath +'/api/secret';
      console.log('url1 : '+url);
      //const url = `https://ompuat.mudunuru.com:9545/api/secret`;
    const userData= JSON.parse(localStorage.getItem('userData'));
    
     console.log("user Data " + userData);


     if(this.key.length !=32){
      alert("Key string length should be 32 characters");
      return false;
     }

	console.log("Key " + this.key);
	console.log("IV " + this.iv);

     const jsonobject={     
            key: btoa(this.key),
            iv: btoa(this.iv),           
         
        }
      const jsonData = {
        access_token: userData.secretToken,
        secretName:this.secretName,
       // value:'secretName='+this.secretName+'&engine='+this.engine+'&DBName='+this.DBName+'&DBUserID='+this.DBUserID+'&DBPassword='+this.DBPassword+'&DBHost='+this.DBHost+'&Port='+this.Port
        value:btoa(JSON.stringify(jsonobject))
        // Add more key-value pairs as needed
      };
    try { 
     
    console.log("JSON Data " + jsonData);


     axios.put(url,jsonData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':userData.secretToken
          }
        })
    .then((response) => {
    //   console.log('Check user status')
       console.log("Response data  : " + response.data);
       if (action === 'create') {
          this.createSuccessMessage = "Encryption Created Successfully";
        } else if (action === 'update') {
          this.updateSuccessMessage = "Encryption Updated Successfully";
        }
     //alert('Encryption Updated Successfully')
     this.$router.push({ name: 'EncryptionCreate' });
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
