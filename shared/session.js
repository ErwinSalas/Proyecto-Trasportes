function getSessionToken() {
    return localStorage.getItem("session.token");
}

function getLoggedUser() {
    return localStorage.getItem("session.user");
}

function closeSession() {
    localStorage.clear();
}