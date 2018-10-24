extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

pub fn button_examples_init(btn_id: String, txt_id: String) {
    super::log("this is button_examples_init!");
    let document = get_document().unwrap();
    let btn = document.get_element_by_id(&btn_id).unwrap();

    let doc = document.clone();
    let btn_closure = Closure::wrap(Box::new(move |_: web_sys::MouseEvent| {
        super::log("Hi from the handler");
        let txt = doc.get_element_by_id(&txt_id).unwrap();
        //txt
    }) as Box<FnMut(_)>);

    // wires up the handler so that when a click event occurrs it calls our closure
    (btn.as_ref() as &web_sys::EventTarget)
        .add_event_listener_with_callback("click", btn_closure.as_ref().unchecked_ref())
        .unwrap();
    btn_closure.forget();
}

fn get_document() -> Option<web_sys::Document> {
    let window = web_sys::window()?;
    window.document()
}

