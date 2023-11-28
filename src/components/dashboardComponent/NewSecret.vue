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
        v-model="engine"
        label="Engine"
        filled
        background-color="transparent"
        required
      ></v-text-field>
      <v-text-field
        v-model="DBName"
        label="DB Name"
        filled
        background-color="transparent"
        required
      ></v-text-field>
      <v-text-field
        v-model="DBUserID"
        label="DB User ID"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="DBPassword"
        label="DB Password"
        filled
        background-color="transparent"
        required
      ></v-text-field>
      <v-text-field
        v-model="DBHost"
        label="DB Host"
        filled
        background-color="transparent"
        required
      ></v-text-field>
      <v-text-field
        v-model="Port"
        label="Port"
        filled
        background-color="transparent"
        required
      ></v-text-field>
      <v-btn class="text-capitalize mt-5 element-0" id="create" color="success" @click="submitForm('create')">Create</v-btn>
      <v-btn class="text-capitalize mt-5 element-0" id="update" color="success" @click="submitForm('update')">Update</v-btn>

    </v-card-text>
  </v-card>
</template>

<script>

import axios from 'axios'
//import Azureconfig from '../../config/Azureconfig.js'

//console.log(Azureconfig)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default {
  name: "NewSecret",
  data: () => ({
    //mudunuru-dev-db-config
    secretName: "prmms-db-config",
    engine: "",
    DBName: "",
    DBUserID: "",
    DBPassword: "",
    DBHost: "", // Fixed typo here
    Port: "3306",

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
     
       
      if(response.data){
        data=atob(data);
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        
        this.engine= jsonData.default.ENGINE;
        this.DBName= jsonData.default.NAME;
        this.DBUserID= jsonData.default.USER;
        this.DBPassword= jsonData.default.PASSWORD;
        this.DBHost= jsonData.default.HOST;// Fixed typo here
        this.Port= jsonData.default.PORT;

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
      //console.log(type)

      const urlpath = process.env.VUE_APP_SERVER_URL;
	console.log('urlpath  : ' + urlpath);
      const url = urlpath +'/api/secret';
      console.log('url1 : '+url);
     // const url = `https://ompuat.mudunuru.com:9545/api/secret`;
     // const url = ServerUrl+'/api/secret';
     // console.log('url : '+url);

	

    const userData= JSON.parse(localStorage.getItem('userData'));
    
     console.log(userData)
     const jsonobject={
      default:
          { 
            ENGINE: this.engine,
            NAME: this.DBName,
            USER: this.DBUserID,
            PASSWORD: this.DBPassword,
            HOST: this.DBHost, 
            PORT: this.Port
          }
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
    //  alert('Secret success')
    if (action === 'create') {
          this.createSuccessMessage = "Database Created Successfully";
        } else if (action === 'update') {
          this.updateSuccessMessage = "Database Updated Successfully";
        }
     this.$router.push({ name: 'Dashboard' });
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
