import { Link } from "react-router-dom";
import './SpotLists.css'
export default function SpotLists({data}) {
    const {city, state, price, id, previewImage} = data
    
    return (
    <div >
        <div className="spot-container">
            <div className="spot-img">
                <img
                    src={previewImage}
                    alt="spot-image"
                    className="spot-image"
                    style={{
                        height: '150px'
                    }}
                />
                <br></br>
                <span>{city}, </span>
                <span>{state}</span>
                <br></br>
                <div>$:{price} night</div>
            </div>
        </div>
    </div>
    )
}