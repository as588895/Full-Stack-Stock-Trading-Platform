import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get("https://full-stack-stock-trading-platform-c4js.onrender.com/api/auth/me", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        .then((res) => {

            setUser(res.data.user);

        })
        .catch((err) => {

            console.log(err);

        });

    }, []);

    return (

        <div className="container mt-5">

            <h2>Dashboard</h2>

            {
                user ? (

                    <>
                        <h3>Welcome {user.username}</h3>

                        <p>Email : {user.email}</p>

                        <p>User ID : {user._id}</p>
                    </>

                ) : (

                    <h3>Loading...</h3>

                )
            }

        </div>

    );
}

export default Dashboard;