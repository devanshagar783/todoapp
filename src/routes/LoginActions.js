const validateUser = (payload) => {
    console.log("Payload: ", payload)
    if (payload === "") {
        return {
            type: "INVALID",
            payload: ""
        }
    }
    else {
        return {
            type: "VALID_USER",
            payload: payload
        }
    }
}

export default validateUser