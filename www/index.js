import * as wasm from "wasmcookbook";

var elemIds  = wasm.EvtElements.new(
    "btn-rs-click",
    "btn-handler-space"
);

// console.log(wasm);

wasm.init(elemIds);