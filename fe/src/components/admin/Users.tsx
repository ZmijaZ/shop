import { useQuery } from "@apollo/client";
import { ALL_USERS } from "../../graphQl/queries";

const Users = () => {

    const userResult = useQuery(ALL_USERS);

    if(userResult.loading){
        return <div>loading...</div>
    }
    console.log(userResult.data.allUsers);
    
    return (
        <>
            <h1>Users</h1>
        </>
    );
};

export default Users;