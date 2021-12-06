import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }
    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    

    function handleKeyPress(event, targetId) {
        if (event.code === "Enter") {
            let index = event.target.id.substring("list-".length);
            let text = event.target.value;
            store.addUpdateItemTransaction(targetId-1, text);
            toggleEdit();
        }
    }

    let { index } = props;

    let itemClass = "top5-item";


    let editStatus = false;
    if (store.isItemEditActive) {
        editStatus = true;
    }

    if(editActive){
        return(<ListItem
            id={'item-' + (index+1)}
            key={props.key}
            className={itemClass}
            sx={{ display: 'flex', p: 1 }}
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
        <Box sx={{ p: 1 }}>
                <Input onKeyPress={(event) => {handleKeyPress(event, (index+1))}} defaultValue={props.text} style={{fontSize:'48pt'}}  />
        </Box>
        </ListItem>)
    }else{
        return(
            <ListItem
                id={'item-' + (index+1)}
                key={props.key}
                className={itemClass}
               
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}}  />
                </IconButton>
            </Box>
                <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
            </ListItem>
        )
    }
}

export default Top5Item;