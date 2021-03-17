import AsyncStorage from '@react-native-async-storage/async-storage'

const GetToken = (new_token) => {
    const token = new_token
    console.log(token)
    return token;
};

export default GetToken;