import { csrfFetch } from "./csrf";


const LOAD_SPOTS = 'spotsState/load_spots';
const ONE_SPOT = 'spotsState/one_spot';
const CREATE_SPOT = 'spotsState/create_spot';
const ADD_IMG = 'spotsState/add_img';
const DELETE_SPOT = 'spotsState/delete_spot'

// action creator

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const oneSpot = (spot) => ({
    type: ONE_SPOT,
    spot
});


export const addImg = (img) => ({
    type: ADD_IMG,
    img
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

// THUNK
export const removeSpot = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method:'DELETE'
    });
    if(res.ok){
        dispatch(deleteSpot(spotId));
        return;
    }else {
        console.log('can not delete spot')
    }
}

// export const addImgBySpotId = (spotId, img) => async (dispatch)=> {
//     const res = await csrfFetch(`api/spots/${spotId}/images`,{
//         method:'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(img)
//     });
//     if(res.ok){
//         const data = await res.json();
//         dispatch(addImg(spotId, data));
//         return data;
//     }else {
//         const error = await res.json();
//         throw new Error(error)
//     }
// }

export const createNewSpot = (spot, previewImage, images) => async (dispatch) => {
   try {
    // POST NEWSPOT
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if(response.ok){
        // PARSE response get ID
        const newSpot = await response.json();
        console.log('new spot without images',newSpot)
        const spotImages = [];
        // POST prevIMG
        const previewImageRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: previewImage, preview: true}),
        });
        // PARSE & PUSH prevIMG 
        if(previewImageRes.ok){
            const newPrevImg = await previewImageRes.json();
            spotImages.push(newPrevImg);
        }
        // CHECK OTHER IMG
        for(const image of images) {
            if(image){
                // POST IMG
                const imageRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({url: image, preview: false})
                });
                if(imageRes.ok) {
                    const newImg = await imageRes.json();
                    spotImages.push(newImg);
                }
            }
        }
        newSpot.images = spotImages;

        // DISPATCH ACTION CREATOR
        dispatch(createSpot(newSpot));
        return newSpot;
    }else {
        const error = await response.json();
        throw new Error(error)
    }
   } catch(error) {
    console.error('error while fetching images', error);
    throw error;
   }

}


export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    if (response.ok) {
        const { Spots } = await response.json();
        // const spots = await response.json()
        // dispatch(loadSpots(spots))
        dispatch(loadSpots(Spots))
        return Spots;
    } else {
        console.log('there was an error fetching spots')
    }
}

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json();
        
        // console.log('this is the data from reducer',data)
        dispatch(oneSpot(data));
    } else {
        console.log('there was an error fetching spot')
    }
}

// REDUCER
const initialState = { allSpots: {}, currentSpot: {} }
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = {
                ...state,
                allSpots: {}
            }
            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case ONE_SPOT:{
            return { ...state, currentSpot: action.spot }
        }
        case CREATE_SPOT: {
            const newSpot = action.spot;
            const newState = {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    [newSpot.id]:newSpot
                },
                currentSpot: newSpot
            }
            return newState;
        }
        case ADD_IMG: {
            // const newImg = action.img;
            const {spotId, image} = action;
            const spot = state[spotId];
            if(!spot){
                return state;
            }
            return {
                ...state,
                [spotId]: {
                    ...spot,
                    images: [...spot.images, image]
                }
            }
        }
        case DELETE_SPOT: {
            const newState = {...state};
            delete newState[action.spotId];
            return newState;
        }
        default:
            return state
    }
}

export default spotsReducer