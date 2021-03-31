import React, { Dispatch } from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { FileReadingActionTypes, FileReadingState } from "../../store/stateModel";
import { fileReading } from "../../store/actions";

const MenuToolBar: React.FC<any> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const inputFile = React.useRef<HTMLInputElement>(null);

  const store = useSelector<FileReadingState, FileReadingState>(
    (state) => state,
  );
  const dispatch: Dispatch<FileReadingActionTypes> = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onOpenFileDialog = () => {
    handleClose();
    if(inputFile.current) inputFile.current.click();
  };

  const handleFileChange = (files: FileList) => {
    if(files.length) {
      dispatch(fileReading(files[0]));
    }  
  }

  return (
    <React.Fragment>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
        File
      </Button>
      <Button aria-controls="simple-menu" aria-haspopup="true" color="inherit">
        Edit
      </Button>
      <Button aria-controls="simple-menu" aria-haspopup="true" color="inherit">
        Format
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={onOpenFileDialog}>Open file</MenuItem>
        <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
      <input 
        type='file' 
        id='file' 
        ref={inputFile} 
        accept=".eys" 
        style={{display: 'none'}}
        onChange={e => handleFileChange(e.target.files!)}
      />
    </React.Fragment>
  );
};

export default MenuToolBar;