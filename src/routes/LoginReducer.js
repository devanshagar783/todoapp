const initialState = {
    token: '',
    isLoggedIn: false,
    todos: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "VALID_USER":
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload
            }
        case "ADDING_TODO":
            return {
                ...state,
                todos: action.paylaod[0]
            }
        default:
            return state
    }
}

export default reducer