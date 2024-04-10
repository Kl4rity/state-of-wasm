# WIT-Bindgen

## Rust Installation
Follow the instructions on the rustwasm book to get set up:
https://rustwasm.github.io/docs/book/game-of-life/setup.html

## Why?

Wit-Bindgen is capable of producing wasm modules which contain wit definitions. These would then have to have Host-Language bindings generated for them - such as with JCO for the JS ecosystem. We're actually getting a module though, not a component and JCO expects a component.

Using cargo component instead we could create WASM components -> but only for the wasm32-wasi target, not the wasm32-unknown-unknown target we'd need them to compile to to be usable in the web.

## Silver lining
Could be used to share logic across many backend implementations - but it's not as universal as I'd like it to be.

Abandoned.

# Process
1. wit-bindgen --target wasm32-unknown-unknown
2. wasm-tools component new ./target/wasm32-unknown-unknown/debug/rust.wasm -o rust-component.wasm
3. jco
