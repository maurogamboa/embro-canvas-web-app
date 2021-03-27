import React, { useEffect, useState } from 'react';
import { Canvas } from '../../classes/Canvas';

interface IEmbroideryCanvasProps {
  height: number;
  width: number;
  canvasClass: typeof Canvas,
  afterInit?(canvas: Canvas): void;
}

const EmbroideryCanvas: React.FC<IEmbroideryCanvasProps> = (props) => {
  const [ canvas, setCanvas ] = useState<Canvas>(); 

    /** Initialization */
    useEffect(() => {
      setCanvas(new props.canvasClass(
        'canvas', {
          height: props.height,
          width: props.width,
        }
        ));
    }, []);

    /** props changed */
    useEffect(() => {
      canvas?.setDimensions(props.height, props.width)
    }, [props.height, props.width]);

    /** canvas changed */
    useEffect(() => {
      if(canvas && props?.afterInit) {
        props.afterInit(canvas);
      }
    }, [canvas]);

    return(
      <canvas id="canvas" />
    );
}

export default EmbroideryCanvas;