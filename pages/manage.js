import Layout from "../Components/Layout";
import { selectUser } from "../slices/userSlice";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StoreFront from "../artifacts/contracts/StoreFront.sol/StoreFront.json";
import etherContract from "../utils/web3Modal";
import { request, gql } from "graphql-request";
import Loader from "../Components/Loader";
const storeFrontAddress = process.env.NEXT_PUBLIC_STOREFRONT_ADDRESS;
const graphqlAPI = process.env.NEXT_PUBLIC_STOREFRONT_API;
export default function Manage() {
  const [loading, setLoading] = useState(true);
  const [rolGranted, setRoleGranteds] = useState([]);
  const [role, setRole] = useState([]);

  const walletAddr = useSelector(selectUser);
  var wallet = walletAddr ? walletAddr[0] : "";
  const [userData, setUserData] = useState({contract:null, creatorRoleId:null})
  const revokeRole=async(wallet)=>{
     const roleRevoked = await userData.contract.revokeRole(userData.creatorRoleId, wallet)
     console.log("revolerole",roleRevoked)
    setRoleGranteds(null)
  }
  const initRole=async()=>{
    const contract = await etherContract(storeFrontAddress,StoreFront.abi)
    const creatorRoleId =  await contract.STOREFRONT_CREATOR_ROLE()
    const hasCreatorRole = await contract.hasRole(creatorRoleId, wallet)
    setRoleGranteds(hasCreatorRole ? wallet : null)
    setUserData({contract, creatorRoleId})
  }
  useEffect(() => {
     initRole()
  }, [])
  
  const fetchCreator = async () => {
    const query = gql`
      query Query($where: RoleGranted_filter) {
        roleGranteds(first:100) {
          role
          account
          id
          sender
          blockNumber
          transactionHash
          blockTimestamp
        }
      }
    `;
    const result = await request(graphqlAPI, query);
    setLoading(true);
    setRole(result.roleGranteds);
    setLoading(false);
  };
  useEffect(() => {
    if (!localStorage.getItem("platform_wallet") && wallet !== undefined) {
      localStorage.setItem("platform_wallet", wallet);
    } else {
    }
    fetchCreator(`${localStorage.getItem("platform_wallet")}`);
  }, []);

  return (
    <Layout title="Manage" description="This is used to Manage creator info">
     
    {rolGranted &&  <div className="body-back">
              <div  className=" mt-10">
                <div
                  className="flex justify-between p-2.5 border-y-2"
                >
                  <table className="text-gray-500 dark:text-white">
                <tr className="margin-table">
                <th>Creator</th>
                <th>Time</th>
                <th>Action</th>

                 </tr>

              {role?.length > 0 ? (
               role.map((item) => {
              const date = new Date(parseInt(item.blockTimestamp+'000')).toDateString() 
                return (

                  <tr className="margin-table" key={item.id}>

                    <td className="margin-table">{item.account}</td>
                    <td className="margin-table">{date ?? "--"}</td>
                    <td className="flex"> 
                      <FaMinusSquare onClick={()=>revokeRole(item.account)} className="text-red-600 ml-5 cursor-pointer" />
                    </td>

                  </tr>
                );
              })
            ) : loading ? (
              <Loader />
            ) : (
              <div className="text-2xl pb-10 text-center font-bold">
                You Haven&apos;t Any Role.
              </div>
            )}
            </table>
                 
                </div>
             
              </div>
      </div>
}
    </Layout>
  );
}
