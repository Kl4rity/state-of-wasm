# Wasm Bindgen - with wasm-pack

Can create interfaces for JS, but still not "widening" the flow of data types between JS and Wasm. The validate() function only accepts an unsigned integer, aka a Pointer, instead of a normal JS object or an instance of the Trade().

Additional moves such as serde-wasm-bindgen might be required at this stage.

https://github.com/RReverser/serde-wasm-bindgen

## Tooling for web
* js-sys
* web-sys
