# Shared Logic

The most basic use of Wasm is that we can develop functionality and run it anywhere we can find a Wasm runtime - which is essentially anywhere.

## How to experience this folder

### AssemblyScript
I've explored the field by starting out with the most familiar high-level language out of the bunch - AssemblyScript. I abandoned it.

### Wit-Bindgen
Next up, I wanted to go into the most recent iteration of the Wasm Component Model in the language with the strongest Wasm ecosystem - Rust with wit-bindgen. Turns out that this also has a good amount of limitations.

### Wasm-Bindgen with Wasm-Pack
Wasm-Bindgen is the precursor to wit-bindgen in that it allows the generation of bindings from another language into the memory-space of the guest-module. It therefore allows us to pass complex data types from JS to a Wasm-Module built in Rust and the other way around.

## WasmTime or Wasmer?
// TODO - Haven't yet found anything that I could universally compile such that I could fulfill the promise of running the code everywhere...
// TODO - Might make a case out of sharing code between different BE languages. There, wit-bindgen might actually be useful.

