import Stitch from "../core/models/Stitch";

export const FILE_READING = "FILE_READING";
export const FILE_SUCCESS = "FILE_SUCCESS";
export const FILE_FAILURE = "FILE_FAILURE";

interface FileReadingAction {
  type: typeof FILE_READING;
  payload: File
}

interface FileReadingSuccessAction {
  type: typeof FILE_SUCCESS;
  payload: Stitch;
}

interface FileReadingFailureAction {
  type: typeof FILE_FAILURE;
  error: string;
}

export interface FileReadingState {
  stitches: Stitch[] | undefined;
  loading: boolean;
  error: string;
}

export type FileReadingActionTypes =
  | FileReadingAction
  | FileReadingSuccessAction
  | FileReadingFailureAction
  | any
