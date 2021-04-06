import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

class Choose_Action_Item extends React.Component {
    render() {
        const info = this.props._info.item
        const _color = this.props._color
        const id_Service_Action = this.props._id_Service_Action
        const gotoAction_Config = this.props.gotoAction_Config
        //console.log("\n\nCHOOSE_ACTION_ITEM2")
        //console.log(this.props)
        //console.log(info)
        //console.log(_color)
        return(
            <Pressable style={[styles.main_container, {backgroundColor: _color}]} onPress={() => gotoAction_Config(id_Service_Action, info.id, _color)}>
                <Text style={styles.text_name_action}>{info.name}</Text>
                <Text style={styles.text_name_action}>{info.descr}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        margin : 6,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 20,
    },
    text_name_action: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 5
    }
})

export default Choose_Action_Item;