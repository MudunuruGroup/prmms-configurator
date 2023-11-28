export default {
    url: {
        // ServerUrl:import.meta.env.SERVER_URL,
        //server_url:'https://prmmsdev.arisenet.olamdomain.com:9445/',
        secret_list_url:'api/get-secret',
        api_secret_name_verify:'api/verify-secret',
        api_secret:'/api/secret'

    },
    credential: {

        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
        // 10 minutes in seconds
    },


}
