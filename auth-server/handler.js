const { google } = require("googleapis");
const  OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

/**
 * Scopes allows you to set access levels; this is set to readonly for now because you don't have access rights to
 * update the calendar yourself.
 * For more info check out the scopes documentation under https://developers.google.com/identity/protocols/oauth2/scopes
 */
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * credentials are those values required to get access to your calendar. if you see "process.env" this means the value
 * is in the "config.json" file. this is a best practice as it keeps your API secrets hidden.
 * please remember to add "config.json" to your ".gitignore" file.
 */
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://AmirErnest.github.io/meet/"],
  javascript_origins: ["https://AmirErnest.github.io", "http://localhost:3000"],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

/**
 * the first step in the OAuth process is to generate the URL so the users can log in with Google and be authorized to see the calendar.
 * after logging in, they will receive a code as a URL parameter.
 */
module.exports.getAuthURL = async () => {
  /**
   * scopes array passed to the `scope` option.
   * any scopes passed must be enabled in the "OAuth consent screen" settings in the project on Google Console.
   * Also, any passed scopes are the ones users will see when the consent screen is displayed to them.
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

//get access token function
module.exports.getAccessToken = async (event) => {
  //The values used to inistantiate the OAuthClient are at the top of the file
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  //Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     * exchange authorization code for access token with a "call back" after the exchange.
     * the callback in this case is an arrow function with the results as parameters : "err" and "token".
     */
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      //respond with oAuth token
      return {
        statusCode:200,
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      //handle error
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
}