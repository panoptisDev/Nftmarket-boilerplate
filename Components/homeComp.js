import React, {useEffect, useState} from 'react';
import axios from 'axios';

const homecomp = ({uri}) => {

    const [response,setResponse] = useState([]);
    const [image, setImage] = useState("");

    const metadata = async()=>{
        const { data } = await axios.get(
            `https://ipfs.io/ipfs/${uri}`
        );
        setResponse(data);
        setImage(data.image);
        let preuri = image.substr(7,50);  
    }

    useEffect(() => {
        metadata();
      },[uri]);

    let preuri = image.substr(7,50);

    return (
        <div>
             <img
                 src={`https://ipfs.io/ipfs/${preuri}`}
                 alt="" className="h-60 w-full object-fit rounded-lg mb-3" />
            </div>
    )
}

export default homecomp;
