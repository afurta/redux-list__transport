import React from 'react';
import './ContentBlock.css'
import UserTable from "./UserTable/UserTable";
import { Route,Routes } from "react-router-dom";
import AdminTable from "./AdminTable/AdminTable";


const ContentBlock:React.FC = () => {

    return (
        <div className='ContentBlock'>
            <div className="container">
               <>
                   <Routes>
                       <Route path={'/'} element={ <UserTable/>} />
                       <Route path={'/admin'} element={ <AdminTable  />} />
                   </Routes>
               </>
            </div>
        </div>
    );
};

export default ContentBlock;