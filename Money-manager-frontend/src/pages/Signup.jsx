import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/Validation";
import axiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        //basic validations
        if (!fullName.trim()) {
            setErrorMsg("Please enter your full name");
            setLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            setErrorMsg("Please enter valid email address");
            setLoading(false);
            return;
        }
        if (!password.trim()) {
            setErrorMsg("Please enter your password");
            setLoading(false);
            return;
        }
        setErrorMsg("");
        // signup api call
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password
            });
            if (response.status === 201) {
                toast.success("Profile created successfully.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Something went wrong", error);
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let timer;
        if (errorMsg) {
            timer = setTimeout(() => {
                setErrorMsg("");
            }, 2000);
        }

        return () => clearTimeout(timer);
    }, [errorMsg]);

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* backgroung image with blur */}
            <img
                src={assets.login_bg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover blur-sm filter"
            />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create An Account
                    </h3>

                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spendings by joining with us.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 ">
                        <div className="flex justify-center mb-6">
                            {/* Profile image */}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Full Name"
                                placeHolder="John Doe"
                                type="text"
                            />

                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeHolder="john@doe.com"
                                type="email"
                            />

                            <div className="col-span-2">
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    placeHolder="********"
                                    type="password"
                                />
                            </div>
                        </div>

                        {
                            errorMsg && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                    {errorMsg}
                                </p>
                            )
                        }

                        <button disabled={loading} className={`btn-primary w-full py-2 text-lg font-medium flex items-center justify-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {
                                loading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Signing Up...
                                    </>
                                ) : (
                                    "Sign up"
                                )
                            }
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?
                            <Link to={"/login"} className="font-medium text-primary underline hover:text-primary-dark transition-colors">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup