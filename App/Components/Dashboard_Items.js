import React from 'react'
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, Image, Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import trash from "../assets/trash_bin_icon.png"
import { getActive, getUnactive } from '../Server/Calls'
class Dashboard_Items extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props)
        this.userData = props
        this.state = {
            checked: true
        }        
    }
    render() {
        return(
            <View style={styles.main_container}>
                <View style={{flex: 1, flexDirection:'column'}}>
                    <Text style={styles.text}>ACTION</Text>
                    <Text style={styles.text}>{this.userData.userData.action.name}</Text>
                    <Text style={styles.text}>{this.userData.userData.action.descr}</Text>
                    <Text style={styles.text}>REACTION</Text>
                    <Text style={styles.text}>{this.userData.userData.reaction.name}</Text>
                    <Text style={styles.text}>{this.userData.userData.reaction.descr}</Text>
                </View>
                <CheckBox style={styles.box}
                    value={this.state.checked}
            onValueChange={() => this.setState({checked:!this.state.checked})}
                />
                <Text style={styles.text}>{this.state.checked?"Connected":"Disconnected"}</Text>
            </View>
        )
    }
}
//00ccff
const styles = StyleSheet.create({
    box: {
        color: "white"
    },
    main_container: {
        backgroundColor: '#333333',
        height: 190,
        top:10,
        marginTop: 100,
        margin : 10,
        padding: 8,
        borderRadius: 25
    },
    text: {
        color: "white"
    }
})

export default Dashboard_Items;
