import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router =new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
      
        {
           
            path: '/',
            redirect: 'login',
            component: () => import('@/layouts/Layout'),
            children: [
                {
                    name: 'login',
                    path: 'login',
                    component: () => import('@/views/login'),
                },
                // Components
                {
                    name: 'SecretCreate',
                    path: 'secret/create',
                    component: () => import('@/views/secret/Create'),
                },
                {
                    name: 'Alerts',
                    path: 'pages/alerts',
                    component: () => import('@/views/pages/Alerts'),
                },

                {
                    name: 'Profile',
                    path: 'pages/profile',
                    component: () => import('@/views/pages/Profile'),
                },

                {
                    name: 'Icons',
                    path: 'pages/icons',
                    component: () => import('@/views/pages/Icons'),
                },

                {
                    name: 'TableSimple',
                    path: 'pages/tables-simple',
                    component: () => import('@/views/pages/TableSimple'),
                },




                {
                    name: 'prmms-people-sq',
                    path: 'storage-queue/prmms-people-sq',
                    component: () => import('@/views/storage-queue/prmms-people-sq'),
                },
                {
                    name: 'prmms-rs-sq',
                    path: 'storage-queue/prmms-rs-sq',
                    component: () => import('@/views/storage-queue/prmms-rs-sq'),
                  
                },{
                    name: 'prmms-alerts-sq',
                    path: 'storage-queue/prmms-alerts-sq',
                    component: () => import('@/views/storage-queue/prmms-alerts-sq'),
                  
                },{
                    name: 'prmms-heartbeat-sq',
                    path: 'storage-queue/prmms-heartbeat-sq',
                    component: () => import('@/views/storage-queue/prmms-heartbeat-sq'),
                  
                },




                {
                    name: 'prmms-blob-container',
                    path: 'storage/prmms-blob-container',
                    component: () => import('@/views/storage/prmms-blob-container'),
                  
                },
                {
                    name: 'StorageCreate',
                    path: 'storage/create',
                    component: () => import('@/views/storage/Create'),
                },
                {
                    name: 'prmms-aes-config',
                    path: 'encryption/prmms-aes-config',
                    component: () => import('@/views/encryption/prmms-aes-config'),
                  
                },
                {
                    name: 'EncryptionCreate',
                    path: 'encryption/create',
                    component: () => import('@/views/encryption/Create'),
                },

                {
                    name: 'Dashboard',
                    path: 'dashboard',
                    component: () => import('@/views/secret/Create'),
                    beforeEnter: (to, from, next) => {
                        // This guard will be triggered when navigating to the dashboard
                        // Perform any necessary logic here
                        next();
                      }
                },

            ]
        },

    ],
});
  
  // Navigation guard to prevent unauthorized access to dashboard and other routes
  router.beforeEach((to, from, next) => {
    // Check if the user is logged in here, for example, by checking your authentication state
   const isAuthenticated= localStorage.getItem('isAuthenticated')
   console.log(isAuthenticated);
   // const isAuthenticated =true /* Logic to check if the user is authenticated */;
  
    if (to.path !== '/login' && !isAuthenticated) {
      next('/login'); // Redirect to login page if not authenticated
    } else {
      next(); // Allow navigation if authenticated or on the login page
    }
  });


  export default router;