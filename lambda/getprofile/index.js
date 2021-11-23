const fetch = require("node-fetch");

const ARTWORK_PROFILE_API = "https://www.pixiv.net/ajax/illust/";

exports.handler = async (event) => {
  const url = ARTWORK_PROFILE_API + event.pathParameters.artworkId;

  const resp = await fetch(url);
  const info = await resp.json();

  const response = {
    statusCode: 200,
    body: JSON.stringify(info),
  };
  return response;
};
