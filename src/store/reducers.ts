import {
  FILE_READING,
  FILE_SUCCESS,
  FILE_FAILURE,
  FileReadingActionTypes,
  FileReadingState,
} from "./stateModel";

const initialState: FileReadingState = {
  stitches: undefined,
  loading: false,
  error: "",
};

export function reducerFileReading(
  state = initialState,
  action: FileReadingActionTypes
): FileReadingState {
  switch (action.type) {
    case FILE_READING:
      return {
        stitches: state.stitches,
        loading: true,
        error: ""
      };
    case FILE_SUCCESS:
      return {
        stitches: action.payload,
        loading: false,
        error: ""
      };
    case FILE_FAILURE:
      return {
        stitches: undefined,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
