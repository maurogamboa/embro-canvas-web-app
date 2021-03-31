export enum StitchControl {
  Stitch = 0x80,
  Jump = 0x81,
  Rewind = 0x82,
  Stop = 0x88,
  Home = 0x89,
  End = 0x90,
  Cut = 0x98,
}

export function IsColorControl(control: number): boolean {
  return (control >= 0xA0 && control <= 0xBF) || (control >= 0xE0) 
}

export function getColorIndex(control: number): number {
  if (control >= 0xA0 && control <= 0xBF) {
    return control - 0xA0; 
  } else if(control >= 0xE0) {
    return control - 0xE0; 
  } else {
    return -1;
  }
}

export default interface Stitch {
  control: StitchControl,
  x: number
  y: number
}