import { fetchMessages, fetchMessagesStarted } from "./messages";
import { postSms } from "../services/api";

export const SET_CHAT_TEXT = "SET_CHAT_TEXT";
export const POST_SMS_SUCCESS = "POST_SMS_SUCCESS";

export const locationsSuccess = locations => {
  return {
    type: LOCATIONS_SUCCESS,
    text
  }
};

export const locationsFailure = error => {
  return {
    type: LOCATIONS_FAILURE,
    error
  }
};

/**
 * Thunks
 */
export function sendMessage(contactId, daContactId, phoneId, phoneNumber, text) {
  return function(dispatch, getState) {
    if (text) {
      let state = getState(),
        token = state.login.token,
        domain = state.login.domain;

      // update store that insertion is happening
      dispatch(fetchMessagesStarted());

      postSms(token, domain, daContactId, phoneNumber, text)
        .then(() => {
          dispatch(fetchMessages(contactId, daContactId, phoneNumber, phoneId));
          dispatch(setChatInputText(''));
        })
        .then(() => {
          dispatch(postSmsSuccess(false));
        })
        .catch( error => console.log("There was an error in actions/chatview sendMessage: " + JSON.stringify(error)));

    }
  }
}
