import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(){
    return(
        <dev className="p-4 flex flex-col min-h-screen">
            <Header/>
            <Outlet/>
        </dev>
    );
}