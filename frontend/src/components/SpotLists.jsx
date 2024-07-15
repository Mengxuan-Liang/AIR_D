import { Link } from "react-router-dom";
import './SpotLists.css'
// import SpotDetails from "./SpotDetails";
// import {useDispatch, useSelector} from 'react-redux'
// import { useEffect } from "react";
// import { getAllSpots } from "../store/spotsReducer";


export default function SpotLists({data}) {


    const {city, state, price, id, previewImage, name} = data
    // console.log('this is the Owner from SpotLists.jsx', Owner)
    // const navigate = useNavigate()
    return (
    <div >
        <div className="spot-container">
            <Link to={`/spots/${id}` } style={{textDecoration:'none'}} >
            <div className="spot-img" title={name}>
                <img
                    src={previewImage}
                    alt="spot-image"
                    className="spot-image"
                    style={{
                        // height: '200px',
                        // weight: '200px'
                    }}
                    // onClick={()=> {
                    //     <SpotDetails data={data}/>
                    //     navigate(`/spotdetails/${id}`)
                    // }}
                />
                <br></br>
                <span >{city}, </span>
                <span>{state}</span>
                <br></br>
                <div>${price} night</div>
            </div>
            </Link>
        </div>
    </div>
    )
}
