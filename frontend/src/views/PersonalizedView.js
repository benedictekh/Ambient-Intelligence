import { User } from "../components/User";
import { useLocation } from "react-router-dom";

export function PersonalizedView() {
    const location = useLocation()

    return(
        <div>
            <User name={location.state}></User>
        </div>
    )
}