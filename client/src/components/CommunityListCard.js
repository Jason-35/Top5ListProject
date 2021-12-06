import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import AuthContext from "../auth";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dateFormat from "dateformat";
import Link from "@mui/material/Link";
import api from "../api";

function CommunityListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const { idNamePair } = props;
  const [expanding, setExpanding] = useState(false);

  let likeOffset = 0;
  if (idNamePair.likes > 0) {
    likeOffset = 1;
  }
  let dislikeOffset = 0;
  if (idNamePair.dislikes > 0) {
    dislikeOffset = 1;
  }
  const [like, setLike] = useState(idNamePair.likes + likeOffset);
  const [dislike, setDislike] = useState(idNamePair.likes + dislikeOffset);

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

  function handlelike(event, id) {
    event.stopPropagation();
    store.likeList(id, like);
    setLike(like + 1);
  }

  function handledislike(event, id) {
    event.stopPropagation();
    store.dislikeList(id, dislike);
    setDislike(dislike + 1);
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
    <div
      style={{
        margin: "15px",
      }}
    >
      <Box>
        <ListItem
          id={idNamePair._id}
          key={idNamePair._id}
          sx={{ display: "flex" }}
          button
          onClick={(event) => {
            handleLoadList(event, idNamePair._id);
          }}
          style={{
            fontSize: "28pt",
            width: "100%",
          }}
        >
          <Box sx={{ p: 0, flexGrow: 1, fontSize: "25px" }}>
            {idNamePair.name}
          </Box>

          <Box marginX={4.5}>
            <IconButton aria-label="dislikes">
              <ThumbUpIcon
                style={{ fontSize: "30pt", marginInline: "10px" }}
                onClick={(event) => {
                  handlelike(event, idNamePair._id);
                }}
              />{" "}
              {like}
            </IconButton>
          </Box>
          <Box marginX={4.5}>
            <IconButton aria-label="dislikes">
              <ThumbDownIcon
                style={{ fontSize: "30pt", marginInline: "10px" }}
                onClick={(event) => {
                  handledislike(event, idNamePair._id);
                }}
              />{" "}
              {dislike}
            </IconButton>
          </Box>
        </ListItem>
      </Box>
      <div style={{ marginLeft: "17px", paddingBottom: "10px" }}>
        <Box>
          By:
          <Link
            sx={{ color: "blue", textDecorationColor: "blue" }}
            marginLeft={3}
            fontSize={20}
            href="#"
          >
            {auth.user.userName}
          </Link>
        </Box>

        <div style={{ color: "#00FF00" }}>
          <div style={{ float: "left", marginRight: "15px", color: "black" }}>
            Published:{" "}
          </div>
          {dateFormat(idNamePair.createdAt, "mmmm d, yyyy")}
          <div style={{ float: "right" }}>
            <div
              style={{
                color: "black",
                float: "left",
                marginTop: "-25px",
                marginRight: "175px",
                fontSize: "14pt",
              }}
            >
              Views:{" "}
              <div style={{ color: "red", float: "right", marginLeft: "10px" }}>
                32
              </div>
            </div>
            <div
              style={{
                color: "black",
                float: "right",
                marginTop: "-35px",
                marginRight: "25px",
                marginLeft: "25px",
              }}
            >
              <ArrowDownwardIcon
                style={{ fontSize: "30pt" }}
                onClick={expand}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  let Comments = (
    <>
      <Box
        mr={3}
        p={0.5}
        sx={{
          bgcolor: "#FF8000",
          border: "1px solid black",
          borderRadius: "15px",
          marginBlock: "10px",
          marginTop: 0,
        }}
      >
        <Link
          sx={{
            color: "blue",
            textDecorationColor: "blue",
            marginLeft: "15px",
          }}
          fontSize={15}
          href="#"
        >
          {auth.user.userName}
        </Link>
        <div style={{ marginLeft: "15px", marginTop: "10px" }}>COMMENT</div>
      </Box>
    </>
  );

  if (expanding) {
    cardElement = (
      <div
        style={{
          margin: "15px",
        }}
      >
        <Box>
          <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ display: "flex" }}
            button
            onClick={(event) => {
              handleLoadList(event, idNamePair._id);
            }}
            style={{
              fontSize: "28pt",
              width: "100%",
            }}
          >
            <Box sx={{ p: 0, flexGrow: 1, fontSize: "25px" }}>
              {idNamePair.name}
            </Box>

            <Box marginX={4.5}>
              <IconButton aria-label="dislikes">
                <ThumbUpIcon
                  style={{ fontSize: "30pt", marginInline: "10px" }}
                  onClick={(event) => {
                    like(event, idNamePair._id);
                  }}
                />{" "}
                {idNamePair.likes}
              </IconButton>
            </Box>
            <Box marginX={4.5}>
              <IconButton aria-label="dislikes">
                <ThumbDownIcon
                  style={{ fontSize: "30pt", marginInline: "10px" }}
                  onClick={(event) => {
                    dislike(event, idNamePair._id);
                  }}
                />{" "}
                {idNamePair.dislikes}
              </IconButton>
            </Box>
          </ListItem>
        </Box>
        <div style={{ marginLeft: "17px", paddingBottom: "10px" }}>
          <Box>
            By:
            <Link
              sx={{ color: "blue", textDecorationColor: "blue" }}
              marginLeft={3}
              fontSize={20}
              href="#"
            >
              {auth.user.userName}
            </Link>
          </Box>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBlock: "15px",
            }}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "#2C3287",
                width: "45%",
                borderRadius: 2,
              }}
            >
              <Box sx={{ p: 1, fontSize: "30pt" }}>1. {item1}</Box>
              <Box sx={{ p: 1, fontSize: "30pt" }}>2. {item2}</Box>
              <Box sx={{ p: 1, fontSize: "30pt" }}>3. {item3}</Box>
              <Box sx={{ p: 1, fontSize: "30pt" }}>4. {item4}</Box>
              <Box sx={{ p: 1, fontSize: "30pt" }}>5. {item5}</Box>
            </Box>

            <Box height={315} sx={{ mt: -3, mr: 4, width: "45%" }}>
              <Box
                height={275}
                sx={{
                  fontSize: "16pt",
                  overflowY: "scroll",
                }}
              >
                {Comments}
              </Box>
              <TextField
                sx={{
                  width: "95%",
                  bgcolor: "white",
                  borderRadius: 1,
                  marginTop: "10px",
                }}
                placeholder="Add Comment"
              />
            </Box>
          </Box>

          <div style={{ color: "#00FF00" }}>
            <div style={{ float: "left", marginRight: "15px", color: "black" }}>
              Published:{" "}
            </div>
            {dateFormat(idNamePair.createdAt, "mmmm d, yyyy")}
            <div style={{ float: "right" }}>
              <div
                style={{
                  color: "black",
                  float: "left",
                  marginTop: "0px",
                  marginRight: "175px",
                  fontSize: "14pt",
                }}
              >
                Views:{" "}
                <div
                  style={{ color: "red", float: "right", marginLeft: "10px" }}
                >
                  32
                </div>
              </div>
              <div
                style={{
                  color: "black",
                  float: "right",
                  marginTop: "-15px",
                  marginRight: "25px",
                  marginLeft: "25px",
                }}
              >
                <ArrowUpwardIcon
                  style={{ fontSize: "30pt" }}
                  onClick={expand}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return cardElement;
}

export default CommunityListCard;
