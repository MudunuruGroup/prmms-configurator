export default {
    auth: {
        grant_type:'client_credentials',
        clientId: 'b657f275-b92a-49ed-8d5d-f3954e04b3e6',
        authority: 'https://login.microsoftonline.com/5e007b6c-258b-4fde-adc1-8bf8a135885d',
     
        redirectUri:'https://prmmsdev.arisenet.olamdomain.com:9446',
      
    },
    cache: {

        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
        // 10 minutes in seconds
    },


}