
<script setup>
  
  </script>
<template>
<v-container id="wrapper" fluid class="down-top-padding">
      <div id="right">
        <div id="signin">
        </div>
        <img src="../assets/omp-logo.png" style="height: 15%; position: absolute; top: 70%; left: 5%; background-color: #ffffff; padding: 15px 24px 15px 24px; border-radius: 24px; z-index: 2;"/>
      </div>
      <div id="left">
        <div id="showcase">
          <div class="showcase-content">
          <VCard  >
        <VCardText>
          <img
            max-width="505"
            src="../assets/omp-logo.png"
            style="height: 135px; margin-bottom: 30px; object-fit: contain !important; "
          />

          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol>
                <div class="alert-demo-v-model-wrapper">
                 
                </div>

                <VBtn style="padding-left: 72px; padding-right: 72px; margin-left: 33px;" type="button" @click="msalLogin" >
                  <VImg style="position: absolute; z-index: 20; width: 21px; left: 40px;" :src="microsoft" />
                  Sign in with MICROSOFT
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
          </div>
        </div>
      </div>
    </v-container>
</template>

<style scoped>


html, body {
    min-block-size: 100% !important;
    padding: 0px !important;
}
#wrapper {
  display: flex;
  flex-direction: row;
}

#left {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#right {
  flex: 2;
}

/* Sign In */
#signin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
/*   padding-bottom: 10rem; */
  height: 100%;
   background: url('../assets/port-4.jpg') no-repeat center center / cover;
   box-shadow: 8px 0 8px -5px #333;
}

#signin form {
  width: 80%;
  padding-bottom: 3rem;
}

#signin .logo {
  margin-bottom: 8vh;
}

#signin .logo img {
  width: 300px;
}

#signin label {
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: 500;
}

#signin .text-input {
  margin-bottom: 1.3rem;
  width: 100%;
  border-radius: 2px;
  background: #181818;
  border: 1px solid #555;
  color: #ccc;
  padding: 0.5rem 1rem;
  line-height: 1.3rem;
}

#signin .primary-btn {
  width: 100%;
}

#signin .secondary-btn,
.or,
.links {
  width: 60%;
}

#signin .links a {
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

#signin .or {
  display: flex;
  flex-direction: row;
  margin-bottom: 1.2rem;
  align-items: center;
}

#signin .or .bar {
  flex: auto;
  border: none;
  height: 1px;
  background: #aaa;
}

#signin .or span {
  color: #ccc;
  padding: 0 0.8rem;
}

/* Showcase */
#showcase {
  display: flex;
  justify-content: center;
  align-items: center;
 
  height: 100vh;
  text-align: center;
}

#showcase .showcase-text {
  font-size: 3rem;
  width: 100%;
  color: #fff;
  margin-bottom: 1.5rem;
}

#showcase .secondary-btn {
  width: 60%;
  margin: auto;
}

/* Footer */
#main-footer {
  color: #ccc;
  text-align: center;
  font-size: 0.8rem;
  max-width: 80%;
  padding-top: 5rem;
}

#main-footer a {
  color: #f96816;
  text-decoration: underline;
}

/* Button */
.primary-btn {
  padding: 0.7rem 1rem;
  height: 2.7rem;
  display: block;
  border: 0;
  border-radius: 2px;
  font-weight: 500;
  background: #f96816;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.5s;
}

.primary-btn:hover {
  background-color: #ff7b39;
}

.secondary-btn {
  padding: 0.7rem 1rem;
  height: 2.7rem;
  display: block;
  border: 1px solid #f4f4f4;
  border-radius: 2px;
  font-weight: 500;
  background: none;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: all 0.5s;
}

.secondary-btn:hover {
  border-color: #ff7b39;
  color: #ff7b39;
}

/* Media Queries */
@media (min-width: 1200px) {
  #left {
    flex: 1;
  }

  #right {
    flex: 2;
  }
}

@media (max-width: 768px) {
  body {
    overflow: auto;
  }

  #right {
    display: none;
  }

  #left {
    justify-content: start;
    margin-top: 4vh;
  }

  #signin .logo {
    margin-bottom: 2vh;
  }

  #signin .text-input {
    margin-bottom: 0.7rem;
  }

  #main-footer {
    padding-top: 1rem;
  }
}
.container {
    width: 100%;
    padding: 0px !important;
    margin-right: auto;
    margin-left: auto;
}
  </style>

<script>
import * as msal from 'msal';
import axios from 'axios'
import msalConfig from '../config'
import Azureconfig from '../config/Azureconfig.js'


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default { 
  name:'login',
  data() { 
    return { 
      accessToken:'',
      idToken:'',
      secretToken:'',
      name:'',
      email:''
    }; 
  },
  
  methods: { 
    async msalLogin() { 
      const loginRequest = {
    scopes: ['openid', 'profile'],
    expiresIn: 600
  };
  const msalInstance = new msal.UserAgentApplication(msalConfig)
  msalInstance.loginPopup(loginRequest)
        .then((response) => {
          console.log('Login success:', response);
         // msalInstance.logout()
          this.accessToken = response.idToken.rawIdToken

          this.idToken = response.idToken.rawIdToken;
          this.name=response.idToken.name;
          this.email=response.idToken.preferredName;

              const  userData = {
              token:this.idToken,
              name:this.name,
              email:this.email,
              secretToken:this.idToken
             }
          console.log(userData)
                 localStorage.setItem('userData', JSON.stringify(userData))
                 localStorage.setItem('isAuthenticated',true)
                 window.location.href = '/#/dashboard';
                 window.location.reload(); // Reload the page

        
   
        })
        .catch((error) => {
          console.log('Login error:', error);
       //   isAlertVisible.value = true

         //err.value = error
         //console.error(error)
         // msalInstance.logout()
        });
     
    }, 
   
  }, 
}; 
</script>

