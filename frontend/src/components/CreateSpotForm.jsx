import { useEffect, useState } from "react";
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  createNewSpot } from "../store/spotsReducer";



function CreateSpotForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [isLoaded, setIsLoaded] = useState(false);

    // STATES for user input
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [imageUrl4, setImageUrl4] = useState("");
    // STATES for error and submition
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [error, setError] = useState({});

    // useEFFECT to validate the form
    useEffect(() => {
        const validate = () => {
            const error = {};

            if (!country) error.country = 'Country is required'
            if (!address) error.address = 'Address is required'
            if (!city) error.city = 'City is required'
            if (!state) error.state = 'State is required'
            if (!name) error.name = 'Name is required'
            if (!description || description.length < 30) error.description = 'Description needs a minimum of 30 characters'
            if (!price || price <= 0) error.price = 'Price per day is required and shoud be a positive number'
            const checkImageUrl = url => {
                return (url && (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')));
            }
            if (!previewImage || !checkImageUrl(previewImage)) error.previewImage = 'Preview image is required'
            if (imageUrl1 && !checkImageUrl(imageUrl1)) error.imageUrl1 = 'Image URL must end in .png, .jpg, or .jpeg'
            if (imageUrl2 && !checkImageUrl(imageUrl2)) error.imageUrl2 = 'Image URL must end in .png, .jpg, or .jpeg'
            if (imageUrl3 && !checkImageUrl(imageUrl3)) error.imageUrl3 = 'Image URL must end in .png, .jpg, or .jpeg'
            if (imageUrl4 && !checkImageUrl(imageUrl4)) error.imageUrl4 = 'Image URL must end in .png, .jpg, or .jpeg'

            return error;
        };
        // UPDATE the error state
        if(hasSubmitted) {
            const errors = validate();
            setError(errors)
        }
    }, [dispatch, country, address, city, state, name, description, price, previewImage, imageUrl1, imageUrl2, imageUrl3, imageUrl4, hasSubmitted]);

    // SUBMITION
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsLoaded(true)

        // CAUSE RE-RENDER
        setHasSubmitted(true);

        // IF NO ERROR
        if (Object.keys(error).length === 0) {
            const newSpot = {
                address,
                city,
                state,
                country,
                name,
                price,
                description,
                lat,
                lng,
            };

            const response = await dispatch(createNewSpot(newSpot, previewImage, [imageUrl1, imageUrl2, imageUrl3, imageUrl4]));

            if(response && response.id) navigate(`/spots/${response.id}`);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Create a New Spot</h2>
                    <h3>Where is your place located?</h3>
                    <h5>Guests will only get your exact address once they booked a reservation.</h5>
                    <label>
                        Country:
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <div className="error" >
                            {error.country && <p>{error.country}</p>}
                        </div>
                    </label>

                    <label>
                        Street Address:
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <div className="error" >
                            {error.address && <p>{error.address}</p>}
                        </div>
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <div className="error" >
                            {error.city && <p>{error.city}</p>}
                        </div>
                    </label>
                    <label>
                        State:
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                        <div className="error" >
                            {error.state && <p>{error.state}</p>}
                        </div>
                    </label>
                    <label>
                        Latitude:
                        <input
                            type="number"
                            placeholder="Latitude"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                        <div className="error" >
                            {error.lat && <p>{error.lat}</p>}
                        </div>
                    </label>
                    <br></br>
                    <label>
                        Longitude:
                        <input
                            type="number"
                            placeholder="Longitude"
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                        />
                        <div className="error" >
                            {error.lng && <p>{error.lng}</p>}
                        </div>
                    </label>
                    <hr></hr>
                    <h3>Describe your place to guests</h3>
                    <h5>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h5>
                    <label>
                        <textarea
                            type="text"
                            placeholder="Please write at least 30 characters"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        >
                        </textarea>
                        <div className="error" >
                            {error.description && <p>{error.description}</p>}
                        </div>
                    </label>
                    <hr></hr>
                    <h3>Create a title for your spot</h3>
                    <h5>Catch guests attention with a spot title that hightlights what makes your place special</h5>
                    <label>
                        <input
                            placeholder="Name of your spot"
                            value={name}
                            type="text"
                            onChange={e => setName(e.target.value)}
                        >
                        </input>
                        <div className="error" >
                            {error.name && <p>{error.name}</p>}
                        </div>
                    </label>
                    <hr></hr>
                    <h3>Set a base price for your spot</h3>
                    <h5>Competitive pricing can help your listing stand out and rank higher in search results</h5>
                    ${' '}<label>
                        <input
                            placeholder="Price"
                            value={price}
                            type="text"
                            onChange={e => setPrice(e.target.value)}
                        >
                        </input>
                        <div className="error" >
                            {error.price && <p>{error.price}</p>}
                        </div>
                    </label>
                    <hr></hr>
                    <h3>Liven up your spot with phots</h3>
                    <h5>Submit a link to at least one photo to publish your spot</h5>
                    <label>
                        <input
                            placeholder="Preview Image URL"
                            value={previewImage}
                            type="text"
                            onChange={e => setPreviewImage(e.target.value)}
                        >
                        </input>
                        <div className="error" >
                            {error.previewImage && <p>{error.previewImage}</p>}
                        </div>
                    </label>
                    <label>
                        <input
                            placeholder="Image URL"
                            value={imageUrl1}
                            type="text"
                            onChange={e => setImageUrl1(e.target.value)}
                        >
                        </input>
                        <div className="error" >
                            {error.imageUrl1 && <p>{error.imageUrl1}</p>}
                        </div>
                    </label>
                    <label>
                        <input
                            placeholder="Image URL"
                            value={imageUrl2}
                            type="text"
                            onChange={e => setImageUrl2(e.target.value)}
                        >
                        </input>
                        <div className="error" >
                            {error.imageUrl2 && <p>{error.imageUrl2}</p>}
                        </div>
                    </label>
                    <label>
                        <input
                            placeholder="Image URL"
                            value={imageUrl3}
                            type="text"
                            onChange={e => setImageUrl3(e.target.value)}
                        >
                        </input>
                        <div className="error" >
                            {error.imageUrl3 && <p>{error.imageUrl3}</p>}
                        </div>
                    </label>
                    <label>
                        <input
                            placeholder="Image URL"
                            value={imageUrl4}
                            type="text"
                            onChange={e => setImageUrl4(e.target.value)}
                        >
                        </input>
                        <div className="error" >
                            {error.imageUrl4 && <p>{error.imageUrl4}</p>}
                        </div>
                    </label>
                    <br></br>
                    <button
                        type="submit"
                    >Create Spot
                    </button>
                    {' '}
                    <button
                        className='demo-user-modal-button'
                        type="submit"
                        onClick={() => {
                            setAddress("1 Elm Street");
                            setCity("Boston");
                            setState('MA');
                            setCountry('US')
                            setName('HEY PAW')
                            setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
                            setPrice(1);
                            setLat(1)
                            setLng(1)
                            setPreviewImage('https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611476/9f278c86-83a6-4885-af7e-51174330b4d6_oyucez.jpg')
                            setImageUrl1('https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611480/openart-image_LBoOQhNz_1721610485086_raw_ooy1w7.jpg')
                            setImageUrl2('https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611479/76009f03-c6ca-4f67-b5b4-a931a842c359_tjetup.jpg')
                            setImageUrl3('https://res.cloudinary.com/dhukvbcqm/image/upload/v1717368587/dog_house_by_ai_visions_dgmjcu1-pre_uyxfv8.jpg')
                            setImageUrl4('https://res.cloudinary.com/dhukvbcqm/image/upload/v1721611475/42c4fb6a-36ae-4ad2-9825-9d41a2e41d17_dlsf1b.jpg')
                        }}
                    >
                        {" "}
                        Demo Spots
                    </button>
                </div>
            </form>
        </>
    )
}



export default CreateSpotForm;
