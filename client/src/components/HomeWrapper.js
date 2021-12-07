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
  const { store } = useContext(GlobalStoreContext);
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

  function handleKeyDown(event) {
    if (event.code === "Enter") {
      store.setKeydownStatus();
    }
  }

  let ShowScreen = <HomeScreen />;
  let ScreenButtons = (
    <div id="selectorButton">
      <div style={{ float: "left", marginBlock: "10px" }}>
        <HomeIcon fontSize="large" className="button-spacing" onClick={Home} />
        <GroupsIcon
          fontSize="large"
          className="button-spacing"
          onClick={AllList}
        />
        <PersonIcon
          fontSize="large"
          className="button-spacing"
          onClick={User}
        />
        <FunctionsIcon
          fontSize="large"
          className="button-spacing"
          onClick={Community}
        />
        <TextField
          placeholder="Search"
          type="text"
          sx={{
            width: "600px",
            marginLeft: "20px",
            background: "white",
            outline: "none",
            border: "none",
          }}
          style={{ borderRadius: 0, outline: "none" }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="sort-by-button">
        <div style={{ marginRight: "20px" }}>Sort By </div>
        <SortIcon fontSize="large" />
      </div>
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
