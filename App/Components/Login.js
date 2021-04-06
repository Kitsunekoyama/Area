import React from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground } from 'react-native'
import Wallpaper from '../assets/Area_wallpaper.jpg'
import { getLogin, getSignUp} from '../Server/Calls'

class Login extends React.Component {
    constructor(props) {
        super(props)
        console.log("start")
        this.login_pseudo = ""
        this.login_password = ""
        this.signup_pseudo = ""
        this.signup_password = ""
        this.signup_password_verif = ""
        this.state = {
            show_login: true,
            user_id: undefined
        }
    }

    _Login(username, password) {
        getLogin(username, password)
        .then(data => this.props.navigation.navigate("Dashboard", {userId: data/*this.state.user_id*/}))
    }
    _SignUp(username, password) {
       // console.log("SignUp")
        ///console.log(this.signup_pseudo)
        getSignUp(username, password)
        .then(data => this.props.navigation.navigate("Dashboard", {userId: data/*this.state.user_id*/}))
    }
    _loginPseudoChanged(pseudo) {
        this.login_pseudo = pseudo;
    }

    _loginPasswordChanged(password) {
        this.login_password = password;
    }

    _signupPseudoChanged(pseudo) {
        //console.log("log")
        this.signup_pseudo = pseudo;
    }

    _signupPasswordChanged(password) {
        //console.log("mdr/20")
        this.signup_password = password;
    }

    _signupPassword_VerifChanged(password) {
        this.signup_password_verif = password;
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <ImageBackground source={Wallpaper} style={styles.wallpaper}>
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => this.setState({ show_login: true })}>
                        <Text style={[styles.text_menu, this.state.show_login?{color: "blue"}:{color:"grey"}]}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.text_menu}>/</Text>
                    <TouchableOpacity onPress={() => this.setState({ show_login: false })}>
                        <Text style={[styles.text_menu, this.state.show_login?{color: "grey"}:{color:"red"}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.form_container}>
                    {this.state.show_login ?
                        <View>
                            <TextInput
                                placeholder="Pseudo"
                                onChangeText={(text) => this._loginPseudoChanged(text)}
                                style={[styles.text_form, this.state.show_login?{borderColor: "blue"}:{borderColor:"red"},]}
                            />
                            <TextInput
                                placeholder="Password"
                                onChangeText={(text) => this._loginPasswordChanged(text)}
                                style={[styles.text_form, this.state.show_login?{borderColor: "blue"}:{borderColor:"red"},]}
                            />
                            <Button
                                onPress={() => this._Login(this.login_pseudo, this.login_password)}
                                //onPress={() => this.props.navigation.navigate("Dashboard")}
                                color= "blue"
                                title="Connexion" />
                        </View>
                        :
                        <View>
                            <TextInput 
                                placeholder="Pseudo" 
                                onChangeText={(text) => this._signupPseudoChanged(text)}
                                style={[styles.text_form, this.state.show_login?{borderColor: "blue"}:{borderColor:"red"},]}
                            />
                            <TextInput
                                placeholder="Password"
                                onChangeText={(text) => this._signupPasswordChanged(text)}
                                style={[styles.text_form, this.state.show_login?{borderColor: "blue"}:{borderColor:"red"},]}
                            />
                            <TextInput
                                placeholder="Check Password"
                                onChangeText={(text) => this._signupPassword_VerifChanged(text)}
                                style={[styles.text_form, this.state.show_login?{borderColor: "blue"}:{borderColor:"red"},]}
                            />
                            <Button
                                onPress={() => this._SignUp(this.signup_pseudo, this.signup_password)}
                                color= "red"
                                title="Create Account" />
                        </View>}
                </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    wallpaper: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    menu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text_menu: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 10
    },
    form_container: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: "red",
    },
    text_form: {
        fontSize: 20,
        margin: 4,
        padding: 6,
        borderWidth: 1,
        borderRadius: 15,
    }
})

export default Login;
