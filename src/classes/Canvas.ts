// import { fabric } from "fabric";
import { Subject } from "rxjs";
import { ICanvasObject } from "../core/models/CanvasObject";
import paper from "paper";

export interface ICanvasDimensions {
  height: number, 
  width: number
}

export class Canvas {
  protected readonly canvas: any;
  private subjectAfterRender = new Subject<void>();
  private subjectMouseDown = new Subject<MouseEvent>();
  private subjectMouseUp = new Subject<MouseEvent>();
  private subjectMouseMove = new Subject<MouseEvent>();
  private subjectMouseWheel = new Subject<WheelEvent>();
  private subjectDrop = new Subject<any>();
  private tool = new paper.Tool();

  constructor(
    private htmlElem: string | HTMLCanvasElement,
    private canvasDimensions: ICanvasDimensions, 
  ) {
    // this.canvas = this.initCanvas();  
    this.initEventListeners();
    paper.setup(htmlElem);
    // new paper.Path.Circle({
    //   center: paper.view.center,
    //   radius: 30,
    //   strokeColor: 'black'
    // });

    // paper.view.size
    this.tool.onMouseDrag = (event: any) => {
      let pan_offset = event.point.subtract(event.downPoint);
      paper.view.center = paper.view.center.subtract(pan_offset);
    }

    const ref = document.getElementById("canvas")!;
    
    ref.addEventListener('wheel', event => {
      let newZoom = paper.view.zoom; 
      let oldZoom = paper.view.zoom;
      
      if (event.deltaY < 0) {			
        newZoom = paper.view.zoom * 1.10;
      } else {
        newZoom = paper.view.zoom * 0.90;
      }
      
      let beta = oldZoom / newZoom;
      
      let mousePosition = new paper.Point(event.offsetX, event.offsetY);
      
      //viewToProject: gives the coordinates in the Project space from the Screen Coordinates
      let viewPosition = paper.view.viewToProject(mousePosition);
      
      let mpos = viewPosition;
      let ctr = paper.view.center;
      
      let pc = mpos.subtract(ctr);
      let offset = mpos.subtract(pc.multiply(beta)).subtract(ctr);	
      
      paper.view.zoom = newZoom;
      paper.view.center = paper.view.center.add(offset);
      
      event.preventDefault();
      // paper.view.draw();		
    })
  }

  addObject(obj: ICanvasObject) {
    console.log("addObject", obj);
    // this.canvas.add(obj.parseObject());
    obj.parseObject();
  }

  setDimensions(height: number, width: number) {
    // this.canvas.setDimensions({height, width});
  }

  protected initCanvas() {
    const { height, width } = this.canvasDimensions;
    // return new fabric.Canvas(this.htmlElem, {
    //   height,
    //   width,
    //   backgroundColor: '#e6e8eb'
    // })  
  }

  clear() {
    // this.canvas.clear()
  }

  getimensions() {
    return this.canvasDimensions;
  }

  getViewport() {
    // return this.canvas.viewportTransform!;
  }

  getZoom() {
    // return this.canvas.getZoom();
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
    // this.canvas.on('after:render', () => {
    //   this.subjectAfterRender.next();
    // });
    // this.canvas.on('mouse:down', (opt) => {
    //   this.subjectMouseDown.next(opt.e as MouseEvent);
    // });
    // this.canvas.on('mouse:move', (opt) => {
    //   this.subjectMouseMove.next(opt.e as MouseEvent);
    // });
    // this.canvas.on('mouse:up', (opt) => {
    //   this.subjectMouseUp.next(opt.e as MouseEvent);
    // });
    // this.canvas.on('mouse:wheel', (opt) => {
    //   this.subjectMouseWheel.next(opt.e as WheelEvent);
    // });
    // this.canvas.on('drop', (opt) => {
    //   this.subjectDrop.next(opt.e);
    // });
  }
}