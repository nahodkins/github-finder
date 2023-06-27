import {useReducer} from "react";
import AlertReducer from "../alert/alertReducer";
import AlertContext from "./alertContext";
import {
    SET_ALERT,
    REMOVE_ALERT
} from "../types";

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    /**
     * Sends alert to the UI
     *
     * @param message message of alert
     * @param type type of the alert (e.g. success, danger)
     */
    const sendAlert = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {message, type}
        })

        setTimeout(() => dispatch({type: REMOVE_ALERT}), 5000)
    }

    return(
        <AlertContext.Provider
            value = {{
                alert: state,
                sendAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )

};

export default AlertState