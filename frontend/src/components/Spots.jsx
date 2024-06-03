import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../store/spotsReducer';
import SpotLists from './SpotLists';
import  './SpotLists.css';
function Spots() {
    const navigate = useNavigate();
    const data = useSelector(state => state.spotsState.spots);
    console.log(data)
    const dataArr = Object.values(data);
    console.log(dataArr)
    // const dataArr = Object.va
    // const dataArr = data.spots.Spots;
    // console.log(data.spots.Spots)

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getAllSpots())
    },[])

    return (
        <>
        {/* <div>
            <nav className='navbar-links-container'>
                <div className='navbar-subcontainer'>
                    <img
                        style={{
                            height: '80px'
                        }}
                        className='navbar-logo'
                        src='./src/images/IMG_0228.JPG'
                        alt='dog-logo-image'
                        onClick={()=> {
                            navigate('/')
                        }}
                    />
                    <h2 className='navbar-title'>BarkBnB</h2>
                </div>
            </nav>
        </div> */}

    <div>

        <div className='spots-container'>
            {
                dataArr.map(spot => (
                    <SpotLists data = {spot} key={spot.id} className='single-spot'/>
                ))
            }
        </div>
    </div>
        </>
    )
}

export default Spots