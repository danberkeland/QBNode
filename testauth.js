
const express = require('express');

const app = express();
const OAuthClient = require('intuit-oauth');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let oauth2_token_json
let oauthClient

app.get('/', urlencodedParser, function (req, res) {
  oauthClient = new OAuthClient({
    clientId: "ABOL2fhuC6KpmLu1qR4ipIHHVSMTMPctmq0jCGelndIvMSWqWq",
    clientSecret: "KpgOMM66g8vGCFLP7PWDBU44yQGA05lKSUU8f7OL",
    environment: "sandbox",
    redirectUri: "http://localhost:3000/callback",
  });

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: 'intuit-test',
  });
  res.redirect(authUri);
});



app.listen(3000, () => {
  console.log("we're listening!")
  }
)
