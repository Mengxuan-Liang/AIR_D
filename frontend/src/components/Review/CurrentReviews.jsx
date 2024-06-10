import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from './DeleteReviewModal';
import EditReviewModal from './EditReviewModal';
import { useEffect } from 'react';
import { getAllReviewByUserId } from '../../store/reviewReducer';
import { getAllSpots } from '../../store/spotsReducer';


export default function CurrentReviews() {
    const dispatch = useDispatch();

    const currentUserAllReviews = useSelector(state => state.reviewsState);
    const reviews = Object.values(currentUserAllReviews);

    const spots = useSelector(state => state.spotsState.allSpots);
    // console.log('get all spots', spots);
    // const spot = Object.values(spotState);
    // console.log('alllllll reviews from currentRevies',currentUserAllReviews)
    // console.log('spots from currentRevies',spots)
    useEffect(()=> {
        dispatch(getAllSpots())
        dispatch(getAllReviewByUserId())
    },[dispatch])
   
    return (
        <div>
            <h2>Manage Reviews</h2>
            <div>
                {reviews &&
                    reviews.length > 0 &&
                    reviews.map((review, index) => {
                        const createdAtDate = new Date(review?.createdAt);
                        const month = createdAtDate.toLocaleString("default", {
                            month: "long",
                        });
                        const year = createdAtDate.getFullYear();
                        const spot = spots[review.spotId]                        
                        return (
                            <>
                                <div key={index} className='actual-reviews'>
                                    <div className='item' style={{ fontSize: '18px' }}>{review?.User?.firstName}</div>
                                    <div className='item' style={{ fontSize: "14px" }}>{`${month} ${year}`}</div>
                                    <div className='item' style={{ fontSize: "12px" }}>{review?.review}</div>
                                    <div>
                                       
                                            <div>
                                                <OpenModalButton
                                                    buttonText={'Update'}
                                                    modalComponent={<EditReviewModal userReview = {review} spotName={spot?.name}  spotId={spot?.id} key={spot?.id}/>}
                                                />
                                            </div>
                                            <div>
                                                <OpenModalButton
                                                    buttonText={'Delete'}
                                                    modalComponent={<DeleteReviewModal reviewId={review?.id} spotId={spot?.id} key={spot?.id}/>}
                                                />
                                            </div>
                                       
                                    </div>
                                </div>



                            </>

                        );
                    })

                }
            </div>
        </div>
    )
}