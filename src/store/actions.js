import { GET_ARTICLE, OPEN, GET_MATCH_PARAMS_ID, SCROLL, CREATE_USER, GET_USER } from "./types";
import axios from 'axios';




export const createUser = (user) => {
    return async dispatch => {
        try {
            await axios.post('http://localhost:9001/signup', { ...user })
            .then(response => response.data)
            .then(data => {
                dispatch({
                    type: CREATE_USER,
                    payload: data
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const signIn = (data) => {
    return async dispatch => {
        try {
            await axios.post('http://localhost:9001/signin', { ...data })
            .then(response => response.data)
            .then(data => {
                dispatch({
                    type: GET_USER,
                    payload: data
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const saveUserType = user => {
    return ({
        type: GET_USER,
        payload: user,
    })
}
// export const getSingIn = () => {
//     return async dispatch => {
//         try {
//             await axios.get('http://localhost:9001/signin')
//             .then(response => response.data)
//             .then(data => console.log(data))
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }


export const sendDataToDataBase = (post) => {
    return async dispatch => {
        try {
            await axios.post(`http://localhost:9001/create`, { ...post })
        } catch (error) {
            console.log(error);
        }
    }
}
export const updateArticle = (open) => {
    return ({
        type: OPEN,
        payload: open,
    })
}

export const scrollUpdate = (scrollPosition) => {
    return ({
        type: SCROLL,
        payload: scrollPosition,
    })
}

export const getArticleUsingMatchParam = (id) => {
    return async dispatch => {
        try {
            await axios.get(`http://localhost:9001/post/${id}`)
                .then(response => response.data)
                .then(data => {
                    dispatch({
                        type: GET_MATCH_PARAMS_ID,
                        payload: data
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}

//test 1

export const getArticlesFromDataBase = (scrollPosition) => {
    return async dispatch => {
        try {
            if (!isNaN(scrollPosition)) {
                await axios.get(`http://localhost:9001/posts/${scrollPosition}`)
                    .then(response => response.data)
                    .then(data => {
                        dispatch({
                            type: GET_ARTICLE,
                            payload: data
                        })
                    })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

//>>>>>>
















export const deleteArticle = (id) => {
    return async dispatch => {
        try {
            await axios.delete(`http://localhost:9001/post/${id}`)
        } catch (error) {
            console.log(error);
        }
    }
}
export const postUpdate = (data) => {
    return async dispatch => {
        try {
            await axios.put(`http://localhost:9001/post-update`, { data })
        } catch (error) {
            console.log(error);
        }
    }
}



