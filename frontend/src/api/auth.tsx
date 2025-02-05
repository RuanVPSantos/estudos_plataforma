import Cookie from "./cookie";

class Auth {

    static setAuthCookie(token: string) {
        Cookie.setCookie('authToken', token, 7);
    }

    static getAuthCookie(): string | null {
        return Cookie.getCookie('authToken');
    }

    static removeAuthCookie() {
        Cookie.removeCookie('authToken');
    }
}

export default Auth;
