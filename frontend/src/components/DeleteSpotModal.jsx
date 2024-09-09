import { useModal } from "../context/Modal";
import {useDispatch} from 'react-redux';
import { getAllSpots, removeSpot } from "../store/spotsReducer";
// import { useModal } from "../../context/Modal"
import './LoginFormModal/LoginForm.css'


export default function DeleteSpotModal({spot}){
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const handleDelete = async (e) =>{
        e.preventDefault();
        await dispatch(removeSpot(spot.id));
        await dispatch(getAllSpots());
        await closeModal()
    }

    return (
        <div className="log-sign-form-container">
            <h2>Comfirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <div>
                <button onClick={handleDelete}>Yes(Delete spot)</button>
                <button onClick={()=>closeModal()}>No(Keep spot)</button>
            </div>
        </div>
    )



}
