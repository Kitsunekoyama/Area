import React from 'react'
import {View, Text, Pressable, SafeAreaView, StyleSheet, FlatList} from 'react-native'
import Add_Action_Items from '../Components/Add_Action_Items'

//services[0].services

class Add_Action extends React.Component {
    constructor(props) {
        super(props)
        this.userId = this.props.navigation.state.params.userId;
    }
    _displayDetailServices = (id) => {
        //console.log("Display service with id " + id)
        this.props.navigation.navigate("Choose_Action", { userId: this.userId, idService: id, serv: this.props.navigation.state.params.serv })
      }

    render() {
        const params = this.props.navigation.state.params;
        //console.log("\n\nADD_ACTION")
        //console.log(params)
        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.title_container}>
                    <Text style={styles.title_text}>Recommanded Services</Text>
                </View>
                <View style={styles.display_container}>
                    <FlatList
                        data={params.serv.services}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={(item) => <Add_Action_Items service={item} displayDetailServices = {this._displayDetailServices}/>}
                        numColumns={2}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    title_container: {
        flex: 1,
        margin : 5,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "green"
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    display_container: {
        flex: 9,
        alignItems: 'center',
        margin: 5,
        //backgroundColor: 'red'
    }
})

export default Add_Action;