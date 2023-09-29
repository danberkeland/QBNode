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

exports.handler = async (event, context) => {
  let result;
  let realm;
  let token;
  let refreshToken;
  let accessToken;
  let createdAt;
  let response;

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

  await readInfoContent("created")
    .then((data) => {
      createdAt = data.Item.infoContent;
    })
    .catch((err) => {
      console.log("createdAterror", err);
    });

  const access = {
    refreshToken: refreshToken,
    accessToken: accessToken,
    expires_in: 3600,
    x_refresh_token_expires_in: 8726400,
    createdAt: createdAt,
  };

  await oauthClient
    .refreshUsingToken(access.refreshToken)
    .then(function (authResponse) {
      token = JSON.parse(authResponse.response.body);
      console.log("raw token", token);
    })
    .catch((err) => {
      console.log("Refresh Error", err);
    });

  let updatedAccessToken = token.access_token;
  let updatedRefreshToken = token.refresh_token;

  /*
  await oauthClient
    .refreshUsingToken(access.refreshToken)
    .then(function (authResponse) {
      token = JSON.stringify(authResponse.response.body);
      console.log("raw token", token);
    })
    .catch((err) => {
      console.log("Refresh Error", err);
    });

  let strWithOutQuotes = token.replace(/"/g, "").replace(/\\/g, "");

  let updatedAccessToken = clonedeep(strWithOutQuotes);
  let updatedRefreshToken = clonedeep(strWithOutQuotes);
  updatedAccessToken = updatedAccessToken
    .split("access_token:")[1]
    .split(",")[0];
  updatedRefreshToken = updatedRefreshToken
    .split("refresh_token:")[1]
    .split(",")[0];
  console.log("updatedRefreshToken", updatedRefreshToken);
  console.log("updatedAccess", updatedAccessToken);

  if (updatedRefreshToken.charAt(updatedRefreshToken.length - 1) === "}") {
    updatedRefreshToken = updatedRefreshToken.slice(0, -1);
  }

  if (updatedAccessToken.charAt(updatedAccessToken.length - 1) === "}") {
    updatedAccessToken = updatedAccessToken.slice(0, -1);
  }
  */
  await updateItem("created", Date.now())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("updateCreateAterror", err);
    });

  await updateItem("accessToken", updatedAccessToken)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("updateAccessTokenerror", err);
    });

  await updateItem("refreshToken", updatedRefreshToken)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("updateRefreshTokenerror", err);
    });

  await updateNewItem("created", Date.now())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("updateCreateAterror", err);
    });

  await updateNewItem("accessToken", updatedAccessToken)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("updateAccessTokenerror", err);
    });

  await updateNewItem("refreshToken", updatedRefreshToken)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("updateRefreshTokenerror", err);
    });

  if (oauthClient.isAccessTokenValid()) {
    response = true;
  } else {
    response = false;
  }

  return response;
};

const readInfoContent = async (infoName) => {
  const params = {
    TableName: "InfoQBAuth-ehiwp5sas5fabdfpmpphzjpu2i-devtwo",
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

const updateItem = (id, infoContent) => {
  console.log("updateInfo", infoContent);
  const params = {
    TableName: "InfoQBAuth-huppwy3hefgohh6ur7yuz5vkcm-newone",
    Key: {
      id: id,
    },
    UpdateExpression: "set infoContent = :infoContent",
    ExpressionAttributeValues: {
      ":infoContent": infoContent,
    },
  };
  return dynamo.update(params).promise();
};

const updateNewItem = (id, infoContent) => {
  console.log("updateInfo", infoContent);
  const params = {
    TableName: "InfoQBAuth-ehiwp5sas5fabdfpmpphzjpu2i-devtwo",
    Key: {
      id: id,
    },
    UpdateExpression: "set infoContent = :infoContent",
    ExpressionAttributeValues: {
      ":infoContent": infoContent,
    },
  };
  return dynamo.update(params).promise();
};
