const fetch = require("node-fetch");

exports.handler = async (event) => {
  const ARTWORK_PROFILE_API = "https://www.pixiv.net/ajax/illust/";

  const url = ARTWORK_PROFILE_API + "94098448";

  const resp = await fetch(url);
  const info = await resp.json();

  const response = {
    statusCode: 200,
    body: JSON.stringify(info),
  };
  return response;
};
