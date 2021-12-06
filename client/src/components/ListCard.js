import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AuthContext from "../auth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import WorkspaceScreen from "./WorkspaceScreen";
import Link from "@mui/material/Link";
import dateFormat from "dateformat";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  const { idNamePair } = props;
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [workspace, setWorkSpace] = useState(false);

  function handleLoadList(event, id) {
    event.stopPropagation();
    if (!event.target.disabled) {
      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  //console.log(idNamePair);

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

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  async function handleDeleteList(event, id) {
    event.stopPropagation();
    store.markListForDeletion(id);
    setShow(true);
    setOpen(true);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      store.changeListName(id, text);
      toggleEdit();
    }
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  function handleConfirmDelete() {
    store.deleteMarkedList();
  }
  function handleCancel() {
    setShow(false);
    setOpen(false);
  }

  function handlePublish(id) {
    store.publishList(id);
  }

  function like(event, id) {
    event.stopPropagation();
    store.likeList(id);
  }

  function dislike(event, id) {
    event.stopPropagation();
    store.dislikeList(id);
  }

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
            setWorkSpace(!workspace);
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

          <Box sx={{ p: 0 }}>
            <IconButton
              onClick={(event) => {
                handleDeleteList(event, idNamePair._id);
              }}
              aria-label="delete"
            >
              <DeleteIcon style={{ fontSize: "30pt" }} />
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
        <div
          style={{
            marginBlock: "10px",
            color: "red",
            textDecoration: "underline",
            textDecorationColor: "red",
            cursor: "pointer",
          }}
          onClick={handleToggleEdit}
        >
          Edit
        </div>
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
              setWorkSpace(!workspace);
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

            <Box sx={{ p: 0 }}>
              <IconButton
                onClick={(event) => {
                  handleDeleteList(event, idNamePair._id);
                }}
                aria-label="delete"
              >
                <DeleteIcon style={{ fontSize: "30pt" }} />
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

  if (workspace) {
    cardElement = (
      <div>
        <Modal
          open={workspace}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "76%",
              height: "60%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <WorkspaceScreen />
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => {
                  setWorkSpace(!workspace);
                }}
                variant="contained"
              >
                SAVE
              </Button>

              <Button
                onClick={(event) => {
                  setWorkSpace(!workspace);
                  handlePublish(idNamePair._id);
                }}
                variant="contained"
              >
                PUBLISH
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  }

  if (show) {
    cardElement = (
      <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginTop: "15px", display: "flex", p: 1 }}
        button
        style={{
          fontSize: "48pt",
          width: "100%",
        }}
      >
        <div>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                <strong>delete top 5 {idNamePair.name}?</strong>
              </Alert>
              <Stack
                sx={{ position: "relative", left: "25%" }}
                direction="row"
                spacing={2}
              >
                <Button onClick={handleConfirmDelete} variant="contained">
                  confirm
                </Button>
                <Button onClick={handleCancel} variant="contained">
                  cancel
                </Button>
              </Stack>
            </Box>
          </Modal>
        </div>
        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
        {/* <Box sx={{ p: 1 }}>
          <IconButton aria-label="edit">
            <EditIcon style={{ fontSize: "48pt" }} />
          </IconButton>
        </Box> */}
        <Box sx={{ p: 1 }}>
          <IconButton aria-label="delete">
            <DeleteIcon style={{ fontSize: "48pt" }} />
          </IconButton>
        </Box>
      </ListItem>
    );
  }

  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={"list-" + idNamePair._id}
        label="Top 5 List Name"
        name="name"
        autoComplete="Top 5 List Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={idNamePair.name}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  }
  return cardElement;
}

export default ListCard;
