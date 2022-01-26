const initialState = {
    email: '',
    password: '',
    token: '',
    isLoggedIn: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "VALID_USER":
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload
            }
        default:
            return state
    }
}

export default reducer