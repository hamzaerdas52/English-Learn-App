import AsyncStorage from '@react-native-async-storage/async-storage'

const GetToken = (new_token) => {
    const token = new_token
    //console.log(token)
    AsyncStorage.setItem('User_Token',token)
    return token;
};

export default GetToken;