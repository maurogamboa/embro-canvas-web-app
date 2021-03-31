import { Canvas } from "../classes/Canvas";
import { CanvasGrid } from "../classes/CanvasGrid";
import { CanvasRect } from "../classes/CanvasRect";
import { CanvasCircle } from "../classes/CanvasCircle";
import { ICanvasObject } from "../core/models/CanvasObject";
import { CanvasStitches } from "../classes/CanvasStitches";
import Stitch from "../core/models/Stitch";

export class CanvasController {
  // private grid: CanvasGrid;
  constructor(protected canvas: Canvas) {
    //Add grid
    // this.grid = new CanvasGrid(canvas.getimensions())
    // this.addObject(this.grid);

    //Handle Drop
    this.canvas.onDrop$().subscribe((ev: any) => {
      const geoType = ev.dataTransfer?.getData("text") as string;
      const [, , , , offsetX, offsetY] = this.canvas.getViewport()

      let newShape: any; 
      switch (geoType) {
        
        case "shape-circle":
          newShape = new CanvasCircle({
            radius: 75,
            fill: 'red',
            left: ev.layerX - offsetX,
            top: ev.layerY - offsetY,
          });
          break;
        case "shape-rect":
          newShape = new CanvasRect({
            width: 75,
            height: 75,
            fill: 'blue',
            left: (ev.layerX - offsetX),
            top: (ev.layerY - offsetY),
          });
          break;
        default:
          break;
      }
      this.addObject(newShape);
    }); 
  }

  addObject(obj: ICanvasObject) {
    this.canvas.addObject(obj);
    console.log("Object added");
  }

  addStitchesObject(stitches: Stitch[]) {
    this.addObject(new CanvasStitches(
      this.canvas.getimensions(), 
      stitches
    ));
  }

  setDimensions(height: number, width: number) {
    this.canvas.setDimensions(height, width);
  }
}
