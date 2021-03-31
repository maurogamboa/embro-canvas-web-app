import React, { Fragment, useState, useEffect, useRef } from 'react';
import EmbroideryCanvas from '../canvas/EmbroideryCanvas';
import './EmbroideryView.css';
import { CanvasController } from '../../controllers/canvasController';
import { Canvas } from '../../classes/Canvas';
import { CanvasZoom } from '../../classes/CanvasZoom';
import useResize from '../resize/useResize';


const EmbroideryView: React.FC<any> = () => {
  const [ canvasController, setController ] = useState<CanvasController>(); 
  const componentRef = useRef(null);
  const viewportDimensions = useResize(componentRef);
  
  
  const canvasAfterInit = (canvas: Canvas) => {
    console.log('canvasAfterInit');
    setController(new CanvasController(canvas));
  }

  useEffect(() => {
    console.log('canvasController effect')
    if(canvasController) {

    }
  }, [canvasController])


  // return (
  //   <div className="area-canvas" ref={componentRef}>
  //     <button onClick={() => canvasController?.setDimensions(250, 250)}>
  //       Change Canvas.
  //     </button>
  //     height: {viewportDimensions.height} width: {viewportDimensions.width}
  //   </div>
  // )
  return (
    <div className="area-canvas" ref={componentRef}>
      {/* <div className="inner-area-canvas">
        <button onClick={() => canvasController?.setDimensions(250, 250)}>
          Change Canvas.
        </button>        
      </div> */}
      <div className="area-embroidery">
        <EmbroideryCanvas 
          height={viewportDimensions.height || 450} 
          width={viewportDimensions.width || 450} 
          canvasClass={CanvasZoom}
          afterInit={canvasAfterInit} />        
      </div>

    </div>
  )
}

export default EmbroideryView;