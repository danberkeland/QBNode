
const express = require('express');

const app = express();
const OAuthClient = require('intuit-oauth');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let oauth2_token_json
let oauthClient


oauthClient = new OAuthClient({
    clientId: "ABOL2fhuC6KpmLu1qR4ipIHHVSMTMPctmq0jCGelndIvMSWqWq",
    clientSecret: "KpgOMM66g8vGCFLP7PWDBU44yQGA05lKSUU8f7OL",
    environment: "sandbox",
    redirectUri: "http://localhost:3000/callback",
  });


/**
 * Handle the callback to extract the `Auth Code` and exchange them for `Bearer-Tokens`
 */
app.get('/', function (req, res) {

  console.log("/callback?code=AB11634584888dDDh1JNTVQHU6BMQ3VHxmVXgWsr0j0HetdnyX&state=intuit-test&realmId=4620816365024790170")
  
  oauthClient
    .createToken("/callback?code=AB11634586732gyTdZgj6C7JyHr87ba9qjIHzoSOqM3Z4njPUg&state=intuit-test&realmId=4620816365024790170")
    .then(function (authResponse) {
      oauth2_token_json = authResponse.token.access_token;
      console.log(oauth2_token_json);
      res.send(oauth2_token_json);
    })
    .catch(function (e) {
      console.error(e);
    });
  
  
});


app.listen(3000, () => {
  console.log("we're listening!")
  }
)
