import { useContext, useState } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import UserScreen from './UserScreen'
import CommunityScreen from './CommunityScreen'
import AllListScreen from './AllListScreen'
import TextField from '@mui/material/TextField';
export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const [screen, setScreen] = useState(0);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
   
    let test = 0
    function Home(){
        console.log("HOME SCREEN")
        setScreen(0)
    }

    function User(){
        console.log("User")
        setScreen(1)
    }

    function Community(){
        console.log("Community")
        setScreen(3)
    }

    function AllList(){
        console.log("all list")
        setScreen(2)
    }



    let ShowScreen = <HomeScreen />
    let ScreenButtons = <div>
    <button onClick={Home}>Home</button>
    <button onClick={AllList}>All List</button>
    <button onClick={User}>User List</button>
    <button onClick={Community}>Community</button>
    </div>
    
    let ScreenSwitch = 0

    if(screen === 0){
        ShowScreen = <HomeScreen />
    }else if(screen === 1){
        ShowScreen = <UserScreen />
    }else if(screen === 2){
        ShowScreen = <AllListScreen />
    }else if(screen === 3){
        ShowScreen = <CommunityScreen />
    }
    
    
    if (auth.loggedIn)
        return <div>
            {ScreenButtons}
            {ShowScreen}
        </div>
    else
        return <SplashScreen />
}