const express = require('express');
const axios = require('axios'); // Import the fetch library
const https = require('https'); // Import the https module
const fs = require('fs'); // Import the fs module
const app = express();
const port = 8443;

// Load SSL certificates for HTTPS
const privateKey = fs.readFileSync('/etc/letsencrypt/live/mudunuru.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/mudunuru.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/mudunuru.com/fullchain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};
//const credential = new DefaultAzureCredential();
app.get('/api/get-token', async (req, res) => {
  const tenantId = 'a2ab47da-3b49-4f99-be15-0cc2cd3ec287';
  const clientId = 'feca0c4e-916f-49fa-a385-ec4cf17426df'
  const clientSecret = 'kv_8Q~F16V2tkCYGtRkStH6p-Ee3lJaC_vcvbcos';
  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  
  console.log(tokenEndpoint)
  try {
    const urlpath = process.env.VUE_APP_SCOPE_URL;
	
     
    const response = await axios.post(tokenEndpoint, new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: urlpath +'.vault.azure.net/.default',
      //scope: 'https://prmms-vaults.vault.azure.net/.default',
      grant_type: 'client_credentials'
    
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false // Temporarily ignore SSL certificate issues
      })
    });

    const data = response.data;
    const accessToken = data.access_token;
    res.json({ access_token: accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve token' });
  }
});
const httpsServer = https.createServer(app);
httpsServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // console.log('scope path url ' +  process.env.VUE_APP_SCOPE_URL);
});
