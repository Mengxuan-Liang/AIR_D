import { csrfFetch } from "./csrf";


const LOAD_REVIEWS = 'reviewsState/load_reviews';
const REMOVE_REVIEW = 'reviewsState/remove_review';



export const deleteReview = (reviewId) => ({
    type: REMOVE_REVIEW,
        reviewId
})

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const removeReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        // const res = await res.json();
        dispatch(deleteReview(reviewId))
        return;
    } else {
        console.log('can not delete review')
    }
}

export const getAllReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const data = await res.json();
        // console.log('this is fetched revirew from revviewreducer',data)
        dispatch(loadReviews(data));
        return data;
    } else {
        console.log('there was an error fetching reviews')
    }
}

const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {

            return { ...state, ...action.reviews }
        }
        // case REMOVE_REVIEW: {
        //     const newState = { ...state };
        //     delete newState[action.reviewId];
        //     return newState;
        // }
        default: {
            return state
        }

    }
}

export default reviewsReducer