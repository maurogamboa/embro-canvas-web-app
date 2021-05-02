import React, { useState, useEffect, useRef } from 'react';
import EmbroideryCanvas from '../canvas/EmbroideryCanvas';
import './EmbroideryView.css';
import { CanvasController } from '../../controllers/canvasController';
import { Canvas } from '../../classes/Canvas';
// import { CanvasZoom } from '../../classes/CanvasZoom';
// import useResize from '../resize/useResize';
import { useSelector } from "react-redux";
import { FileReadingState } from "../../store/stateModel";
import Snackbar from '@material-ui/core/Snackbar';
import Stitch from '../../core/models/Stitch';


const EmbroideryView: React.FC<any> = () => {
  const [ canvasController, setController ] = useState<CanvasController>(); 
  const componentRef = useRef(null);
  // const viewportDimensions = useResize(componentRef);

  const storeLoading = useSelector<FileReadingState, boolean>(
    (state) => state.loading,
  );

  const storeStitches = useSelector<FileReadingState, Stitch[] | undefined>(
    (state) => state.stitches,
  );
  
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  
  const canvasAfterInit = (canvas: Canvas) => {
    console.log('canvasAfterInit');
    setController(new CanvasController(canvas));
  }

  useEffect(() => {
    console.log('canvasController effect')
    if(canvasController) {

    }
  }, [canvasController])

  useEffect(() => {
    console.log('stitchesLoaded effect');
    if(storeStitches) {
      stitchesLoaded()  
    }
  }, [storeStitches])

  const stitchesLoaded = () => {
    console.log('stitchesLoaded 63', canvasController);
    if(canvasController && storeStitches) {
      
      canvasController.addStitchesObject(storeStitches)
    }
  }

  return (
    <div className="area-canvas" ref={componentRef}>
      {/* <div className="inner-area-canvas">
        <button onClick={() => canvasController?.setDimensions(250, 250)}>
          Change Canvas.
        </button>        
      </div> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={storeLoading}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Loading file..."
      />

        <EmbroideryCanvas 
          canvasClass={Canvas}
          afterInit={canvasAfterInit}/> 

    </div>
  )
}

export default EmbroideryView;