function authTokenHeader() {
    const storedToken = localStorage.getItem("authToken");
    return { Authorization: `Bearer ${storedToken}` }
}

export default authTokenHeader;