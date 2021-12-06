import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import AuthContext from "../auth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import api from "../api";

function CommunityListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const { idNamePair } = props;
  const [expanding, setExpanding] = useState(false);

  function handleLoadList(event, id) {
    event.stopPropagation();
    if (!event.target.disabled) {
      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  function expand() {
    setExpanding(!expanding);
  }

  let item1 = " ";
  let item2 = " ";
  let item3 = " ";
  let item4 = " ";
  let item5 = " ";
  if (store.currentList) {
    item1 = store.currentList.items[0];
    item2 = store.currentList.items[1];
    item3 = store.currentList.items[2];
    item4 = store.currentList.items[3];
    item5 = store.currentList.items[4];
  }

  let cardElement = (
    <div>
      <div>
        <ListItem
          id={idNamePair._id}
          key={idNamePair._id}
          sx={{ marginTop: "10px", display: "flex", p: 0 }}
          button
          onClick={(event) => {
            handleLoadList(event, idNamePair._id);
          }}
          style={{
            fontSize: "28pt",
            width: "100%",
          }}
        >
          <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
          <ThumbUpIcon />
          <ThumbDownIcon />
          <ArrowDownwardIcon onClick={expand} />
          <div>views: 32</div>
        </ListItem>
      </div>
      <div>By: {idNamePair.userName}</div>
      <div>Published: {idNamePair.createdAt}</div>
    </div>
  );

  if (expanding) {
    cardElement = (
      <div>
        <div>
          <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: "10px", display: "flex", p: 0 }}
            button
            onClick={(event) => {
              handleLoadList(event, idNamePair._id);
            }}
            style={{
              fontSize: "28pt",
              width: "100%",
            }}
          >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <ThumbUpIcon />
            <ThumbDownIcon />
            <ArrowUpwardIcon onClick={expand} />
            <div>views: 32</div>
          </ListItem>
          <Box sx={{ p: 1 }}>
            <Box sx={{ p: 1 }}>1. {item1}</Box>
            <Box sx={{ p: 1 }}>2. {item2}</Box>
            <Box sx={{ p: 1 }}>3. {item3}</Box>
            <Box sx={{ p: 1 }}>4. {item4}</Box>
            <Box sx={{ p: 1 }}>5. {item5}</Box>
          </Box>
        </div>
        <div>By: {auth.user.userName}</div>
        <div>Published: {idNamePair.createdAt}</div>
      </div>
    );
  }

  return cardElement;
}

export default CommunityListCard;
