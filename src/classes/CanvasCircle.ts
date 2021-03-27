import { fabric } from "fabric";
import { ICanvasObject } from "../core/models/CanvasObject";

export class CanvasCircle implements ICanvasObject {
  public left: number = 0;
  public top: number = 0;
  public fill: string = '';
  public radius: number = 10;

  constructor(init: Partial<CanvasCircle>) {
    Object.assign(this, init);
  }
  sendToBack(): void {
    throw new Error("Method not implemented.");
  }
  parseObject() {
    const rect = new fabric.Circle({
      left: this.left,
      top: this.top,
      fill: this.fill,
      radius: 20,
      borderColor: 'green',
      cornerColor: 'green',
      cornerSize: 12
    });
    return rect;
  }
    
}