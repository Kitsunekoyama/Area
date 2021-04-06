import * as google from 'expo-google-app-auth';



const { type, accessToken, idToken, user } = await Google.logInAsync({
  androidClientId: `<area-user>`,
  androidStandaloneAppClientId: `<area-app>`,
});

if (type === 'success') {
  let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `${accessToken}` },
  });
  console.log("Type:"+type)
  console.log("Access Token:"+accessToken)
  console.log("ID Token:"+idToken)
  console.log("User:"+user)

  await Google.logOutAsync({ accessToken, androidClientId, androidStandaloneAppClientId });
}





// const oauthMobClient = new google.auth.OAuth2(
//     '767475818166-ngdapu6mh2kj2e50j5hsj53cneqtqrgc.apps.googleusercontent.com',
//   )
//   const scopes = [
//     'https://mail.google.com/'
//   ]
//   const url = oauthMobClient.generateAuthUrl({
//     acces_type: 'offline',
//     scope: scopes
//   })
//   app.get('/url', (req, res) => {
//     res.send(url);
//   })
//   app.get('/oauthplayground', (req, res) => {
//     var code = req.param("code");
//     const {tokens} = test[GMAIL].oauthMobClient.getToken(code)
//     test[GMAIL].oauthMobClient.setCredentials(tokens);
//     UserList[0].googleId = oauthMobClient._clientId;
//     UserList[0].googleSecret = oauthMobClient._clientSecret;
//     console.log(UserList[0].googleId)
//     console.log(UserList[0].googleSecret)
//     const mail = google.gmail({
//         version: 'v1',
//         auth: oauthMobClient
//     })
//     console.log(mail)
//   })