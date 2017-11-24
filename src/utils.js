/* global fetch */

export const wrapperFetch = (url) => {
  const headers = {
    'Accept': 'application/json', // eslint-disable-line
    'Content-Type': 'application/json', // eslint-disable-line
    'Authorization': 'Bearer BQAuS2Snx2Fg7SF0evqwcOLi_fwzedj1FnrNS0ov7X0I0Txt_Wwx_LBX9YCECcntUL48Jc7IUanWto1kMqaECRyDMZ0tBscNAf_WRTaqfU21XaVHBazJMWAnyF0pF4e8n3RVKIaiOK0s9xo1rmPnXXpMKA', // eslint-disable-line
  };

  const options = { headers };
  return fetch(url, options);
};

export const toJSON = data => data.json();
