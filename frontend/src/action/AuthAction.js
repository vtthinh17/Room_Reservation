import authCostant from "../constant/AuthConstant"

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