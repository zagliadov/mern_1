import { GET_ARTICLE, CREATE_USER, GET_USER, OPEN, GET_MATCH_PARAMS_ID, SCROLL } from "./types"

const initialValue = {
    posts: [],
    open: true,
    post: [],
    scrollPosition: 0,
    users: [],
    user: [],

}

export const postsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case GET_ARTICLE:
            return { ...state, posts: action.payload }
        case OPEN:
            return { ...state, open: action.payload }
        case GET_MATCH_PARAMS_ID:
            return { ...state, post: action.payload }
        case SCROLL:
            return { ...state, scrollPosition: action.payload }
        case CREATE_USER:
            console.log('create: ', action.payload)
            return { ...state, users: action.payload }
        case GET_USER:
            console.log('GET ', action.payload)
            return { ...state, user: action.payload }
        default: return state
    }
}