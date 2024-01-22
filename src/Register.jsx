import loginImg from "./assets/login.jpg";
import {
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
// import Swal from "sweetalert2";
import useAuth from "./Firebase/hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const userData = {
            userEmail: email,
            userPass: pass
        }

        createUser(email, pass)
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        icon: "success",
                        title: "User Created Successfully!!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')

                    fetch('https://blog-section-server.vercel.app/user', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                        .then(res => res.json())
                }
            })
            .catch(err => {
                console.log(err.message);
            })



    }

    return (
        <div className="flex gap-8 px-20 items-center justify-center">
            <div>
                <img src={loginImg} alt="" />
            </div>
            <div>
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" className="">
                        Sign Up
                    </Typography>

                    <form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">



                            {/* email field */}
                            <Typography variant="h6" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input name="email"
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" className="-mb-3">
                                Password
                            </Typography>
                            <Input name="password"
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <br />
                        {/* <Input
                            type="submit" value="Sign In" 
                        /> */}
                        <input type="submit" value="Sign In" className="font-medium bg-amber-800 w-full py-2 rounded-lg cursor-pointer block text-center text-white mt-4" />

                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}

                            <a href="/login" className="text-blue-700 font-semibold hover:underline">
                                Sign In
                            </a>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Register;