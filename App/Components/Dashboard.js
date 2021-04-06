import React from 'react'
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, FlatList, Pressable } from 'react-native'
import actions from '../Helpers/data'
import Dashboard_Items from './Dashboard_Items'
import { getServices, getHub } from '../Server/Calls'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.idList = {userId: this.props.navigation.state.params.userId, saId: -1, aaId: -1, srId: -1, rrId: -1}
        this.userData = [];
        this.state = { services: [], hub: [] }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.navigation.state.params.back == true) {
            this.props.navigation.state.params.back = false;
            getHub(this.idList.userId).then(data => this.userData = data).then(data => getServices().then(data => this.setState({ services: data })))
        }
      }
    componentDidMount() {
        getHub(this.idList.userId).then(data => this.userData = data).then(data => getServices().then(data => this.setState({ services: data })))
    }

    _display() {
        return(
            <SafeAreaView style={styles.main_container}>
                <View style={styles.name_logo_container}>
                    <Text style={{fontWeight: 'bold', fontSize: 40}}>AREA</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 40}}>PP</Text>
                </View>
                <Pressable style={styles.plus_container} onPress={() => this.props.navigation.navigate("Add_Action", {serv : this.state.services, userId: this.idList})}>
                    <Text style={styles.plus_display}>NEW AREA +</Text>
                </Pressable>
                <View style={styles.display_AREA_container}>
                   <FlatList
                        data={this.userData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <Dashboard_Items userData = {item}/>}
                   />
                </View>
            </SafeAreaView>
        )


    }
    render() {
        return(<View style={{flex:1}}>
        {
            this._display()
        }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    name_logo_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        //backgroundColor: 'green'
    },
    plus_container: {
        flex: 1,
        justifyContent: "center",
        //backgroundColor: 'red'
    },
    plus_display: {
        textAlign: "center",
        borderColor: "red",
        borderWidth: 4,
        borderRadius: 15,
        margin: 5,
        marginTop: 10,
        padding: 4,
        fontWeight: "bold",
        fontSize: 20
    },
    display_AREA_container: {
        flex: 6,
        alignItems: 'center',
        justifyContent:'center',
        //backgroundColor: 'blue'
    },
})

export default Dashboard;
