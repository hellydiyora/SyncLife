import React from 'react';
import {Link} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import {  selectUser } from "../../reducers/authSlice";
import {  useSelector } from "react-redux";




const Navbar = () => {
  
const user = useSelector(selectUser);

    return(
        <div>
        <ul className="grid grid-cols-8 p-4  items-center text-right text-2xl text-white font-medium backCustom font-subTag ">
          <Link  to="/home" className="text-left col-span-2 "><span className="font-serif text-4xl text-orange-200 hover:text-orange-300 transition duration-300 ease-in-out">☮</span></Link>
          <Link  to="/journal" > <span className=" hover:text-orange-200 transition duration-300 ease-in-out">TaskMate</span></Link>
          <Link  to="/habits" ><span className="hover:text-orange-200 transition duration-300 ease-in-out">GoalMinder</span></Link>
          <Link  to="/gratitude"><span className="hover:text-orange-200 transition duration-300 ease-in-out">GratiMemo</span></Link>
          <Link  to="/mood" ><span className="hover:text-orange-200 transition duration-300 ease-in-out">EmoSense</span></Link>
          <Link to="/user" className="col-span-2">
          {user && user.firstName && (
            <div className="flex justify-end items-center gap-2">
              <span className="hover:text-orange-200 transition duration-300 ease-in-out font-mainTag">It's {user.firstName} </span>
              <PersonIcon className="hover:text-orange-200 transition duration-300 ease-in-out" />
            </div>
          )}
          </Link>
         
        </ul>
        </div>
    );
}

export default Navbar;