/* tslint:disable */
import * as wasm from './wasmcookbook_bg';

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}
/**
* @param {any} arg0
* @returns {void}
*/
export function js_click_event_handler(arg0) {
    return wasm.js_click_event_handler(addHeapObject(arg0));
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_alert_cd6800cbaf5e4b92(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    alert(varg0);
}

const __wbg_log_f64ed948855cf078_target = console.log;

export function __wbg_log_f64ed948855cf078(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_log_f64ed948855cf078_target(varg0);
}

let cachedTextEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}
/**
* @param {EvtElements} arg0
* @returns {void}
*/
export function init(arg0) {
    return wasm.init(arg0.ptr);
}

const __widl_f_get_element_by_id_Document_target = Document.prototype.getElementById || function() {
    throw new Error(`wasm-bindgen: Document.prototype.getElementById does not exist`);
};

const stack = [];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

        return val.obj;

    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);

    const val = __widl_f_get_element_by_id_Document_target.call(getObject(arg0), varg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

const __widl_f_add_event_listener_with_callback_EventTarget_target = EventTarget.prototype.addEventListener || function() {
    throw new Error(`wasm-bindgen: EventTarget.prototype.addEventListener does not exist`);
};

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

export function __widl_f_add_event_listener_with_callback_EventTarget(arg0, arg1, arg2, arg3, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        __widl_f_add_event_listener_with_callback_EventTarget_target.call(getObject(arg0), varg1, getObject(arg3));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __widl_instanceof_HTMLElement(idx) {
    return getObject(idx) instanceof HTMLElement ? 1 : 0;
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
    throw new Error(`descriptor for id='${id}' not found`);
}

const __widl_f_set_inner_text_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'innerText').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'innerText').set does not exist`);
};

export function __widl_f_set_inner_text_HTMLElement(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __widl_f_set_inner_text_HTMLElement_target.call(getObject(arg0), varg1);
}

export function __widl_instanceof_Window(idx) {
    return getObject(idx) instanceof Window ? 1 : 0;
}

const __widl_f_document_Window_target = function() {
    return this.document;
};

export function __widl_f_document_Window(arg0) {

    const val = __widl_f_document_Window_target.call(getObject(arg0));
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __wbg_newnoargs_f3005d02efe69623(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

const __wbg_call_10738551fb4d99e4_target = Function.prototype.call || function() {
    throw new Error(`wasm-bindgen: Function.prototype.call does not exist`);
};

export function __wbg_call_10738551fb4d99e4(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_call_10738551fb4d99e4_target.call(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

function freeEvtElements(ptr) {

    wasm.__wbg_evtelements_free(ptr);
}
/**
*/
export class EvtElements {

    static __wrap(ptr) {
        const obj = Object.create(EvtElements.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeEvtElements(ptr);
    }

    /**
    * @param {string} arg0
    * @param {string} arg1
    * @returns {EvtElements}
    */
    static new(arg0, arg1) {
        const [ptr0, len0] = passStringToWasm(arg0);
        const [ptr1, len1] = passStringToWasm(arg1);
        try {
            return EvtElements.__wrap(wasm.evtelements_new(ptr0, len0, ptr1, len1));

        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);
            wasm.__wbindgen_free(ptr1, len1 * 1);

        }

    }
}

export function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1) return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
}

function dropRef(idx) {

    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];

    obj.cnt -= 1;
    if (obj.cnt > 0) return;

    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

export function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

export function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number') return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

export function __wbindgen_is_null(idx) {
    return getObject(idx) === null ? 1 : 0;
}

export function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
}

export function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    if (typeof(v) === 'boolean') {
        return v ? 1 : 0;
    } else {
        return 2;
    }
}

export function __wbindgen_is_symbol(i) {
    return typeof(getObject(i)) === 'symbol' ? 1 : 0;
}

export function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string') return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
}

export const __wbindgen_cb_forget = dropRef;

export function __wbindgen_closure_wrapper16(a, b, fi, di, _ignored) {
    const f = wasm.__wbg_function_table.get(fi);
    const d = wasm.__wbg_function_table.get(di);
    const cb = function(arg0) {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b, addHeapObject(arg0));

        } finally {
            this.a = a;
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

