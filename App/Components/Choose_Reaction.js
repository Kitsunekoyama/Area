import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { getServiceDetail } from '../Server/Calls'
import Choose_Reaction_Items from './Choose_Reaction_Items'

class Choose_Reaction extends React.Component {
    constructor(props) {
        super(props),
        this.userId = this.props.navigation.state.params.userId;
        this.state = { info: undefined }
    }

    componentDidMount() {
        getServiceDetail(this.props.navigation.state.params.idService)
        .then(data => this.setState({ info: data }))
    }

    _gotoReaction_Config = (id_Service_Reaction, id_Reaction_Reaction, color) => {
        //console.log("Display service with id " + id)
        this.props.navigation.navigate("Reaction_Config", {
            id_Service_Reaction: id_Service_Reaction,
            id_Action_Reaction: id_Reaction_Reaction,
            color: color,
            serv: this.props.navigation.state.params.serv,
            userId: this.userId})
      }

    _displayActions() {
        if (this.state.info != undefined) {
            const id_Service_Reaction = this.props.navigation.state.params.idService
            const info = this.state.info.services;
            //console.log("CHOOSE_REACTION_1")
            //console.log(info)
            return (
                <SafeAreaView style={styles.main_container}>
                    <View style={[styles.title_container, {backgroundColor: info.color}]}>
                        <Text style={styles.title_text}>{info.name}</Text>
                        <Text style={styles.title_text}>Choose a reaction by clicking on it</Text>
                    </View>
                    <View style={styles.list_container}>
                        <FlatList
                            data={info.reaction}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(item) => <Choose_Reaction_Items _info={item} _id_Service_Reaction={id_Service_Reaction} _color={info.color} gotoReaction_Config={this._gotoReaction_Config}/>}
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

export default Choose_Reaction;