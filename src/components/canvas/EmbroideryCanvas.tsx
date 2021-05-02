import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '../../classes/Canvas';

interface IEmbroideryCanvasProps {

  canvasClass: typeof Canvas,
  afterInit?(canvas: Canvas): void;
}

const EmbroideryCanvas: React.FC<IEmbroideryCanvasProps> = (props) => {
  // const [ canvas, setCanvas ] = useState<Canvas>(); 

  //   /** Initialization */
  //   useEffect(() => {
  //     setCanvas(new props.canvasClass(
  //       'canvas', {
  //         height: props.height,
  //         width: props.width,
  //       }
  //       ));
  //   }, []);

  //   /** props changed */
  //   useEffect(() => {
  //     canvas?.setDimensions(props.height, props.width)
  //   }, [props.height, props.width]);

    /** canvas changed */
    // useEffect(() => {
    //   if(canvas && props?.afterInit) {
    //     props.afterInit?(new props.canvasClass());
    //   }
    // }, [canvas]);

  //   return(
  //     <canvas id="canvas" />
  //   );

  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current!;
    // Paper.setup(canvas);
    // draw1();
    props.afterInit!(new props.canvasClass(canvas, {height: 0, width: 0}));
  }, []);
  
  return <canvas ref={canvasRef} {...props} id="canvas" data-paper-resize="true"/>
}

export default EmbroideryCanvas;