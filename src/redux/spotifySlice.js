export const incrementAsync = (amount) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(incrementByAmount(amount))
        }, 1000)
    }
}