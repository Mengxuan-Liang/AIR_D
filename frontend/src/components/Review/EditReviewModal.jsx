// import { useSelector } from 'react-redux';
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from 'react-redux'
import { updateReview, getAllReviewByUserId } from "../../store/reviewReducer"
// import { getAllSpots, getOneSpot } from "../../store/spotsReducer"
import { useEffect, useState } from "react";
// import { GoStarFill } from "react-icons/go";
// import './PostReviewModal.css';



export default function EditReviewModal({ userReview, spotName }) {
    // console.log('userReviewwwww from editreview modal',userReview)
    const sessionUserId = useSelector(state => state.session.user.id)
    // console.log(session)
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState(userReview?.review);
    const [stars, setStars] = useState(userReview?.stars)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [error, setError] = useState({})

    useEffect(() => {
        const validate = () => {
            const error = {};
            if (!review) error.review = 'Review is required';
            if (!stars || stars < 1 || stars > 5) error.stars = 'Star rating must be an integer from 1 to 5';
            if (review && review.userId === sessionUserId) error.reviewed = 'You can only make one review for this spot'
            return error;
        }
        if (hasSubmitted) {
            const errors = validate();
            setError(errors)
        }
    }, [dispatch, stars, review, hasSubmitted])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);


        if (Object.values(error).length === 0) {
            const userInput = {
                review,
                stars
            }
            const newReview = await dispatch(updateReview(userReview.id, userInput));
            if (newReview) {
                // console.log('created new review from postreviewmodal', newReview)
                await dispatch(getAllReviewByUserId());
                // // console.log('sssssssssss','Closing modal'); 
                // await dispatch(getOneSpot(spotId))
            }
            await closeModal();

        }
    }

    // const [activeRating, setActiveRating] = useState(stars);
    // useEffect(() => {
    //     setActiveRating(stars);
    // }, [stars]);


    return (
        <div>
            <h2>How was your stay at
                <br></br>
                {spotName} ?</h2>
            <label>
                <textarea
                    type="text"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                >
                </textarea>
                <div className="error" >
                    {error.review && <p>{error.review}</p>}
                </div>
                {/* <div className="error" >
                            {error.discription && <p>{error.discription}</p>}
                        </div> */}
            </label>
            <label>
                Star
                <input
                    type="number"
                    value={stars}
                    onChange={e => setStars(e.target.value)}
                />
                <div className="error" >
                    {error.stars && <p>{error.stars}</p>}
                </div>

            </label>

            {/* <div className="rating-input">
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(1) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                        onClick={() => { if (!disabled) onChange(1) }}
                    >
                        <GoStarFill />
                    </div>
                    <div
                        className={activeRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(1) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                        onClick={() => { if (!disabled) onChange(1) }}
                    >
                        <GoStarFill />
                    </div>
                    <div
                        className={activeRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(1) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                        onClick={() => { if (!disabled) onChange(1) }}
                    >
                        <GoStarFill />
                    </div>
                    <div
                        className={activeRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(1) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                        onClick={() => { if (!disabled) onChange(1) }}
                    >
                        <GoStarFill />
                    </div>
                    <div
                        className={activeRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(1) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                        onClick={() => { if (!disabled) onChange(1) }}
                    >
                        <GoStarFill />
                    </div>
                </div> */}

            <div>
                <button onClick={handleSubmit}>Update Your Review</button>

            </div>
        </div>
    )
}