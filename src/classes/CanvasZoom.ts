import { Canvas, ICanvasDimensions } from "./Canvas";
import { fabric } from "fabric";

/**
 * Canvas class with Zoom and panning
 */
export class CanvasZoom extends Canvas {
  private lastPosX: number = 0;
  private lastPosY: number = 0;
  private isDragging: boolean = false;

  constructor(
    htmlElem: string | HTMLCanvasElement,
    canvasDimensions: ICanvasDimensions
  ) {
    super(htmlElem, canvasDimensions);
    this.initZoom();
    this.initPan();
    
  }

  protected initZoom() {
    this.onMouseWheel$().subscribe((wheel) => {
      const delta = wheel.deltaY;
      let zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      this.canvas.zoomToPoint(new fabric.Point(wheel.offsetX, wheel.offsetY), zoom);
      wheel.preventDefault();
      wheel.stopPropagation();
    })  
  }

  protected initPan() {
    this.onMouseDown$().subscribe((e) => {
      if (!this.canvas.getActiveObject()) {
        this.isDragging = true;
        this.canvas.selection = false;
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    this.onMouseMove$().subscribe((e) => {
      if (this.isDragging) {
        var vpt = this.canvas.viewportTransform!;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.canvas.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    this.onMouseUp$().subscribe((mouse) => {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.canvas.setViewportTransform(this.canvas.viewportTransform!);
      this.isDragging = false;
      this.canvas.selection = true;
    });    
  }
}
