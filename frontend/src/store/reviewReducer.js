import { csrfFetch } from "./csrf";


const LOAD_REVIEWS = 'reviewsState/load_reviews';
const REMOVE_REVIEW = 'reviewsState/remove_review';
const CREATE_REVIEW = 'reviewsState/create_review';
const EDIT_REVIEW = 'reviewsState/edit_review';
const ALL_REVIEWS_BY_USER = 'reviewState/all_reviews_by_user';

export const getAllReviewByUser = (reviews) => ({
    type: ALL_REVIEWS_BY_USER,
    reviews
})

export const editReview = (spotId, review) => ({
    type: EDIT_REVIEW,
    spotId,
    review
})

export const createReview = (reviewId, review) => ({
    type: CREATE_REVIEW,
    reviewId,
    review
})

export const deleteReview = (reviewId) => ({
    type: REMOVE_REVIEW,
        reviewId
})

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const getAllReviewByUserId = (userId) => async(dispatch) => {
    const res = await fetch('/api/reviews/current');
    if(res.ok){
        const data = await res.json();
        dispatch(getAllReviewByUser(data));
        return data;
    }else {
        console.log('there was an error fetching reviews')
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

export const updateReview = (reviewId, review) => async(dispatch) => {
    try {
        const res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers:  { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
        if(res.ok) {
            const newReview = await res.json();
            // console.log('new review from reviewRducer', newReview)
            dispatch(createReview(reviewId, newReview));
            return newReview;
        }else {
            const error = await res.json();
            return new Error(error)
        }
    } catch(error){
        throw error;
    }
}

export const addReview = (spotId, review) => async(dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers:  { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
        if(res.ok) {
            const newReview = await res.json();
            // console.log('new review from reviewRducer', newReview)
            dispatch(createReview(spotId, newReview));
            return newReview;
        }else {
            const error = await res.json();
            return new Error(error)
        }
    } catch(error){
        throw error;
    }
}


export const removeReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        // const res = await res.json();
        dispatch(deleteReview(reviewId))
        return res;
    } else {
        console.log('can not delete review')
    }
}


const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case LOAD_REVIEWS: {
        //     // const newReviews = {};
        //     // console.log(action.reviews);
        //     // action.reviews.Reviews.forEach((review) => {
        //     //     newReviews[review.spotId] = review;
        //     // })
        //     return { ...state, ...action.reviews };
        // }
        case LOAD_REVIEWS: {
            const newReviews = {};
            // console.log(action.reviews);
            action.reviews.Reviews.forEach((review) => {
                newReviews[review.id] = review;
            })
            return newReviews;
        }
        case ALL_REVIEWS_BY_USER: {
            const newReviews = {};
            // console.log(action.reviews);
            action.reviews.Review?.forEach((review) => {
                newReviews[review.id] = review;
            })
            return newReviews;
        }
        case REMOVE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = {...state, [action.spotId]: action.review};
            return newState;
        }
        case EDIT_REVIEW: {
            const newState = {...state, [action.spotId]: action.review};
            return newState;
        }
        default: {
            return state
        }

    }
}

export default reviewsReducer