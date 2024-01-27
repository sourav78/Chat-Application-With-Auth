import Cookie from 'js-cookie'

const removeCookie = (cookieName) => {
    return Cookie.remove(cookieName)
}

export default removeCookie