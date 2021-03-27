import React, { Fragment, useState, useEffect } from 'react';
import EmbroideryCanvas from '../canvas/EmbroideryCanvas';
import './EmbroideryView.css';
import { CanvasController } from '../../controllers/canvasController';
import { Canvas } from '../../classes/Canvas';
import { CanvasZoom } from '../../classes/CanvasZoom';


const EmbroideryView: React.FC<any> = () => {
  const [ canvasController, setController ] = useState<CanvasController>(); 

  const canvasAfterInit = (canvas: Canvas) => {
    console.log('canvasAfterInit');
    setController(new CanvasController(canvas));
  }

  useEffect(() => {
    console.log('canvasController effect')
    if(canvasController) {

    }
  }, [canvasController])

  return (
    <Fragment>
      <button onClick={() => canvasController?.setDimensions(250, 250)}>
        Change Canvas.
      </button>
      <EmbroideryCanvas 
        height={600} 
        width={600} 
        canvasClass={CanvasZoom}
        afterInit={canvasAfterInit} />
    </Fragment>
  )
}

export default EmbroideryView;