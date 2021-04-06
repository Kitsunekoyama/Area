const ip = process.env.REACT_NATIVE_PACKAGER_HOSTNAME
export function getServices() {
    const url = "http://" + ip + ":8080/service";
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(''),
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}

export function getServiceDetail(id) {
    const url = "http://" + ip + ":8080/service?id=" + id;
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(''),
    })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export function getActionDetail(id_Service, id_Action) {
    const url = "http://" + ip + ":8080/action?service=" + id_Service + "&action=" + id_Action;
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(''),
    })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export function getReactionDetail(id_Service, id_Reaction) {
    const url = "http://" + ip + ":8080/reaction?service=" + id_Service + "&reaction=" + id_Reaction;
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(''),
    })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export function getLogin(Username, Password) {
    const url = "http://" + ip + ":8080/login?username=" + Username + "&password=" + Password;
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({"name": "test"}),
    })
    .then(response => response.text())
    .then(data => {return(data)})
    .catch(err => console.error("err"))
}
export function getSignUp(User, Password) {
     console.log(User)
     console.log(Password)
     const url = "http://" + ip + ":8080/signUp?username=" + User + "&password=" + Password;
     return fetch(url, {
         method: 'POST'
       //  body: JSON.stringify({"name": "test"}),
     })
     .then(response => response.text())
     .then(data => {return(data)})
     .catch(err => console.error("err"))
     //.then((response) => response.json())
     //.then(data => {return(data)})
     
 }

export function getHub(id) {
    const url = "http://" + ip + ":8080/hub";
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({"id": id}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    .then((response) => response.json())
    .then(data => {return data})
}

export function getCreate(id, action, reaction) {
    console.log("create");
    const url = "http://" + ip + ":8080/create"
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({"id": id, "action": action, "reaction": reaction}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    .then((response) => response.json())
    .then(data => {return data})
}
export function getActive(id, ndx) {
    const url = "http://" + ip + ":8080/active";
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({"id": id, "ndx": ndx}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
        .then((response) => response.json())
        .then(data => {return data})
}
export function getUnactive(id, ndx) {
    const url = "http://" + ip + ":8080/unactive";
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({"id": id, "ndx": ndx}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
        .then((response) => response.json())
        .then(data => {return data})
}
export function getDelete(id, ndx) {
    const url = "http://" + ip + ":8080/delete";
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({"id": id, "ndx": ndx}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
        .then((response) => response.json())
        .then(data => {return data})
}

export function getGoogle(id, access_token, refresh_token) {
    const url = "http://" + ip + ":8080/mobGoogle"
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({"id": id, "access_token": access_token, "refresh_token": refresh_token}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    .then((response) => {return response.text()})
}

import * as Google from 'expo-google-app-auth';
export async function signInWithGoogleAsync(id) {
    console.log("sign")
  try {
    const result = await Google.logInAsync({
      androidClientId: '767475818166-ngdapu6mh2kj2e50j5hsj53cneqtqrgc.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

      if (result.type === 'success') {
          console.log(result)
          getGoogle(id, result.accessToken, result.refreshToken)
          .then(response => response.text())
          .then(data => console.log(data))
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

