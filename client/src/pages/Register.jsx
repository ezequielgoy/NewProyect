import axios from "axios";
import { useRef} from "react";
import { Link } from "react-router-dom"
import {useNavigate} from "react-router-dom";

function LogIn() {
    const username = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match")
        }else{
            const user = {
                username: username.current.value,
                password: password.current.value
            }
            try{
                await axios.post("/auth/register", user);
                navigate("/");
            }catch(err){
                console.log(err);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="login-form">
                    <h1>Sign Up</h1>
                    <div className="username-div">
                        <input placeholder="Username" required ref={username}/>
                    </div>
                    <div className="password-div">
                        <input placeHolder="Password" required ref={password} minLength="4" type="password"/>
                    </div>
                    <div className="password-div">
                        <input placeHolder="Password Again" required ref={passwordAgain} minLength="4" type="password"/>
                    </div>
                    <button type="submit" value="SignUp" className="signup-btn">Sign Up</button>
                    <Link to="/">
                    <button type="button"  className="backToLogIn-btn">Back to log in</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LogIn
