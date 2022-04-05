import { AllUsersList } from "../components/allUsersList";
import CreateUserGroup from "../components/CreateUserGroup";
import { TakePhoto } from "../components/TakePhoto";
import { Link } from 'react-router-dom';


export function DefaultView() {
    return(
        <div>
            <p>Welcome! Take a picture or register a new user</p> 
            <TakePhoto></TakePhoto>
             <Link to='/createUser'>
              <button>Create a new user</button>
            </Link>
            <CreateUserGroup></CreateUserGroup>
        </div>  
    )
}

