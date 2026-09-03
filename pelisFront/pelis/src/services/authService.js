
import axios from "axios";
import { API_URL, REGISTER_ENDPOINT, LOGIN_ENDPOINT } from "./api";


export async function RegisterService(name, email, password){

    const registerJson = {
        "name":name,
        "email":email,
        "password":password
    }

    const resp =  await axios.post(REGISTER_ENDPOINT, registerJson);
    if(resp.status == 201){
        console.log(resp.data);
        return {status:true, data:resp}
    }
    return {status:false, data:resp}

}


export async function LoginService(email, password){
    //El jwt token  esta en las cookies con withCredentials:true se envia automaticamente
    const loginJson = {
        "email":email,
        "password":password
    }

    const resp = await axios.post(LOGIN_ENDPOINT, loginJson, {withCredentials:true});
    if(resp.status == 202){
        console.log(resp.data);
        localStorage.setItem("bearer", resp.data.btoken)
        return {status:true, data:resp};
    }
    return {status:false, data:resp};
}

