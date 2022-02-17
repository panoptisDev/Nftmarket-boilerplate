import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsFilter } from "react-icons/bs"
import { RiArrowDropDownLine } from "react-icons/ri"
import { MdOutlineColorLens } from "react-icons/md"
import { GiCardRandom } from "react-icons/gi"
import { GiWallet } from "react-icons/gi"
import { MdSportsVolleyball } from "react-icons/md"
import { MdMusicNote } from "react-icons/md"

function Filter({ toogle, filter }) {

    const [opendrop, Setopendrop] = useState(false);
    const [status, Setstatus] = useState(false);

    return (
        <div className={!filter ? "fixed top-10 w-full  z-40 md:w-2/6 h-full  dark:bg-gray-900 bg-white filter right-0 overflow-y-auto" : "hidden"}>
            <div className=" flex p-2 px-4 justify-between items-center border-b-2">
                <div className="flex space-x-2 items-center">
                    <p className="font-semibold text-lg">Filter</p>
                    <BsFilter className="h-8 w-8" />
                </div>

                <AiOutlineClose onClick={toogle} className="h-6 w-6" />

            </div>
            <div
                onClick={() => Setopendrop(!opendrop)}
                className="flex items-center cursor-pointer justify-between border-b-2 shadow-sm p-2 px-4 group">
                <p className="font-semibold text-lg">Category</p>
                <RiArrowDropDownLine className="h-8 w-8 text-gray-400 group-hover:text-black" />
            </div>
            {opendrop && <div className="">

                <div className="flex items-center p-2  px-8 space-x-2 group hover:bg-blue-100 cursor-pointer">
                    <MdOutlineColorLens className="h-8 w-8 text-blue-400" />
                    <p className="text-md  text-gray-500 font-bold group-hover:text-black">Art</p>
                </div>

                <div className="flex items-center p-2  px-8 space-x-2 group hover:bg-blue-100 cursor-pointer">
                    <MdMusicNote className="h-8 w-8 text-blue-400" />
                    <p className="text-md  text-gray-500 font-bold group-hover:text-black">Music</p>
                </div>

                <div className="flex items-center p-2  px-8 space-x-2 group hover:bg-blue-100 cursor-pointer">
                    <MdSportsVolleyball className="h-8 w-8 text-blue-400" />
                    <p className="text-md  text-gray-500 font-bold group-hover:text-black">Sports</p>
                </div>

                <div className="flex items-center p-2  px-8 space-x-2 group hover:bg-blue-100 cursor-pointer">
                    <GiWallet className="h-8 w-8 text-blue-400" />
                    <p className="text-md  text-gray-500 font-bold group-hover:text-black">Utility</p>
                </div>
                <div className="flex items-center p-2  px-8 space-x-2 group hover:bg-blue-100 cursor-pointer">
                    <GiCardRandom className="h-8 w-8 text-blue-400" />
                    <p className="text-md  text-gray-500 font-bold group-hover:text-black">Trading Cards</p>
                </div>
            </div>}

            <div
                onClick={() => Setstatus(!status)}
                className="flex items-center cursor-pointer justify-between border-b-2 shadow-sm p-2 px-4 group border-t-2">
                <p className="font-semibold text-lg">Status</p>
                <RiArrowDropDownLine className="h-8 w-8 text-gray-400 group-hover:text-black" />
            </div>

            {status && <div className=" grid grid-cols-2 p-2 px-8">

                <p className="p-4 font-semibold text-md text-gray-500 hover:text-black cursor-pointer bg-gray-100  hover:bg-blue-100 rounded-md mt-2 ml-2">New</p>
                <p className="p-4 font-semibold text-md text-gray-500 hover:text-black cursor-pointer bg-gray-100 hover:bg-blue-100  rounded-md mt-2 ml-2">Best Seller</p>
                <p className="p-4 font-semibold text-md text-gray-500 hover:text-black cursor-pointer bg-gray-100 hover:bg-blue-100  rounded-md mt-2 ml-2">Trending</p>
                <p className="p-4 font-semibold text-md text-gray-500 hover:text-black cursor-pointer bg-gray-100  hover:bg-blue-100 rounded-md mt-2 ml-2"> Offers</p>

            </div>}





        </div>


    )
}

export default Filter
