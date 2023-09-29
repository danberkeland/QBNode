const OAuthClient = require("intuit-oauth");

const oauthClient = new OAuthClient({
  clientId: "ABMoSkUwyZik7OSSRVyzobfowXSFXmZSwubuebPtgJjDIDKOjB",
  clientSecret: "kIc5Fh5wIO0D5GZ6dJUWFaIcegw0UCqGXk5LIPpJ",
  environment: "production",
  redirectUri: "https://www.bpbadmin.com/Billing",
});

const authUri = oauthClient.authorizeUri({
  scope: [OAuthClient.scopes.Accounting],
  state: "intuit-test",
});

console.log("Loading function");

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: authUri,
  };
  
  return authUri;
};


