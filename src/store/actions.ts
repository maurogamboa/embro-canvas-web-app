import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import Stitch from "../core/models/Stitch";


import {
  FILE_READING,
  FILE_SUCCESS,
  FILE_FAILURE,
  FileReadingActionTypes,
} from "./stateModel";

function later(delay: number) {
  return new Promise(function(resolve) {
      setTimeout(resolve, delay);
  });
}
export function fileReading(file: File) : ThunkAction<void, {}, {}, AnyAction> {
  return async (dispatch, getState, api) => {
    dispatch({
      type: FILE_READING,
    });

    try {
      const fileReader = new FileReader();
      
      //Reading File end
      fileReader.onloadend = (ev) => {
        console.log("onloadend");
        
        const buffer = fileReader.result as ArrayBuffer;
        const stitches: Stitch[] = [];
        // const int8View = new Int8Array(buffer);

        // int8View.forEach((byte, index) => { 
        // if(index % 3 === 0) {
        //   const control = new Uint8Array(buffer, index, 1);
        //   stitches.push(control[0]);
        // } else {
        //   stitches.push(byte);
        // }
        // });
        for (let index = 0; index < buffer.byteLength; index += 3) {
          stitches.push({
            control: new Uint8Array(buffer, index, 1)[0],
            x: new Int8Array(buffer, index + 1, 1)[0],
            y: new Int8Array(buffer, index + 2, 1)[0],
          });
        }        
        dispatch(fileSuccess(stitches));
      };

      fileReader.onerror = (ev) => {
        dispatch(fileFailure('file read error'));
      };

      fileReader.readAsArrayBuffer(file); 


    } catch (error) {
      dispatch(fileFailure(error));
    }

  }
} 

export function fileSuccess(
  stitches: Stitch[]
): FileReadingActionTypes {
  console.log(stitches);
  return {
    type: FILE_SUCCESS,
    payload: stitches,
  };
}

export function fileFailure(
  error: string
): FileReadingActionTypes {
  return {
    type: FILE_FAILURE,
    error
  };
}
