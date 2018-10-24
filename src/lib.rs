extern crate cfg_if;
extern crate wasm_bindgen;

pub mod button;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct EvtElements {
    clickHandlerBtnId: JsValue,
    clickHandlerTextId: JsValue,
}

#[wasm_bindgen]
impl EvtElements {
    pub fn new(clickBtnId: &str, clickTxtId: &str) -> EvtElements { 
        EvtElements {
            clickHandlerBtnId: JsValue::from_str(clickBtnId),
            clickHandlerTextId: JsValue::from_str(clickTxtId),
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
    button::button_examples_init(
        ids.clickHandlerBtnId.as_string().unwrap(),
        ids.clickHandlerTextId.as_string().unwrap()
    );
}