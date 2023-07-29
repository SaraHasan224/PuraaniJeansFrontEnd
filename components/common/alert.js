import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HELPER, CONSTANTS } from "../../utils";
import { ALERT_ACTIONS } from "../../store/actions";
import { toast } from "react-toastify";

let timeoutTime

function AlertComponent() {
  let dispatch = useDispatch();

  const { message, hide, type, clearAll, autoDismiss, group } = useSelector(state => state.alert);

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      if (HELPER.isNotEmpty(message) && hide) {
          dispatch(ALERT_ACTIONS.clear())
      }
      clearTimeout(timeoutTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    toast.dismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearAll]);

  useEffect(() => {
    /*
      TOAST ALERTS
    */
    if (HELPER.isNotEmpty(message) && HELPER.isNotEmpty(type)) {
      group === CONSTANTS.ERROR_TYPE.TOAST ?
        toast.success(message)
        :
        group === CONSTANTS.ERROR_TYPE.ALERT ?
        HELPER.scrollTo("alert_classes", -100)
          :
          null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, type]);

  useEffect(() => {
    if (HELPER.isNotEmpty(message) && hide) {
        timeoutTime = setTimeout(() => {
          dispatch(ALERT_ACTIONS.clear())
        }, 8000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  
  const clearAlert = () => {
    if(autoDismiss){
      dispatch(ALERT_ACTIONS.clear())
    }
  };

console.log("Alert: ", message, hide, type, clearAll, autoDismiss, group)
  return (HELPER.isNotEmpty(message) && group !== CONSTANTS.ERROR_TYPE.TOAST) ? <div className="row">
  <div className={`col-12 alert_classes `}>
      <div className={`alertCustom  ${HELPER.isEmpty(type) ? "default" : type}`} role="alert">
        <div className={`alertAction ${HELPER.isEmpty(type) ? "default" : type}`}>
            < span className={`${type === "error" ? "icomoon-close" :
              type === "warning" ?
              "icomoon-info" : type === "info" ?
              "icomoon-info" : "icomoon-check"}`}
              onClick={clearAlert}></span>
        </div>
        <div className="alertMsg">{message}</div>
      </div>
    </div>
  </div> : "";
}

export default AlertComponent;