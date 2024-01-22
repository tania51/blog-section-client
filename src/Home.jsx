import { Button } from "@material-tailwind/react";
import useAuth from "./Firebase/hooks/useAuth";
import { Link } from "react-router-dom";


const Home = () => {
    const {user, logOut} = useAuth();

    const logoutHandeler = () => {
        logOut();
      }

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div>
                {
                    user ? <div><Link to="/blog"><Button className="mr-5">Blog Page</Button></Link><Button onClick={logoutHandeler}>Log Out</Button></div> : <Link to="/login"><Button>LogIn</Button></Link>
                }
                
            </div>
        </div>
    );
};

export default Home;