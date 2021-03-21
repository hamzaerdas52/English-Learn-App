import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react'
import {
    Text,
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome5'
import UrlIndex from '../../methods/url';
import CategoryItem from '../../components/AppComponents/CategoryItem'

export default class Home extends Component {

    constructor() {
        super()
        this.state = {
            user_token: '',
            category: []
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('User_Token').then((res) => {
            const token = res
            this.setState({ user_token: token })
            this._getCategory()
        })
    }

    _getCategory = () => {
        const token = this.state.user_token
        const url = UrlIndex + 'category'
        axios({
            method: 'GET',
            url: url,
            // data : {
            //     name : 'Arabalar'
            // },
            headers: { token }
        })
            .then((res) => {
                var category = []
                res.data.forEach((item) => {
                    category.push({
                        name: item.name,
                        id: item.id
                    })
                })
                this.setState({ category: category })
            })
            .catch((error) => console.log(error.response.data))
    }

    _renderItem = ({ item }) => {
        return (
            <CategoryItem item={item} />
        )
    }

    render() {
        const { category } = this.state
        return (
            <View style={style.body}>
                <View style={style.header}>
                    <View style={style.menü_button_area}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}
                            style={style.menü_button}>
                            <Icon name={'bars'} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: '700' }} > WORDLİB </Text>
                    </View>
                    <View>
                    </View>
                </View>
                <View>
                    <View>
                        <TouchableOpacity>
                            <Text>Kategoriler</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList 
                            style={style.category}
                            data={category}
                            renderItem={this._renderItem}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '5%',
        backgroundColor: '#a7c2d3'
    },
    menü_button_area: {
        left: wp('4%')
    },
    menü_button: {
    },
    category:{
        marginTop:'6%',
        paddingHorizontal:'5%'
    }
})
