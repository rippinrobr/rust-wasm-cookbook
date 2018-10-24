extern crate cfg_if;
extern crate wasm_bindgen;

pub mod click;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}


// get_element_by_id is a helper function that gets the window, document and then
// the id
pub fn get_element_by_id(id: &str) -> Option<web_sys::Element> {
    let window = web_sys::window()?;
    match window.document() {
        Some(doc) => doc.get_element_by_id(id),
        None => {
            alert(&format!("No element found with id: {}", id));
            None
        }
    }
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct EvtElements {
    click_handler_btn_id: JsValue,
    click_handler_text_id: JsValue,
}

#[wasm_bindgen]
impl EvtElements {
    pub fn new(click_btn_id: &str, click_txt_id: &str) -> EvtElements { 
        EvtElements {
            click_handler_btn_id: JsValue::from_str(click_btn_id),
            click_handler_text_id: JsValue::from_str(click_txt_id),
        }
    }
}

impl EvtElements {
    fn to_string(&self) -> String {
        format!("\nThe app was started with the following element Ids\n--------------------------------------------------\n{:#?}\n--------------------------------------------------\n", self)
    }
}

#[wasm_bindgen]
pub fn init(ids: &EvtElements) {
    log(&ids.to_string());
    click::click_examples_init(
        ids.click_handler_btn_id.as_string().unwrap(),
        ids.click_handler_text_id.as_string().unwrap()
    );
}