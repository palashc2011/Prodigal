import { makeApiCall } from './axiosCall'
import { CALLER_LIST_API, getMappedUrl, CALLER_DURATION, CALLER_FILTERED_CALLS, LABELLED_CALLS, LABEL_LIST, APPLY_LABEL } from "./constants"
import { map } from 'lodash';
export const getCallerList = ({ handleSuccess}) => {
    const url = getMappedUrl(CALLER_LIST_API, [], []);
    const request = {
      url: url,
      method: 'GET',
      handleSuccess,
    }
    return makeApiCall(request)
};
export const getDuration = ({ handleSuccess }) => {
    const url = getMappedUrl(CALLER_DURATION, [], []);
    const request = {
      url: url,
      method: 'GET',
      handleSuccess,
    }
    return makeApiCall(request);
};

export const getLabelledCallers = ({ handleSuccess }) => {
    const url = getMappedUrl(LABELLED_CALLS, [], []);
    const request = {
      url: url,
      method: 'GET',
      handleSuccess,
      headers: {
        user_id: "24b452"
      }
    }
    return makeApiCall(request);
};
export const fetchLabelList = ({ handleSuccess }) => {
    const url = getMappedUrl(LABEL_LIST, [], []);
    const request = {
      url: url,
      method: 'GET',
      handleSuccess,
      headers: {
        user_id: "24b452"
      }
    }
    return makeApiCall(request);
};

export const fetchFilteredcalls = ({ handleSuccess, body }) => {
    const url = getMappedUrl(CALLER_FILTERED_CALLS, [], []);
    const request = {
      url: url,
      method: 'POST',
      handleSuccess,
      data: body
    }
    return makeApiCall(request)
}

export const addLabel = ({ handleSuccess, callList, labelList, operation }) => {
    const label_ops = labelList.map(val => ({
      "name": val, "op": operation
    }));
    const data = {
      "operation":
      {
        callList,
        label_ops
      }
    }

    const url = getMappedUrl(APPLY_LABEL, [], []);
    const request = {
      url: url,
      method: 'POST',
      handleSuccess,
      data,
      headers: {
        user_id: "24b452"
      }

    }
    return makeApiCall(request)
}
// export const removeLabel = ({ handleSuccess, callList, labelList }) => {
//     const label_ops = labelList.map(val => ({
//       "name": val, "op": "remove"
//     }));
//     const data = {
//       "operation":
//       {
//         callList,
//         label_ops
//       }
//     }
//
//     const url = getMappedUrl(APPLY_LABEL, [], []);
//     const request = {
//       url: url,
//       method: 'POST',
//       handleSuccess,
//       data
//     }
//     return makeApiCall(request);
// }
