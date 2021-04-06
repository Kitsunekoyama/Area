import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
//import console = require('console');

class Reaction_Config_Items extends React.Component {

    render() {
        const info = this.props.info.item;
        const argsChanged = this.props.argsChanged;
        return (
            <View>
                <Text style={styles.text_text}>{info.name}</Text>
                <TextInput
                    style={styles.textinput_text}
                    onChangeText = {(text) => argsChanged(text, this.props.info.item.id)}
                    placeholder="Text here"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        fontSize: 25,
        fontWeight: "bold"
    }
})

export default Reaction_Config_Items