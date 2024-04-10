## Assemblyscript

"AssemblyScript compiles a variant of TypeScript (basically JavaScript with types) to WebAssembly using Binaryen. It generates lean and mean WebAssembly modules while being just an npm install away."
- https://github.com/AssemblyScript/assemblyscript

### Getting Started
First up, you need to install the Assemblyscript compiler:
```sh
npm install -g assemblyscript
```
From here on out, you can compile *.ts files to *.wasm. We will invoke the compiler using a couple of flags
to make our lives easier.

```sh
asc <your-file>.ts -o <your-file>.wasm -t <your-file>.wat -b
```

* -o specifies the file we want to compile into
* -t tells the compiler that we'd like to have a *.wat file to inspect the compiled wasm code in a readable format
* -b tells the compiler that we'd like to have bindings for JS and TS generated.

For convenience - I've encapsulated all of the above in the `npm compile` command.
