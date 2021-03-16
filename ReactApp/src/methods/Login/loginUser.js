import axios from 'axios'

const LoginUser = (email, password) => {
    const url = `http://wordlib-env.eba-qaxzbsq8.us-east-1.elasticbeanstalk.com/login`
        axios({
            method:'post',
            url:url,
            data:{
                'email': email,
                'password' : password
            }
        })
        .then((res)=>{console.log(res.data)})
        .catch((error)=>alert(error.response.data['Error Message']))
}

export default LoginUser