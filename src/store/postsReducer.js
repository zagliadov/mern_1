import { GET_ARTICLE, CREATE_USER, GET_TOKEN, GET_ROLE, OPEN, GET_MATCH_PARAMS_ID, SCROLL, REMOVE_ROLE, RELOAD_PAGE } from "./types"

const initialValue = {
    posts: [],
    open: true,
    post: [],
    scrollPosition: 0,
    users: [],
    token: '',
    role: '',

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
        case GET_TOKEN:
            console.log(action.payload)
            return { ...state, token: action.payload }
        case GET_ROLE:
            return {...state, role: action.payload[0]}
        case REMOVE_ROLE:
            return {...state, role: action.payload}
        case RELOAD_PAGE:
            return {...state, role: action.payload}
        default: return state
    }
}