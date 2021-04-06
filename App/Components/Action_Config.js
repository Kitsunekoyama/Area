import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getActionDetail, signInWithGoogleAsync } from '../Server/Calls'
import Action_Config_Items from './Action_Config_Items'


class Action_Config extends React.Component {
    constructor(props) {
        super(props)
        this.userId = this.props.navigation.state.params.userId;
        this.args = []
        this.state = { info: undefined }
    }

    componentDidMount() {
        const ids = this.props.navigation.state.params
        this.userId.saId = ids.id_Service_Action;
        this.userId.aaId = ids.id_Action_Action;
        getActionDetail(ids.id_Service_Action, ids.id_Action_Action)
        .then(data => this.setState({info : data}))
    }

    _gotoAddReaction (id_Service_Action, id_Action_Action) {
        for (let x = 0;x != this.state.info.arg.length;x++) {
            if (this.state.info.arg[x].name == "google") {
                signInWithGoogleAsync(this.userId)
               }
            }
            this.props.navigation.navigate("Add_Reaction", {
            id_Service_Action: id_Service_Action,
            id_Action_Action: id_Action_Action,
            serv: this.props.navigation.state.params.serv,
            userId: this.userId})
      }

      _argsChanged = (text, id) => {
         // this.state.info.arg[id].value = text;
          this.props.navigation.state.params.serv.services[this.userId.saId].action[this.userId.aaId].arg[id].value = text;
      //  console.log(this.state.info.arg[id])
           // this.args[id] = text;
      }

    _display() {
        if (this.state.info != undefined) {
            //console.log("ACTION_CONFIG_3")
            //console.log(this.props.navigation.state.params)
            //console.log("INFO_____________INFO")
            //console.log(this.state.info)
            const params = this.props.navigation.state.params
            return (
                <SafeAreaView style={styles.main_container}>
                    <View style={[styles.title_container, {backgroundColor: params.color}]}>
                        <Text style={styles.title_text}>{this.state.info.name}</Text>
                        <Text style={styles.title_text}>{this.state.info.descr}</Text>
                    </View>
                    <View style={styles.list_container}>
                        <KeyboardAwareScrollView>
                            <FlatList
                                data={this.state.info.arg}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={(item) => <Action_Config_Items info={item} argsChanged={this._argsChanged}/>}
                            />
                        </KeyboardAwareScrollView>
                    </View>
                    <View>
                        <Button
                            onPress={() => this._gotoAddReaction(params.id_Service_Action, params.id_Action_Action)}
                            color={params.color}
                            title="Continue"
                        />
                    </View>
                </SafeAreaView>
            )
        }
    }

    render() {
        return(
            <View style={styles.main_container}>
                {this._display()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    title_container: {
        flex: 3,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding : 15
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white",
    },
    list_container: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "green"
    },
    textinput_text: {
        borderColor: "black",
        borderRadius: 15,
        borderWidth: 1,
        margin: 5,
        padding : 6,
        height: 40,
        fontSize: 20,
    },
    text_text: {
        margin: 5,
        padding: 6,
        height: 40,
        fontSize: 25,
        fontWeight: "bold"
    },
    button_container: {
        flex: 1,
    }
})

export default Action_Config;
