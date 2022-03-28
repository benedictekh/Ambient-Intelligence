import { User } from "../components/User";
import { useLocation } from "react-router-dom";

export function PersonalizedView() {
    const location = useLocation()
    const { name } = location.state

    return(
        <div>
            <User name={name}></User>
        </div>
    )
}