import authCostant from "../constant/AuthConstant"
import { useNavigate } from "react-router-dom";

let authAction = {
    
    login() {

    },
    loginSuccess() {

    },
    loginFailed() {

    },
    logout() {
        localStorage.setItem('user', null);
        return {
            type: authCostant.LOGIN_LOGOUT
        }
    }
}

export default authAction;