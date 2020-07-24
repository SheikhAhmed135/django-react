import * as actionTypes from "./actionsTypes";

import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

const checkAuthTimeout = (expirationTime) => {
    return (dispatchEvent) => {
        setTimeout(() => {
            dispatchEvent(logout());
        }, expirationTime * 1000);
    };
};

export const authLogin = (username, password) => {
    return (dispatchEvent) => {
        dispatchEvent(authStart());
        axios
            .post("http://127.0.0.1:8000/rest-auth/login/", {
                username: username,
                password: password,
            })
            .then((res) => {
                const token = res.data.key;
                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatchEvent(authSuccess(token));
                dispatchEvent(checkAuthTimeout(3600));
            })
            .catch((err) => {
                dispatchEvent(authFail(err));
            });
    };
};

export const authSignup = (username, email, password1, password2) => {
    return (dispatchEvent) => {
        dispatchEvent(authStart());
        axios
            .post("http://127.0.0.1:8000/rest-auth/signup/", {
                username: username,
                email: email,
                password1: password1,
                password2: password2,
            })
            .then((res) => {
                const token = res.data.key;
                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatchEvent(authSuccess(token));
                dispatchEvent(checkAuthTimeout(3600));
            })
            .catch((err) => {
                dispatchEvent(authFail(err));
            });
    };
};

export const authCheckState = () => {
    return (dispatchEvent) => {
        const token = localStorage.getItem("token");
        if (token === undefined) {
            dispatchEvent(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatchEvent(logout());
            } else {
                dispatchEvent(authSuccess(token));
                dispatchEvent(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
