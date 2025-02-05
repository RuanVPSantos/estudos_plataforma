class Cookie {
    static setCookie(name: string, value: string, days: number = 7) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);

        const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = cookie;
    }


    static getCookie(name: string): string | null {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

    static removeCookie(name: string) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

export default Cookie;

