import React from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MenuToolBar: React.FC<any> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const inputFile = React.useRef<HTMLInputElement>(null);

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
      console.log(files[0]);
      const fileReader = new FileReader();

      fileReader.onloadend = (ev) => {
        console.log("onloadend");
        const buffer = fileReader.result as ArrayBuffer;
        const stitches: number[] = [];
        const int8View = new Int8Array(buffer);
        int8View.forEach((byte, index) => { 
        if(index % 3 === 0) {
          const control = new Uint8Array(buffer, index, 1);
          stitches.push(control[0]);
        } else {
          stitches.push(byte);
        }
        });
        console.log(stitches);
      };

      fileReader.onerror = (ev) => {
        console.log("onerror");
      };

      fileReader.readAsArrayBuffer(files[0]); 
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