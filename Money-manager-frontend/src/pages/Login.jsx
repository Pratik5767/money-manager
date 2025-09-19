import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/Validation";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";
import axiosConfig from "../util/AxiosConfig";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // basic validation
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
        // login api call
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                toast.success("logged In successfully.");
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                console.error("Something went wrong", error);
                setErrorMsg(error.message);
            }
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
                        Welcome Back
                    </h3>

                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to login
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeHolder="john@doe.com"
                            type="email"
                        />

                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeHolder="********"
                            type="password"
                        />

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
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )
                            }
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account?
                            <Link to={"/signup"} className="font-medium text-primary underline hover:text-primary-dark transition-colors">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;