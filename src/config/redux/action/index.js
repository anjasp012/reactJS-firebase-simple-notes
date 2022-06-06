import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    getDatabase,
    onValue,
    push,
    ref,
    remove,
    set,
    update,
} from "firebase/database";

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true });
        createUserWithEmailAndPassword(getAuth(), data.email, data.password)
            .then((res) => {
                console.log("success", res);
                dispatch({ type: "CHANGE_LOADING", value: false });
                resolve(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                dispatch({ type: "CHANGE_LOADING", value: false });
                reject(false);
            });
    });
};

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true });
        signInWithEmailAndPassword(getAuth(), data.email, data.password)
            .then((res) => {
                const dataUser = {
                    email: res.user.email,
                    id: res.user.uid,
                    emailVerified: res.user.emailVerified,
                    refreshToken: res.user.refreshToken,
                };
                dispatch({ type: "CHANGE_LOADING", value: false });
                dispatch({ type: "CHANGE_ISLOGIN", value: true });
                dispatch({ type: "CHANGE_USER", value: dataUser });
                resolve(dataUser);
            })
            .catch((error) => {
                const errorCode = error.code;
                // console.log(errorCode);
                if (error.code === "auth/wrong-password") {
                    alert("password salah");
                }
                if (errorCode === "auth/user-not-found") {
                    alert("Email yang anda masukan tidak terdaftar");
                }
                dispatch({ type: "CHANGE_LOADING", value: false });
                reject(false);
            });
    });
};

export const addDataToAPI = (data) => (dispatch) => {
    push(ref(getDatabase(), "notes/" + data.userId), {
        title: data.title,
        content: data.content,
        date: data.date,
    });
};

export const getDataFromAPI = (userId) => (dispatch) => {
    const starCountRef = ref(getDatabase(), "notes/" + userId);
    return new Promise((resolve) => {
        onValue(starCountRef, (snapshot) => {
            const data = [];
            Object.keys(snapshot.val()).map((key) => {
                data.push({
                    id: key,
                    data: snapshot.val()[key],
                });
            });
            // console.log("get Data", data);
            dispatch({ type: "CHANGE_NOTES", value: data });
            resolve(data);
        });
    });
};

export const updateDataAPI = (data) => (dispatch) => {
    return new Promise((reject, resolve) => {
        update(
            ref(getDatabase(), "notes/" + data.userId + "/" + data.noteId),
            {
                title: data.title,
                content: data.content,
                date: data.date,
            },
            (err) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            }
        );
    });
};

export const removeDataAPI = (data) => (dispatch) => {
    return new Promise((reject, resolve) => {
        remove(
            ref(getDatabase(), "notes/" + data.userId + "/" + data.noteId),
            (err) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            }
        );
    });
};
