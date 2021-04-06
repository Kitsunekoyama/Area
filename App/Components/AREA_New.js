import React from 'react'
import {View, Text, Pressable, SafeAreaView, StyleSheet} from 'react-native'
import { getServices } from '../Server/Calls'

class AREA_New extends React.Component {
    constructor(props) {
        super(props)
        this.state = { services: [] }
    }

    componentDidMount() {
        getServices().then(data => this.setState({ services: data }))
    }

    _pressButton() {
        console.log("Pressed");
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.add_container}>
                    <Pressable style={styles.button_container} onPress={() => this.props.navigation.navigate("Add_Action", {serv : this.state.services})}>
                        <Text style={styles.add_text}>Add Action +</Text>
                    </Pressable>
                    <Pressable style={styles.button_container} onPress={() => this._pressButton()}>
                        <Text style={styles.add_text}>Add Reaction +</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    add_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button_container: {
        margin: 5,
    },
    add_text: {
        textAlign: "center",
        borderColor: "red",
        borderWidth: 4,
        borderRadius: 15,
        margin: 5,
        padding: 4,
        fontWeight: "bold",
        fontSize: 20
    },
})

export default AREA_New;