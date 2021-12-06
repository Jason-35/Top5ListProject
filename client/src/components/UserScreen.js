import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import  CommunityListCard  from './CommunityListCard';

const UserScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <div class="list-cards">
                        <CommunityListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    </div>
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
           
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
             
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default UserScreen