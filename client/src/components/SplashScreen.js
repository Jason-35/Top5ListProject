import { Link } from 'react-router-dom'



export default function SplashScreen() {
    return (
        <div id="splash-screen">
            Welcome to Top 5 Lister<br />
            Anything and Everything from Movies to Games<br />
            Come and Rank <br /> Your Genre! <br />
                <div id="service-btn">
                    Don't Have an Account? Register Now!<button><Link to='/register/'>Create New Account</Link></button><br />
                    Already Have an Account? Login!<button><Link to='/login/'>Login</Link></button><br />
                    Have a Trial Run<button>Guest</button><br />
                </div>
                <div id="info">Safe and Secured <br /> Implementation using MongoDB and React</div>
        </div>
    )
}