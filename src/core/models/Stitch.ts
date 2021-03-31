export enum StitchControl {
  Stitch = 0x80,
  Jump = 0x81,
  Rewind = 0x82,
  Stop = 0x88,
  Home = 0x89,
  End = 0x90,
  Cut = 0x98,
}

export default interface Stitch {
  control: StitchControl,
  x: number
  y: number
}