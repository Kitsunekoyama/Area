import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getReactionDetail, getCreate, signInWithGoogleAsync } from '../Server/Calls'
import Reaction_Config_Items from './Reaction_Config_Items'

class Reaction_Config extends React.Component {
    constructor(props) {
        super(props),
        this.args = []
        this.userId = this.props.navigation.state.params.userId;
        this.state = { info: undefined }
    }

    componentDidMount() {
        console.log(this.userId)
        const ids = this.props.navigation.state.params
        this.userId.srId = ids.id_Service_Reaction;
        this.userId.rrId = ids.id_Action_Reaction;
        getReactionDetail(ids.id_Service_Reaction, ids.id_Action_Reaction)
        .then(data => this.setState({info : data}))
    }

    /*_gotoAddReaction (id_Service_Action, id_Action_Action) {
        //console.log("Display service with id " + id)
        this.props.navigation.navigate("Add_Reaction", {
            id_Service_Action: id_Service_Action,
            id_Action_Action: id_Action_Action,
            serv: this.props.navigation.state.params.serv})
      }*/

    _argsChanged = (text, id) => {
        this.props.navigation.state.params.serv.services[this.userId.srId].reaction[this.userId.rrId].arg[id].value = text;
    }
    sendInfo() {
        for (let x = 0;x != this.state.info.arg.length;x++) {
            if (this.state.info.arg[x].name == "google") {
                signInWithGoogleAsync(this.userId)
            }
        }
        
        getCreate(this.userId.userId, this.props.navigation.state.params.serv.services[this.userId.saId].action[this.userId.aaId], this.props.navigation.state.params.serv.services[this.userId.srId].reaction[this.userId.rrId])
        .then(data => this.props.navigation.navigate("Dashboard", {userId: this.userId, back: true}))

    }

    _display() {
        if (this.state.info != undefined) {
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
                                renderItem={(item) => <Reaction_Config_Items info={item} argsChanged={this._argsChanged} />}
                            />
                        </KeyboardAwareScrollView>
                    </View>
                    {<View>
                        <Button
                            onPress={() => this.sendInfo()}
                            color={params.color}
                            title="Continue"
                        />
                    </View>}
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

export default Reaction_Config;
