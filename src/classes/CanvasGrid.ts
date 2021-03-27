import { fabric } from "fabric";
import { ICanvasObject } from "../core/models/CanvasObject";
import { ICanvasDimensions } from "./Canvas";

export class CanvasGrid implements ICanvasObject {
  constructor(
    private canvasDimensions: ICanvasDimensions,
  ) {}
  
  sendToBack(): void {
    throw new Error("Method not implemented.");
  }

  parseObject() {
    const gridSize = 25;
    const width = this.canvasDimensions.width * 4;
    const height = this.canvasDimensions.height * 4;
    const left = 0;
    const top = 0;
    const lines: fabric.Line[] = [];
    const lineOption = {stroke: 'gray', strokeWidth: 1, selectable: false}; //rgba(0,0,0,1)

    for (let i = Math.ceil(width / gridSize); i--;) {
      lines.push(new fabric.Line([gridSize * i, -top, gridSize * i, height], lineOption));
    }

    for (let i = Math.ceil(height / gridSize); i--;) {
      lines.push(new fabric.Line([-left, gridSize * i, width, gridSize * i], lineOption));
    }
    const oGridGroup = new fabric.Group(lines, {left: 0, top: 0, selectable: false, hoverCursor: 'grab'});
    oGridGroup.moveCursor = 'grabbing';
    return oGridGroup;
  }
    
}