const LOAD_SPOTS = 'spotsState/load_spots'

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    if(response.ok){
        const {Spots} = await response.json();
        dispatch(loadSpots(Spots))
    }else {
        console.log('there was an error fetching spots')
    }
}

const initialState = {spots: {}}
const spotsReducer = (state= initialState, action) => {
    switch(action.type){
        case LOAD_SPOTS:
            return {...state, spots: {...action.spots}}
        default:
            return state
    }
}

export default spotsReducer