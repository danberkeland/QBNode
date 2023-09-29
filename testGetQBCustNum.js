/* Just testing VS Code */

const AWS = require("aws-sdk");
const clonedeep = require("lodash.clonedeep");

const dynamo = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

const OAuthClient = require("intuit-oauth");
var QuickBooks = require("node-quickbooks");

const oauthClient = new OAuthClient({
  clientId: "ABMoSkUwyZik7OSSRVyzobfowXSFXmZSwubuebPtgJjDIDKOjB",
  clientSecret: "kIc5Fh5wIO0D5GZ6dJUWFaIcegw0UCqGXk5LIPpJ",
  environment: "production",
  redirectUri: "https://www.bpbadmin.com/Billing",
});

const readInfoContent = async (infoName) => {
  const params = {
    TableName: "InfoQBAuth-mjwzxudjj5fchjq2imnoa6scoi-staging",
    Key: {
      id: infoName,
    },
  };

  try {
    return await dynamo.get(params).promise();
  } catch (err) {
    console.log(err);
  }
};

let result;
let realm;
let token;
let refreshToken;
let accessToken;
let createdAt;
let response;
let access;
let qbo;

const getInfo = async () => {
  await readInfoContent("realm")
    .then((data) => {
      realm = data.Item.infoContent;
    })
    .catch((err) => {
      console.log("realmError", err);
    });

  await readInfoContent("refreshToken")
    .then((data) => {
      refreshToken = data.Item.infoContent;
    })
    .catch((err) => {
      console.log("refreshTokenError", err);
    });

  await readInfoContent("accessToken")
    .then((data) => {
      accessToken = data.Item.infoContent;
    })
    .catch((err) => {
      console.log("accessTokenError", err);
    });

  await readInfoContent("createdAt")
    .then((data) => {
      createdAt = data.Item.infoContent;
    })
    .catch((err) => {
      console.log("createdAterror", err);
    });

  access = {
    refreshToken: refreshToken,
    accessToken: accessToken,
    expires_in: 3600,
    x_refresh_token_expires_in: 8726400,
    createdAt: createdAt,
  };

  oauthClient.setToken(access);
  return access;
};

getInfo().then((data) => {
  console.log("access Data", data);
  qbo = new QuickBooks(
    "ABMoSkUwyZik7OSSRVyzobfowXSFXmZSwubuebPtgJjDIDKOjB",
    "kIc5Fh5wIO0D5GZ6dJUWFaIcegw0UCqGXk5LIPpJ",
    data.accessToken,
    false, // no token secret for oAuth 2.0
    "480063645",
    false, // use the sandbox?
    true, // enable debugging?
    null, // set minorversion, or null for the latest version
    "2.0", //oAuth version
    data.refreshToken
  );
  let DisplayName = "Novo";

  qbo.findCustomers({ DisplayName: DisplayName }, function (err, CompanyInfo) {
    if (err) {
      console.log("We've got an error!", err);
    } else {
      console.log("CompanyInfo", CompanyInfo.QueryResponse.Customer[0].Id);
    }
  });

  if (oauthClient.isAccessTokenValid()) {
    console.log("The access_token is valid");
  }
});


