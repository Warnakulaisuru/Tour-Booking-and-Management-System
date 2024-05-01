import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
    const[redirect, setRedirect]=useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    async function logout() {
        try {
            await axios.post('/logout');
            setUser(null); 
            navigate('/login'); 
            setRedirect('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    // if (!ready) {
    //     return 'Loading...';
    // }

    if (ready && !user && !redirect) {
        // Redirect to login if user is not logged in
        return <Navigate to={"/login"} />;
    }

    function linkclasses(type = null) {
        let classes = "py-2 px-6";
        if (type === subpage) {
            classes += " bg-primary text-black rounded-full";
        }
        return classes;
    }

    if(redirect) {
      return <navigate to={redirect} />
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkclasses("profile")} to={"/account"}>
                    My Profile
                </Link>
                <Link className={linkclasses("bookings")} to={"/account/bookings"}>
                    My Booking
                </Link>
                <Link className={linkclasses("places")} to={"/account/places"}>
                    My Accommodation
                </Link>
            </nav>
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    );
}
