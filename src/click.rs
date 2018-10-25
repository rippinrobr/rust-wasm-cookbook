extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;


// js_click_event_handler is called by the js code in a more 
// 'tradiitional event listerner approach. It will popup an
// alert dialog and display the click stats
#[wasm_bindgen]
pub fn js_click_event_handler(evt: web_sys::MouseEvent) {
    super::alert(&format!("[js handler]\n{:#?}", Click::new(evt)));
}


// click_examples_init is called from the init() function in src/lib.rs 
// it is responsible for registering a click event handler. If there is no
// element found with the given id, then an alert button is displayed with
// an error message
pub fn click_examples_init(elem_id: String, txt_id: String) {
    match super::get_element_by_id(&elem_id) {
        Some(btn) => register_click_handler(btn.as_ref() as &web_sys::EventTarget, txt_id),
        None => super::alert(&format!("No element was found with the id {}", elem_id)),
    };
}

// register_click_handler first creates the closure that will handle the event
// then it adds the listener to the button
fn register_click_handler(btn: &web_sys::EventTarget, txt_id: String) {
    let btn_closure = Closure::wrap(Box::new(move |evt: web_sys::MouseEvent| {
        set_inner_text(&txt_id, evt, "[rust handler]");
    }) as Box<FnMut(_)>);

    btn.add_event_listener_with_callback("click", btn_closure.as_ref().unchecked_ref())
        .unwrap();

    btn_closure.forget();
}

// set_inner_text is called in the event handler. First, it gets the element provided
// next, it creates a Click struct so that I could display the properties of the event
fn set_inner_text(id: &str, evt: web_sys::MouseEvent, label: &str) {
    let txt = super::get_element_by_id(id)
        .unwrap()
        .dyn_into::<web_sys::HtmlElement>()
        .map_err(|_| ())
        .unwrap();

    let stats = Click::new(evt);
    txt.set_inner_text(&format!("{} \n {:#?}", label, stats));
}

// Used to store the values from the MouseEvent so I can show the
// the user that the rust handler did get the correct event
#[derive(Debug)]
struct Click {
    screen_x: i32,
    screen_y: i32,
    offset_x: i32,
    offset_y: i32,
    alt_key: bool,
    ctrl_key: bool,
    shift_key: bool,
    meta_key: bool,
    button_pressed: i16,
}

impl Click {
    // new - creates a new Click struct with the
    // values from the given event
    fn new(evt: web_sys::MouseEvent) -> Click {
        Click {
            screen_x: evt.screen_x(),
            screen_y: evt.screen_y(),
            offset_x: evt.offset_x(),
            offset_y: evt.offset_y(),
            alt_key: evt.alt_key(),
            ctrl_key: evt.ctrl_key(),
            shift_key: evt.shift_key(),
            meta_key: evt.shift_key(),
            button_pressed: evt.button(),
        }
    }
}

