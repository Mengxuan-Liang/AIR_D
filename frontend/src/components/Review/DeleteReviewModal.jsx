import { useModal } from "../../context/Modal"
import {useDispatch} from 'react-redux'
import { getAllReviews, removeReview } from "../../store/reviewReducer"
import { getOneSpot } from "../../store/spotsReducer"
import '../LoginFormModal/LoginForm.css'


export default function DeleteReviewModal({reviewId, spotId}) {
    const dispatch= useDispatch()
    const {closeModal} = useModal()

    // console.log('this is the review from delete review',review)
    // console.log('this is the review from delete review',spotId)
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(removeReview(reviewId));
        await dispatch(getAllReviews(spotId));
        await dispatch(getOneSpot(spotId));
        // console.log('sssssssssss','Closing modal');
        // await dispatch(getOneSpot(spotId))
        await closeModal();
    }

    return (
        <div className="log-sign-form">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>

            <div>
                <button onClick={handleDelete}>Yes (Delete Review)</button>
                <button onClick={()=> closeModal()}>No (Keep Review)</button>
            </div>
        </div>
    )
}
