window.onload = () => {
  let loc = window.location;
  let uri = "ws://" + loc.host + loc.pathname + "stream";

  const ws = new WebSocket(uri);

  ws.onmessage = function (evt) {
    let out = document.getElementById("output");
    out.innerHTML += evt.data + "<br>";
  };
};
