# Shared Logic

The most basic use of Wasm is that we can develop functionality and run it anywhere we can find a Wasm runtime - which is essentially anywhere.

Each folder in this directory can be started with...
```bash
npm start
```

## How to experience this folder
### AssemblyScript
I've explored the field by starting out with the most familiar high-level language out of the bunch - AssemblyScript. Unfortunately, it's binding-generation ecosystem [as-bind](https://github.com/torch2424/as-bind) has mostly been abandoned and it is
therefore only really useful for basic Wasm usage as of today.

### Wasm-Bindgen with Wasm-Pack
Wasm-Bindgen can be understood as a tight coupling between the Rust and the JS Ecosystem. Part of its ecosystem are packages like js-sys and web-sys to take care of the boilerplate for interacting with JS as well as the Browser.
It has been around for a while and is quite mature. There is an alternative nowadays which is wit-bindgen. It allows the generation of bindings from another language into the memory-space of the guest-module.

### Wit-Bindgen
As of the day of writing, WIT is not as mature as wasm-bindgen is, but it is supported well-enough in a handful of languages (Rust, JS/TS, Python, Go). 
Whilst, with wit-bindgen, you only need one binding step, since wit-bindgen goes towards WIT as an abstraction and the host-language will have to generate its own bindings. 

## Which runtime? 
This repository treats the Wasm runtimes as mostly interchangeable as of today.
