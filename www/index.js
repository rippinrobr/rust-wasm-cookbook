import * as wasm from "wasmcookbook";

var elemIds  = wasm.EvtElements.new(
    "btn-rs-click",
    "btn-handler-space"
);

// setup js event handlers
document.getElementById("btn-js-click").addEventListener('click', wasm.js_click_event_handler);
document.getElementById("btn-del-click").addEventListener('click', () => {document.getElementById("btn-handler-space").innerText = "";});
wasm.init(elemIds);