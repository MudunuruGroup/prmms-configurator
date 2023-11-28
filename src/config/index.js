export default {
    auth: {
        grant_type:'client_credentials',
        clientId: 'feca0c4e-916f-49fa-a385-ec4cf17426df',
      
        authority: 'https://login.microsoftonline.com/a2ab47da-3b49-4f99-be15-0cc2cd3ec287',
       
        redirectUri:'https://ompuat.mudunuru.com:9448/',
        

    },
    cache: {

        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
        // 10 minutes in seconds
    },


}
