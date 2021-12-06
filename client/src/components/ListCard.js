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

  let cardElement = (
    <div>
      <Box>
        <ListItem
          id={idNamePair._id}
          key={idNamePair._id}
          sx={{ marginTop: "10px", display: "flex", p: 0 }}
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
          <Box sx={{ p: 1, flexGrow: 1, fontSize: "25px" }}>
            {idNamePair.name}
          </Box>
          <Box sx={{ p: 1 }}>
            <IconButton
              onClick={(event) => {
                handleDeleteList(event, idNamePair._id);
              }}
              aria-label="delete"
            >
              <DeleteIcon style={{ fontSize: "20pt" }} />
            </IconButton>
          </Box>

          <Box>
            <ThumbUpIcon /> 0
          </Box>
          <Box>
            <ThumbDownIcon /> 0
          </Box>
          <ArrowDownwardIcon onClick={expand} />
          <div>views: 32</div>
        </ListItem>
      </Box>
      <Box sx={{ p: 1 }}>By: {auth.user.userName}</Box>
      <div onClick={handleToggleEdit}>Edit</div>
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
            sx={{ marginTop: "15px", display: "flex", p: 0 }}
            button
            onClick={(event) => {
              //handleLoadList(event, idNamePair._id);
            }}
            style={{
              fontSize: "28pt",
              width: "100%",
            }}
          >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1 }}>
              <IconButton
                onClick={(event) => {
                  handleDeleteList(event, idNamePair._id);
                }}
                aria-label="delete"
              >
                <DeleteIcon style={{ fontSize: "15pt" }} />
              </IconButton>
            </Box>

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
          By: {auth.user.userName}
        </div>
        <div>Published: {idNamePair.createdAt}</div>
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
        <Box sx={{ p: 1 }}>
          <IconButton aria-label="edit">
            <EditIcon style={{ fontSize: "48pt" }} />
          </IconButton>
        </Box>
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
