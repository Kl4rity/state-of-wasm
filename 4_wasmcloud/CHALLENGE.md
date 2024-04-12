# Challenges
## Make Rust and Go talk with each other

Right now, the demo just uses two separately deployed Wasm components - both independently reacting to Hello-World.
To do anything useful, we will want them to talk to each other. Make it so! 

There are two main ways to do so in WasmCloud:
* [Actor<>Actor Calls](https://wasmcloud.com/docs/developer/communication/actor-to-actor-calls)
* [WasmCloud Messaging](https://github.com/wasmCloud/interfaces/tree/main/messaging)

Good luck.
