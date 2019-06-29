import axios from "axios";
import { API_BASE_URL } from "../config/Globals/APIs";
import { get } from "lodash";
export function makeApiCall(request) {
  // let user=loadState()
  let { headers = {}, url, method, data = {} } = request;
  return axios({
    url,
    method,
    baseURL: API_BASE_URL,
    data,
    headers: {
      "content-type": "application/json",
      ...headers
    }
  })
    .then(response => {
      if (typeof request.handleSuccess === "function") {
        request.handleSuccess(response.data);
      }
    })
    .catch(err => {
      if (typeof request.handleFailure === "function") {
        request.handleFailure(get(err, "response.data", null));
      }
    });
}
