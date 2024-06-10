import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../store/spotsReducer';
import SpotLists from './SpotLists';
// import { NavLink } from 'react-router-dom';
import OpenModalButton from './OpenModalButton/OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
// import CreateSpotForm from './CreateSpotForm';
export default function CurrentSpots() {
    const navigate = useNavigate();
    const data = useSelector(state => state.spotsState.allSpots);
    const currentUser = useSelector(state => state.session.user);
 
    const dataArr = Object.values(data);
    const currentUserSpots = dataArr.filter(el => el.ownerId === currentUser.id);
    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <>
            <h2>Manage your spots</h2>
            <button
                onClick={() => {
                    navigate('/spots/new')
                }}
            >Create a new spot</button>
            <div>

                <div className='spots-container'>
                    <div>

                        {
                            currentUserSpots.map(spot => (
                                <>
                                    <SpotLists data={spot} key={spot.id} className='single-spot' />
                                    <button
                                        onClick={()=> {
                                            navigate(`/spots/${spot.id}/edit`)
                                        }}
                                    >Update</button>
                                    <div>
                                        <OpenModalButton
                                            buttonText={'Delete'}
                                            modalComponent={<DeleteSpotModal spot={spot} />}
                                        />
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}