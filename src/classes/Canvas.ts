import { fabric } from "fabric";
import { Subject } from "rxjs";
import { ICanvasObject } from "../core/models/CanvasObject";

export interface ICanvasDimensions {
  height: number, 
  width: number
}

export class Canvas {
  protected readonly canvas: fabric.Canvas;
  private subjectAfterRender = new Subject<void>();
  private subjectMouseDown = new Subject<MouseEvent>();
  private subjectMouseUp = new Subject<MouseEvent>();
  private subjectMouseMove = new Subject<MouseEvent>();
  private subjectMouseWheel = new Subject<WheelEvent>();
  private subjectDrop = new Subject<any>();

  constructor(
    private htmlElem: string | HTMLCanvasElement,
    private canvasDimensions: ICanvasDimensions, 
  ) {
    this.canvas = this.initCanvas();  
    this.initEventListeners();
  }

  addObject(obj: ICanvasObject) {
    this.canvas.add(obj.parseObject());
  }

  setDimensions(height: number, width: number) {
    this.canvas.setDimensions({height, width});
  }

  protected initCanvas() {
    const { height, width } = this.canvasDimensions;
    return new fabric.Canvas(this.htmlElem, {
      height,
      width,
      backgroundColor: '#e6e8eb'
    })  
  }

  getimensions() {
    return this.canvasDimensions;
  }

  getViewport() {
    return this.canvas.viewportTransform!;
  }

  getZoom() {
    return this.canvas.getZoom();
  }

  public onAfterRender$() {
    return this.subjectAfterRender.asObservable();
  }

  public onMouseDown$() {
    return this.subjectMouseDown.asObservable();
  }

  public onMouseMove$() {
    return this.subjectMouseMove.asObservable();
  }

  public onMouseUp$() {
    return this.subjectMouseUp.asObservable();
  }

  public onMouseWheel$() {
    return this.subjectMouseWheel.asObservable();
  }

  public onDrop$() {
    return this.subjectDrop.asObservable();
  }

  protected initEventListeners() {
    this.canvas.on('after:render', () => {
      this.subjectAfterRender.next();
    });
    this.canvas.on('mouse:down', (opt) => {
      this.subjectMouseDown.next(opt.e as MouseEvent);
    });
    this.canvas.on('mouse:move', (opt) => {
      this.subjectMouseMove.next(opt.e as MouseEvent);
    });
    this.canvas.on('mouse:up', (opt) => {
      this.subjectMouseUp.next(opt.e as MouseEvent);
    });
    this.canvas.on('mouse:wheel', (opt) => {
      this.subjectMouseWheel.next(opt.e as WheelEvent);
    });
    this.canvas.on('drop', (opt) => {
      this.subjectDrop.next(opt.e);
    });
  }
}