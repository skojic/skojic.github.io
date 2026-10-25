// Sends every request on www.srdjankojic.com to the same path and query on srdjankojic.com, permanently.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.hostname = "srdjankojic.com";
    url.port = "";
    return Response.redirect(url.toString(), 301);
  },
};
