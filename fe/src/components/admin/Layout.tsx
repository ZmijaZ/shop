import { Link } from "react-router-dom";



const Layout = () => {
    return (
        <>
            <Link to = '/admin'>Dashboard </Link>
            <Link to = '/admin/products'>Products </Link>
            <Link to = '/admin/users'>Customer </Link>
            <Link to = '/admin/orders'>Orders </Link>
        </>


    )
};

export default Layout;