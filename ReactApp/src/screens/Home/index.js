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
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator
} from "react-native-indicators"


import Icon from 'react-native-vector-icons/FontAwesome5'
import UrlIndex from '../../methods/url';
import CategoryItem from '../../components/AppComponents/CategoryItem'


const FetchCategories = [
    {
        image: 'paw',
        title: 'Hayvanlar'
    },
    {
        image: 'clock',
        title: 'Zaman'
    },
    {
        image: 'utensils',
        title: 'Yiyecek ve İçecekler'
    },
    {
        image: 'couch',
        title: 'Nesneler / Eşyalar'
    },
    {
        image: 'snowboarding',
        title: 'Eylemler'
    },
    {
        image: 'user-md',
        title: 'Meslekler'
    },
    {
        image: 'tshirt',
        title: 'Giyim'
    },
    {
        image: 'paw',
        title: 'Aile'
    },
    {
        image: 'paw',
        title: 'Genel'
    },
]
var images = FetchCategories.map((img) => ({
    image: img.image,
    title: img.title
}))

export default class Home extends Component {

    constructor() {
        super()
        this.state = {
            category: [],
            loading: false,
            images: images
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('User_Token').then((res) => {
            const token = res
            this._getCategory(token)
        })
    }

    _getCategory = (token) => {
        const url = UrlIndex + 'category'
        axios({
            method: 'GET',
            url: url,
            // data : {
            //     name : 'Fiiller'
            // },
            headers: { token }
        })
            .then((res) => {
                console.log(res)
                var category = []
                res.data.forEach((item) => {
                    category.push({
                        name: item.turkish_name,
                        id: item.id
                    })
                })
                this.setState({ category: category, loading:true })
                console.log(this.state.category)
            })
            .catch((error) => {
                console.log(error.response.data),
                this.props.navigation.navigate("EnLogin")
                })
    }

    _renderItem = ({ item }) => {
        return (
            <CategoryItem item={item} />
        )
    }

    render() {
        const { category, loading } = this.state
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
                        <Text style={style.header_text}> WORDLİB </Text>
                    </View>
                    <View>
                    </View>
                </View>
                <View style={style.kategori_text_area}>
                        <Text style={style.kategori_text}>Kategoriler</Text>
                </View>
                {(loading) ?
                <View>
                    <View>
                        <FlatList
                            style={style.category}
                            data={category}
                            //data = {["Hayvanlar","Zaman","Yiyecek ve İçecekler","Nesneler / Eşyalar","Eylemler","Meslekler","Giyim","Aile","Genel"]}                            
                            //data = {images}
                            renderItem={this._renderItem}
                            numColumns={3}
                        />
                    </View>
                </View>
                 : 
                <View style={style.loading_area}>
                    <BallIndicator color={"#265fca"} size={60}/>
                    <Text style={style.loading_text}>Yükleniyor</Text>
                </View>
                } 
            </View>
        )
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#F7F9FC'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp('7%'),
        backgroundColor: '#498adc'

    },
    header_text: {
        fontSize: 25,
        fontWeight: '700',
        marginRight: wp("5%")
    },
    menü_button_area: {
        left: wp('4%')
    },
    menü_button: {
    },
    category: {
        marginTop: hp("10%"),
        paddingHorizontal: '5%'
    },
    kategori_text_area: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('6%')
    },
    kategori_text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    loading_area:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:hp("30%")
    },
    loading_text:{
        marginTop:hp("7%"),
        fontSize:20,
        fontWeight:'700'
    }
})
