import { useEffect, useState } from "react";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import HomeComp from "../Components/homeComp";
import HomeComp2 from "../Components/homecomp2";
import { FaEthereum } from "react-icons/fa";
import { request, gql } from "graphql-request";
import { ethers } from "ethers";
import Loader from "../Components/Loader";
import { buyNFT } from "../pages/api/buyNFT";
import BuyAsset from "./buyAssetModal";

const graphqlAPI = process.env.NEXT_PUBLIC_MARKETPLACE_API;

function NftboughtDashboard() {
  function getEthPrice(price) {
    return ethers.utils.formatEther(price);
  }
  const walletAddr = useSelector(selectUser);
  var wallet = walletAddr ? walletAddr[0] : "";

  const [data, setData] = useState([]);
  const [auction, setAuction] = useState([]);

  const [loading, setLoading] = useState(true);
  const [model, setmodel] = useState(false);
  const [modelmsg, setmodelmsg] = useState("buying in progress!");

  const fetchUserAssests = async (walletAddr) => {
    const query = gql`
    query Query($where: ItemSold_filter) {
      itemSolds(first: 100, where: {buyer: "${walletAddr}"}) {
        itemId
        tokenId
        nftContract
        metadataURI
        seller
        buyer   
        blockTimestamp
        price
            }
          }
          `;
    const result = await request(graphqlAPI, query);
    setLoading(true);
    setData(result.itemSolds);
    setLoading(false);
  };

  const fetchAuction = async (walletAddr) => {
    const query = gql`
    query Query($where: AuctionEnded_filter) {
      auctionEndeds(first: 100, where: {highestBidder: "${walletAddr}"}) {
        id
        tokenId
        nftContract
        metadataURI
        highestBidder   
        blockTimestamp
            }
          }
          `;
    const result = await request(graphqlAPI, query);
    setLoading(true);
    setData(result.auctionEndeds);
    setLoading(false);
  };


  async function buyNft(nft) {
    setmodelmsg("Buying in Progress");
    await buyNFT(nft, setmodel, setmodelmsg);
    loadNFTs();
  }

  useEffect(() => {
    if (!localStorage.getItem("platform_wallet") && wallet !== undefined) {
      localStorage.setItem("platform_wallet", wallet);
    } else {
    }
    fetchUserAssests(`${localStorage.getItem("platform_wallet")}`);
    fetchAuction(`${localStorage.getItem("platform_wallet")}`);

  }, []);

  return (
    
    <div className="min-h-screen gradient-blue">
       {model && <BuyAsset open={model} setOpen={setmodel} message={modelmsg} />}
      <div className=" p-4 mt-10 h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <div style={{border:"2px solid",padding:'10px'}}
                key={item.itemId}
                className="bg-white dark:bg-gray-900  rounded-lg shadow-lg w-full lg:w-72 hover:scale-105 duration-200 transform transition cursor-pointer border-2 dark:border-gray-800"
              >
                <Link key={item.itemId} href={`/assets/${item.itemId}`}>
                  <div>
                    <HomeComp uri={item ? item.metaDataURI : ""} />
                   
                    <div className=" flex items-center justify-between mb-2">
                      <p className="font-1 text-sm font-bold mt-3">Price : </p>
                      <div className="flex items-center">
                        <FaEthereum className="h-4 w-4 text-blue-400" />
                        <p className="font-extralight dark:text-gray-400">
                          {getEthPrice(item.price)} MATIC
                        </p>
                      </div>
                    </div>
                    <div>
                  <div className="font-bold mt-3">Wallet Address :</div>
                  <div style={{fontSize:"12px"}}>{item.owner}</div>
                </div>
                  </div>
                </Link>

                <div className="px-4 py-4 bg-white  flex justify-center mt-5">
                  <button
                    onClick={() => buyNFT(item)}
                    className="text-blue-500 hover:text-blue-400 font-bold"
                  >
                    Sell now
                  </button>
                </div>
              </div>
            );
          })
        ) : loading ? (
          <Loader />
        ) : (
          <div className="text-2xl pb-10 font-bold text-center">You haven&apos;t buy any asset.</div>
        )}
      </div>
      <div className=" p-4 mt-10 h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {auction.length > 0 ? (
          auction.map((item) => {
            return (
              <div style={{border:"2px solid",padding:'10px'}}
                key={item.id}
                className="bg-white dark:bg-gray-900  rounded-lg shadow-lg w-full lg:w-72 hover:scale-105 duration-200 transform transition cursor-pointer border-2 dark:border-gray-800"
              >
                <Link key={item.itemId} href={`/assets/${item.id}`}>
                  <div>
                    <HomeComp uri={item ? item.metaDataURI : ""} />
                   
                    
                    <div>
                  <div className="font-bold mt-3">Wallet Address :</div>
                  <div style={{fontSize:"12px"}}>{item.highestBidder}</div>
                </div>
                  </div>
                </Link>

                <div className="px-4 py-4 bg-white  flex justify-center mt-5">
                  <button
                    onClick={() => buyNFT(item)}
                    className="text-blue-500 hover:text-blue-400 font-bold"
                  >
                    Sell now
                  </button>
                </div>
              </div>
            );
          })
        ) : loading ? (
          <Loader />
        ) : (
          <div className="text-2xl pb-10 font-bold text-center">You haven&apos;t buy any asset.</div>
        )}
      </div>
    </div>
  );
}

export default NftboughtDashboard;
