import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Header, Footer } from "./components";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
    // loading will be shown when the data has not received by the client yet
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                // if the user exists then we dispatch that data to store
                // and log the user in
                // if there is no user exists, means no login session is present
                // then it will be considered as logout state
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, []);

    // console.log(import.meta.env.VITE_APPWRITE_URL)
    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    TODO: <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : (
        <div className="text-center">Loading.....</div>
    );
}

export default App;
