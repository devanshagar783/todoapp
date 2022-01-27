export const validateUser = (payload) => {
    if (payload === "") {
        return {
            type: "INVALID",
            payload: ""
        }
    }
    else {
        return {
            type: "VALID_USER",
            payload: payload[0]
        }
    }
}

export const addTodoFromLocal = (payload) => {
    return {
        type: "ADDING_TODO",
        paylaod: payload
    }
}