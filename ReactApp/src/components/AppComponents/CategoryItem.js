import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

export default class CategoryItem extends Component {
    render() {
        const { item } = this.props
        return (
            <View>
                <View>
                    <TouchableOpacity
                        style={style.item_name_btn}
                    >
                        <Text style={style.item_name_text}> {item.name} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    item_name_btn: {
        padding: '3%',
        backgroundColor: '#4c70ac',
        marginBottom: '2%',
        borderRadius:10
    },
    item_name_text: {
        color: 'white',
        fontSize: 17,
        fontWeight: '700'
    }
})
