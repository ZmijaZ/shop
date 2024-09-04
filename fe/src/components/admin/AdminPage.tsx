import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Users from "./Users";
import Orders from "./Orders";

const AdminPage = () => {
    return(
        <>
            <Layout/>

            <Routes>
                <Route path = '/admin' element = {<Dashboard/>} />
                <Route path = '/admin/products' element = {<Products/>}/>
                <Route path = '/admin/users' element = {<Users/>}/>
                <Route path = '/admin/orders' element = {<Orders/>}/>
            </Routes>
        </>
    )
};

export default AdminPage;