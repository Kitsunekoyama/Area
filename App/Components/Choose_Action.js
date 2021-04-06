import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { getServiceDetail } from '../Server/Calls'
import Choose_Action_Items from './Choose_Action_Items'

class Choose_Action extends React.Component {
    constructor(props) {
        super(props),
        this.state = { info: undefined }
        this.userId = this.props.navigation.state.params.userId;
    }

    componentDidMount() {
        getServiceDetail(this.props.navigation.state.params.idService)
        .then(data => this.setState({ info: data }))
    }

    _gotoAction_Config = (id_Service_Action, id_Action_Action, color) => {
        //console.log("Display service with id " + id)
        this.props.navigation.navigate("Action_Config", {
            id_Service_Action: id_Service_Action,
            id_Action_Action: id_Action_Action,
            color: color,
            serv: this.props.navigation.state.params.serv,
            userId: this.userId})
      }

    _displayActions() {
        if (this.state.info != undefined) {
            const id_Service_Action = this.props.navigation.state.params.idService
            const info = this.state.info.services;
            console.log("CHOOSE_ACTION_1")
            //console.log(info)
            console.log(this.props.navigation.state.params)
            return (
                <SafeAreaView style={styles.main_container}>
                    <View style={[styles.title_container, {backgroundColor: info.color}]}>
                        <Text style={styles.title_text}>{info.name}</Text>
                        <Text style={styles.title_text}>Choose an action by clicking on it</Text>
                    </View>
                    <View style={styles.list_container}>
                        <FlatList
                            data={info.action}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(item) => <Choose_Action_Items _info={item} _id_Service_Action={id_Service_Action} _color={info.color} gotoAction_Config={this._gotoAction_Config}/>}
                        />
                    </View>
                </SafeAreaView>
            )
        }
    }

    render() {
        return(
            <View style={styles.main_container}>
                {this._displayActions()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:  {
        flex: 1,
    },
    title_container: {
        flex: 3,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white",
    },
    list_container: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "green"
    }
})

export default Choose_Action;