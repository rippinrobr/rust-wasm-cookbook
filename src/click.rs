extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen]
pub fn js_click_event_handler(evt: web_sys::MouseEvent) {
    super::alert("This click handler function was wired up on the JS side");
    super::log(&format!("evt: {:#?}", evt));
}

pub fn click_examples_init(btn_id: String, txt_id: String) {
    
    match super::get_element_by_id(&btn_id) {
        Some(btn) => {        
            let btn_closure = Closure::wrap(Box::new(move |evt: web_sys::MouseEvent| {
                super::log("Hi from the handler");
                let txt = super::get_element_by_id(&txt_id)
                    .unwrap()
                    .dyn_into::<web_sys::HtmlElement>()
                    .map_err(|_| ())
                    .unwrap();
                txt.set_inner_text(&format!("this text was added by a handler written in rust. \nClicked at ({}, {})", evt.screen_x(), evt.screen_y()));
            }) as Box<FnMut(_)>);
                
            (btn.as_ref() as &web_sys::EventTarget)
                .add_event_listener_with_callback("click", btn_closure.as_ref().unchecked_ref())
                .unwrap();
             btn_closure.forget();
        },
        None => super::alert(&format!("No button found with the id {}", btn_id))
    };
}