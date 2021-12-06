import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  function handleCreateNewList() {
    store.createNewList();
  }

  let activeAdd = false;
  if (store.isListNameEditActive) {
    activeAdd = true;
  }

  let listCard = "";
  if (store) {
    listCard = (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {store.idNamePairs.map((pair) => (
          <div class="list-cards">
            <ListCard key={pair._id} idNamePair={pair} selected={false} />
          </div>
        ))}
      </List>
    );
  }
  return (
    <div id="top5-list-selector">
      <div id="list-selector-scroll">{listCard}</div>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <div>
          <Fab
            color="primary"
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
            disabled={activeAdd}
          >
            <AddIcon />
          </Fab>
        </div>
        <Typography variant="h2">Your Lists</Typography>
      </Stack>
    </div>
  );
};

export default HomeScreen;
