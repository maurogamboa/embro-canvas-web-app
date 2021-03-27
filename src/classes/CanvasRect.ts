import { fabric } from "fabric";
import { ICanvasObject } from "../core/models/CanvasObject";

export class CanvasRect implements ICanvasObject {
  public left: number = 0;
  public top: number = 0;
  public fill: string = '';
  public width: number = 10;
  public height: number = 10;

  constructor(init: Partial<CanvasRect>) {
    Object.assign(this, init);
  }
  sendToBack(): void {
    throw new Error("Method not implemented.");
  }
  parseObject() {
    const rect = new fabric.Rect({
      left: this.left,
      top: this.top,
      fill: this.fill,
      width: this.width,
      height: this.height,
      borderColor: 'green',
      cornerColor: 'green',
      cornerSize: 12
    });
    return rect;
  }
    
}