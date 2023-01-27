import React, { useEffect, useState } from "react";
import axios from "axios";

const Homecomp = ({HomeProps, uri }) => {
  const [response, setResponse] = useState([]);
  const [image, setImage] = useState("");
  const removePrefix = (uri) => {
    return uri.substring(7, uri.length);
  };
  const metadata = async () => {
    try {
      console.log("URI to fetch json", uri);
      const parsedURI = removePrefix(uri);
      const { data } = await axios.get(`https://cloudflare-ipfs.com/ipfs/${parsedURI}`);
      setResponse(data);
      HomeProps(data);
      console.log("Data ipfs:  ",data);
      if (data.image.length > 1) setImage(data.image);
      else setImage(data.thumbnailimage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    metadata();

  }, [uri]);

  let preuri = image;
  console.log("image", image);

  return (
    <div>
      <img
        src={`https://cloudflare-ipfs.com/ipfs/${removePrefix(preuri)}`}
        alt=""
        className=" w-full object-fit rounded-lg mb-3"
      />
      <div className="flex justify-between">
        <div>{response.name}</div>
        <div>{response.description}</div>
      </div>
    </div>
  );
};

export default Homecomp;
