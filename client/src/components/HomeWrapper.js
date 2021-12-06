import { useContext, useState } from "react";
import HomeScreen from "./HomeScreen";
import SplashScreen from "./SplashScreen";
import AuthContext from "../auth";
import UserScreen from "./UserScreen";
import CommunityScreen from "./CommunityScreen";
import AllListScreen from "./AllListScreen";
import TextField from "@mui/material/TextField";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import FunctionsIcon from "@mui/icons-material/Functions";
import SortIcon from "@mui/icons-material/Sort";
import { GlobalStoreContext } from "../store";
import OwnerScreen from "./OwnerScreen";
export default function HomeWrapper() {
  const { auth } = useContext(AuthContext);
  const [screen, setScreen] = useState(0);
  console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

  let test = 0;
  function Home() {
    console.log("HOME SCREEN");
    setScreen(0);
  }

  function User() {
    console.log("User");
    setScreen(1);
  }

  function Community() {
    console.log("Community");
    setScreen(3);
  }

  function AllList() {
    console.log("all list");
    setScreen(2);
  }

  let ShowScreen = <HomeScreen />;
  let ScreenButtons = (
    <div id="selectorButton">
      <HomeIcon className="button-spacing" onClick={Home} />
      <GroupsIcon className="button-spacing" onClick={AllList} />
      <PersonIcon className="button-spacing" onClick={User} />
      <FunctionsIcon className="button-spacing" onClick={Community} />
      <TextField />
      Sort By <SortIcon />
    </div>
  );

  if (screen === 0) {
    ShowScreen = <HomeScreen />;
  } else if (screen === 1) {
    ShowScreen = <UserScreen />;
  } else if (screen === 2) {
    ShowScreen = <AllListScreen />;
  } else if (screen === 3) {
    ShowScreen = <CommunityScreen />;
  }

  if (auth.loggedIn)
    return (
      <div>
        {ScreenButtons}
        {ShowScreen}
      </div>
    );
  else return <SplashScreen />;
}
