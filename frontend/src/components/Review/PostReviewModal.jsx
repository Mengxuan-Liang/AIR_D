import { useModal } from "../../context/Modal"
import { useDispatch } from 'react-redux'
import { getAllReviews, addReview } from "../../store/reviewReducer"
import { getOneSpot } from "../../store/spotsReducer"
import { useEffect, useState } from "react";
// import { GoStarFill } from "react-icons/go";
// import './PostReviewModal.css';


export default function PostReviewModal({ spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [error, setError] = useState({})

    useEffect(() => {
        const validate = () => {
            const error = {};
            if (!review) error.review = 'Review is required';
            if (!stars || stars < 1 || stars > 5) error.stars = 'Star rating must be an integer from 1 to 5';
            // if (review && review.userId === session.user.id) error.reviewed = 'You can only make one review for this spot'
            return error;
        }
        if (hasSubmitted) {
            const errors = validate();
            setError(errors)
        }
    }, [dispatch, stars, review,hasSubmitted])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(error).length === 0) {
            const userInput = {
                review,
                stars
            }
            const newReview = await dispatch(addReview(spotId, userInput));
            if (newReview) {
                // console.log('created new review from postreviewmodal', newReview)
                await dispatch(getAllReviews(spotId));
                // // console.log('sssssssssss','Closing modal'); 
                await dispatch(getOneSpot(spotId))
            }
            await closeModal();

        }
    }
    const isButtonDisabled = review.length<10 || stars < 1 

    // stars
    // const [activeRating, setActiveRating] = useState(stars);
    // useEffect(() => {
    //     setActiveRating(stars);
    //   }, [stars]);

    return (
        <div>
            <h2>How was your stay?</h2>
            <label>
                <textarea
                    type="text"
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={e => setReview(e.target.value)}
                >
                </textarea>
                <div className="error" >
                    {error.review && <p>{error.review}</p>}
                </div>
            </label>
            <label>
                Star
                <input
                    type="number"
                    value={stars}
                    onChange={e => setStars(e.target.value)}
                >
                </input>
                {/* <div className="rating-input">
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(1)} }
                        onMouseLeave={() => { if (!disabled) setActiveRating(stars)} }
                        onClick={() => { if (!disabled) onChange(1)} }
                    >
                    <GoStarFill />
                    </div>
                    <div 
                    className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(1)} }
                        onMouseLeave={() => { if (!disabled) setActiveRating(stars)} }
                        onClick={() => { if (!disabled) onChange(1)} }
                    
                    >
                    <GoStarFill />
                    </div>
                    <div className="empty">
                    <GoStarFill />
                    </div>
                    <div className="empty">
                    <GoStarFill />
                    </div>
                    <div className="empty">
                    <GoStarFill />
                    </div>
                </div> */}
                <div className="error" >
                    {error.stars && <p>{error.stars}</p>}
                </div>

            </label>

            <div>

                <button onClick={handleSubmit} disabled={isButtonDisabled}>Submit Your Review</button>
                {/* <button onClick={()=> closeModal()}>No (Keep Review)</button> */}
            </div>
        </div>
    )
}