<template> 

<div class="v-card__text">
    <div class="v-toolbar__content" style="height: 64px;">
      <div class="v-toolbar__title"> Secret List </div>
      <div class="spacer"></div>
      <div class="shrink">
        <v-btn class="text-capitalize mt-5 element-0 float-right" href="/#/encryption/create" color="success">New Secret</v-btn>
      </div>
    </div>
    <hr role="separator" aria-orientation="horizontal" class="v-divider theme--light">
    <div class="mt-4">
      <v-simple-table fixed-header height="300px">
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Expiry</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in secrets" :key="item.id">
                    <td>{{getLastArrayItem(item.id)}}</td>
                    <td>{{ item.attributes.enabled }}</td>
                    <td>{{ item.attributes.exp ?  formatTimestamp(item.attributes.exp)  : " --" }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
    </div>
 
<div>
       
  
</template> 
 
<script> 

import axios from 'axios'
import moment from 'moment';
//import Azureconfig from '../../../config/Azureconfig'


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

 
export default { 
  data() { 
    return { 
      secrets: [], 
      secretName: '', 
      secretValue: '',
      secretProperties:[], 
    }; 
  }, 
  async created() { 
   // console.log(Azureconfig.url.secret_list_url)
      const urlpath = process.env.VUE_APP_SERVER_URL;
      const url = urlpath +'/api/get-secret';
     
    //const url = `https://ompuat.mudunuru.com:9545/api/get-secret`;
    const userData= JSON.parse(localStorage.getItem('userData'));
    
     console.log(userData)
      const jsonData = {
        access_token: userData.secretToken
      
        // Add more key-value pairs as needed
      };
    try { 
     
    

     axios.post(url,jsonData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':userData.secretToken
          }
        })
    .then((response) => {
      console.log('Check user status')
      console.log(response.data);
      let data = response.data
      console.log(data);
      this.secrets=data.value
    
     
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
  methods: { 
    formatTimestamp(timestamp) {
      return moment(timestamp).format('DD-MM-YYYY, h:mm:ss a');
    },
    getLastArrayItem(str) {
      const parts = str.split('/'); // Change the delimiter as needed
      return parts[parts.length - 1];
    },
    
 
  }, 
}; 
</script>


