import React from 'react'
import {View, Text, Pressable, Image, SafeAreaView, StyleSheet} from 'react-native'

class Add_Reaction_Items extends React.Component {
    _displayItems() {
        const {service, displayDetailServices} = this.props
        //console.log("ADD_ACTION_ITEM_2")
        //console.log(service)
        if (service.item.reaction != undefined && service.item.reaction.length > 0) {
            return (
                <Pressable 
                    style={[styles.display_view, {backgroundColor: service.item.color}]}
                    onPress={() => displayDetailServices(service.item.id)}
                >
                    <Image
                        style={styles.image}
                        source={{uri: service.item.logo}}
                    />
                    <Text style={styles.text_name_service}>{service.item.name}</Text>
                </Pressable>
            )
        }
    }
    
    render () {
        //console.log("ADD_REACTION_ITEM_2")
        //console.log(this.props)
        return (
            <View>
                {this._displayItems()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    display_view: {
        margin: 7,
        alignItems: 'center',
    },
    image: {
        width: "45%",
        aspectRatio: 1,
        margin: 5,
    },
    text_name_service: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 5
    }
})

export default Add_Reaction_Items;