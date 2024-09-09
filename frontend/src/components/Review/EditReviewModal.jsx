// import { useSelector } from 'react-redux';
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from 'react-redux'
import { updateReview, getAllReviewByUserId } from "../../store/reviewReducer"
// import { getAllSpots, getOneSpot } from "../../store/spotsReducer"
import { useEffect, useState } from "react";
import { FaPaw } from 'react-icons/fa6';
import '../LoginFormModal/LoginForm.css'
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
    }, [dispatch, stars, review, hasSubmitted,sessionUserId])

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

    // PAW ICON hover effect
    const [activeRating, setActiveRating] = useState(stars);
    useEffect(() => {
        setActiveRating(stars);
    }, [stars]);
    const onChange = (num) => {
        setStars(num)
    };

    return (
        <div className="log-sign-form">
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
            {/* <label>
                Star
                <input
                    type="number"
                    value={stars}
                    onChange={e => setStars(e.target.value)}
                /> */}
                <div className="error" >
                    {error.stars && <p>{error.stars}</p>}
                </div>

            {/* </label> */}

            <div className='rating-input'>
                <div className={activeRating >= 1 ? 'filled' : 'empty'}
                    onMouseEnter={() => setActiveRating(1)}
                    onMouseLeave={() => setActiveRating(stars)}
                    onClick={() => onChange(1)}
                >
                    <FaPaw />
                </div>
                <div className={activeRating >= 2 ? 'filled' : 'empty'}
                    onMouseEnter={() => setActiveRating(2)}
                    onMouseLeave={() => setActiveRating(stars)}
                    onClick={() => onChange(2)}
                >
                    <FaPaw />
                </div>
                <div className={activeRating >= 3 ? 'filled' : 'empty'}
                    onMouseEnter={() => setActiveRating(3)}
                    onMouseLeave={() => setActiveRating(stars)}
                    onClick={() => onChange(3)}
                >
                    <FaPaw />
                </div>
                <div className={activeRating >= 4 ? 'filled' : 'empty'}
                    onMouseEnter={() => setActiveRating(4)}
                    onMouseLeave={() => setActiveRating(stars)}
                    onClick={() => onChange(4)}
                >
                    <FaPaw />
                </div>
                <div className={activeRating >= 5 ? 'filled' : 'empty'}
                    onMouseEnter={() => setActiveRating(5)}
                    onMouseLeave={() => setActiveRating(stars)}
                    onClick={() => onChange(5)}
                >
                    <FaPaw />
                </div>
            </div>

            <div>
                <button onClick={handleSubmit}>Update Your Review</button>

            </div>
        </div>
    )
}
