import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AuthContext from "../auth";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function CommunityListCard(props){
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false);

    function handleLoadList(event, id) {
        event.stopPropagation();
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

   
    
    return (<ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginTop: '15px', display: 'flex', p: 1 }}
        button
        onClick={(event) => {
            handleLoadList(event, idNamePair._id)
        }
        }
        style={{
            fontSize: '48pt',
            width: '100%'
        }}
    >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
    
            
            <ThumbUpIcon />
            <ThumbDownIcon />
    </ListItem>)
}

export default CommunityListCard