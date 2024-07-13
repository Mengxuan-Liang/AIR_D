import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import SpotLists from './SpotLists';
// import Spots from './Spots';
// import sessionReducer from '../store/session';
import { getOneSpot } from '../store/spotsReducer';
import { useEffect } from 'react';
import './SpotDetails.css'
// import { FaStar } from "react-icons/fa6";
import { FaPaw } from 'react-icons/fa6';
import { getAllReviews } from '../store/reviewReducer';
import DeleteReviewModal from './Review/DeleteReviewModal'
// import LoginFormModal from './LoginFormModal/LoginFormModal';
import OpenModalButton from './OpenModalButton/OpenModalButton';
// import { useState } from 'react';
import PostReviewModal from './Review/PostReviewModal';

export default function SpotDetails() {
    const spot = useSelector(state => state.spotsState.currentSpot[0]);
    // const [spot, setSpot] = useState(initialSpot);



    const sessionUser = useSelector(state => state.session)
    const sessionUserId = sessionUser?.user?.id;
    // console.log('this is the userrrrrrrrr',sessionUser.user.id)
    // get SPOT by id:
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // console.log('this is the spot from spot details',spot)

    //get all REVIEWS by spotId:
    const reviewsState = useSelector(state => state.reviewsState);
    const reviews = Object.values(reviewsState)
    // console.log('this is the review from spot details', reviews)

    useEffect(() => {
        // dispatch(getOneSpot(spotId))
        const fetchData = async () => {
            await Promise.all([
                dispatch(getOneSpot(spotId))
            ]);
        }
        fetchData()
    }, [dispatch, spotId]);



    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                dispatch(getAllReviews(spotId))
            ])
        }
        fetchData()
    }, [dispatch, spotId])

    // const [avgRating, setAvgRating] = useState(spot.avgRating)

    return (
        <div>
            <div id='spot-detail-container'>
                <div className='spot-text'>
                    <h2>{spot?.name}</h2>
                    <span>{spot?.city}, </span>
                    <span>{spot?.state}, </span>
                    <span>{spot?.country}</span>
                </div>
                <div className='spot-detail-img'>
                    <div className='main-img'>
                        <img
                            src={spot?.SpotImages[0]?.url}
                            alt='spot-image'
                            style={{ height: '310px' }}
                        >
                        </img>
                    </div>
                    <div className='left-img'>
                        <img
                            src={spot?.SpotImages[0]?.url}
                            alt='spot-image'
                            style={{ height: '150px' }}
                            className='img'
                        >
                        </img>
                        <img
                            src={spot?.SpotImages[0]?.url}
                            alt='spot-image'
                            style={{ height: '150px' }}
                            className='img'
                        >
                        </img>
                        <img
                            src={spot?.SpotImages[0]?.url}
                            alt='spot-image'
                            style={{ height: '150px' }}
                            className='img'
                        >
                        </img>
                        <img
                            src={spot?.SpotImages[0]?.url}
                            alt='spot-image'
                            style={{ height: '150px' }}
                            className='img'
                        >
                        </img>
                    </div>
                </div>
                <div className='spot-info-container'>
                    <div className='spot-info'>
                        <h2>Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}</h2>
                        <p>{spot?.description}</p>
                    </div>
                    <div className='review-box'>
                        <div className='price-star-rating'>
                            <span >${spot?.price} night</span>
                            <div className='rating-input'>
                                <div className={spot?.avgRating >= 1 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                                <div className={spot?.avgRating >= 2 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                                <div className={spot?.avgRating >= 3 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                                <div className={spot?.avgRating >= 4 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                                <div className={spot?.avgRating >= 5 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                            </div>
                            <span>
                                {/* <FaPaw />{' '} */}
                                {
                                    (spot?.avgRating === null || isNaN(spot?.avgRating) || spot?.avgRating === undefined) ? 'New' : spot?.avgRating.toFixed(2)
                                }{' '}
                                {
                                    spot?.avgRating === null || isNaN(spot?.avgRating) || spot?.avgRating === undefined ? '' : '·'
                                }
                                {
                                    spot?.numReviews === 1 ? '1 review' : spot?.numReviews > 1 ? `${spot?.numReviews} reviews` : ''
                                }
                            </span>
                        </div>
                        <br></br>
                        <button
                            onClick={() => alert('Feature Coming Soon...')}
                        >Reserve</button>
                        <br></br>
                    </div>
                </div>
                <div className='down-part-header'>
                    <span className='down-part-inner-container'>
                    <div className='rating-input'>
                                <div className={spot?.avgRating >= 1 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                                <div className={spot?.avgRating >= 2 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                                <div className={spot?.avgRating >= 3 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                                <div className={spot?.avgRating >= 4 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                                <div className={spot?.avgRating >= 5 ? 'filled':'empty'}>
                                    <FaPaw/>
                                </div>
                            </div>
                        <div>
                            {spot?.avgRating === null || isNaN(spot?.avgRating) ||
                                spot?.avgRating === undefined
                                ? "New"
                                : spot?.avgRating.toFixed(2)}{" "}
                            {spot?.avgRating === null || isNaN(spot?.avgRating) ||
                                spot?.avgRating === undefined
                                ? ""
                                : "·"}{" "}
                            {spot?.numReviews === 1
                                ? "1 review"
                                : spot?.numReviews > 1
                                    ? `${spot?.numReviews} reviews`
                                    : ""}

                        </div>
                        <div>
                            {sessionUser && (spot?.Owner.id !== sessionUserId)&& (!reviews?.find(el=>el.userId===sessionUserId))&&(
                                <div>
                                    <OpenModalButton
                                        buttonText={'Post Your Review'}
                                        modalComponent={<PostReviewModal spotId={spotId} />}
                                    />
                                </div>
                            )}
                        </div>
                    </span>
                </div>
                <div className='down-part-reviews-container'>
                    {/* <div className="star-and-reviews-container">
                        <FaStar />
                        {spot?.avgRating} · {spot?.numReviews} reviews
                    </div> */}
                    <div className="reviews-text">
                        {reviews &&
                            reviews.length > 0 &&
                            reviews.map((review, index) => {
                                const createdAtDate = new Date(review?.createdAt);
                                const month = createdAtDate.toLocaleString("default", {
                                    month: "long",
                                });
                                const year = createdAtDate.getFullYear();

                                return (
                                    <>
                                        <div key={index} className='actual-reviews'>
                                            <div className='item' style={{ fontSize: '18px' }}>{review?.User?.firstName}</div>
                                            <div className='item' style={{ fontSize: "14px" }}>{`${month} ${year}`}</div>
                                            <div className='item' style={{ fontSize: "12px" }}>{review?.review}</div>
                                            <div>
                                                {sessionUser && sessionUserId === review?.userId && (
                                                    <div>
                                                        <OpenModalButton
                                                            buttonText={'Delete'}
                                                            modalComponent={<DeleteReviewModal reviewId={review?.id} spotId={spotId} />}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>



                                    </>

                                );
                            })

                        }
                    </div>
                </div>

            </div>
        </div>
    )

}