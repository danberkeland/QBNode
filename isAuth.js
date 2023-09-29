const OAuthClient = require("intuit-oauth");
var QuickBooks = require('node-quickbooks')



const oauthClient = new OAuthClient({
  clientId: "ABMoSkUwyZik7OSSRVyzobfowXSFXmZSwubuebPtgJjDIDKOjB",
  clientSecret: "kIc5Fh5wIO0D5GZ6dJUWFaIcegw0UCqGXk5LIPpJ",
  environment: "production",
  redirectUri: "https://www.bpbadmin.com/Billing",
});

const access = {
  "refreshToken": "AB11643393948BquiA5Sy2xMxXP6r6dv4waFAbpqLBCEQMf2kB",
  "accessToken": "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..dEKBKbX9LwQh3XBpvul3Mw.s0_beutA3zRdDqfVzG-MrtrkVskDpO-IEtHiz9x0AWkWWkD18mqaCel433D29NUBZ_9lQXXdfjM6ROLcY8whRf1lycg8h_WQp92hVBt9X5CWSqpRs_Ma7U7y-QJUs22pYsKHCCdksN4TxziQBW4vOhojSeuRnvrb4mMao0-4xPQSpZpM5sGGl7goylDycKY43HwhTJHUt4HsXhK2tw6BbRwo-iArJfnF4-EytkiIv681bO9xfZRu8JX6C5eU3Ey3EPTWiU79Mx_nBnsAOr4eTbYHHoxJnRsvq_i6iuaHj9uiYxVX2e6JzTYq8EbSTXwPcZZu2JarGkqExWKr0q0iYd7lFRsqs07YDL12UyeDYhntH8UjBORLZCtk0tmmQq_qaKXo2StvIIrQI000JcoLeLVGHEuhwbSsrDWVV0Yo5ZvjLJGjeTzD_AA3em7s2CrqUHGl3Ua1kZCcRAigWPYmYdZWLQU-B404NxlFeEGwKgvN67STZl3qFk7-mSM-cKeIcfHDtP8Rsy-h_IMdO60Q8RgZwEJW3cPUCCfB-BdQ1_D9nBX_pN0PGPElrs1zHjQaGSRi_dE7auuKYNL2mW9noXrRLIHphPfpGU5CvVgo92V4g8WDKjeYzrdYQd_8IsmU5Sf87_D_nwUPnnbuyQ-uFhTVVj6FSjvzvhKx2SI7NnxGhHA3_20bIH6oL2pCT_TU9KFhXyHhEsB9e1D9OuS_mu9T8bf-U87ZimI-T3WVNQo.x5TM7kN-UWVUUfIMvYy2OQ",
  "expires_in": 3600,
  "x_refresh_token_expires_in": 8726400
 }

oauthClient.setToken(access);

var qbo = new QuickBooks("ABMoSkUwyZik7OSSRVyzobfowXSFXmZSwubuebPtgJjDIDKOjB",
"kIc5Fh5wIO0D5GZ6dJUWFaIcegw0UCqGXk5LIPpJ",
  access.accessToken,
  false, // no token secret for oAuth 2.0
  '480063645',
  false, // use the sandbox?
  true, // enable debugging?
  null, // set minorversion, or null for the latest version
  '2.0', //oAuth version
  access.refreshToken);


if (oauthClient.isAccessTokenValid()) {
  console.log('The access_token is valid');
}

qbo.findInvoices( "where DocNumber = '7023189'", function(err, CompanyInfo) {
  console.log(CompanyInfo)
})