import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../store/spotsReducer';
import SpotLists from './SpotLists';
import  './SpotLists.css';
function Landing() {
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
          <div className='landing-container'>
        <h1 className='landing-title'>BarkBnB</h1>
        <img
          style={{
            height:'500px'
          }}
          src='../dist/assets/IMG_0228.JPG'
          alt='mydog-image'
        />
       <button onClick={()=>  navigate('/spots')}>View All Spots</button>
       </div>

        </>
    )
}

export default Landing