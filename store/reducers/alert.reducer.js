import { ALERT_CONSTANTS } from "../../store/actionTypes";
import { CONSTANTS } from "../../utils";

const initState = {
  type: "",
  message: null,
  hide: true,
  group: CONSTANTS.ERROR_TYPE.TOAST,
  autoDismiss: false,
  clearAll: false
};

const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case ALERT_CONSTANTS.SUCCESS:
      return {
        ...state,
        type: "success",
        message: action.message,
        hide: true,
        group: action.group,
        autoDismiss: action.autoDismiss,
        clearAll: false,
      };
    case ALERT_CONSTANTS.ERROR:
      return {
        ...state,
        type: "error",
        message: action.message,
        hide: action.hide,
        group: action.group,
        autoDismiss: action.autoDismiss,
        clearAll: false,
      };
    case ALERT_CONSTANTS.WARNING:
      return {
        ...state,
        type: "warning",
        message: action.message,
        hide: true,
        group: action.group,
        autoDismiss: action.autoDismiss,
        clearAll: false,
      };
    case ALERT_CONSTANTS.INFO:
      return {
        ...state,
        type: "info",
        message: action.message,
        hide: false,
        group: action.group,
        autoDismiss: action.autoDismiss,
        clearAll: false,
      };
    case ALERT_CONSTANTS.CLEAR:
      return {
        ...initState,
        clearAll: true,
      };
    default:
      return state;
  }
};

export default alertReducer;