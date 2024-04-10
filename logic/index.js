import loader from "https://cdn.jsdelivr.net/npm/@assemblyscript/loader/index.js";
import * as component from "/wit-bindgen/js/build/rust-component.js";
import * as wasmpack from "/wasm-pack/trading/pkg/trading.js";

(async () => {
  console.log("Instantiating...");

  const instance = await loader.instantiate(fetch("/assemblyscript/build/index.wasm"));

  console.log(`2 + 5 in Wasm are: ${instance.exports.add(2,5)}`)

  console.log("Appending to String...");
  const ptrInputString = instance.exports.__newString("Servus ")
  const ptrOutputString = instance.exports.appendWasmToString(ptrInputString);
  const outputsString = instance.exports.__getString(ptrOutputString);
  console.log(`Concatenated String is: ${outputsString}`);

  console.log("Instantiating wasm-pack module...");
  window.wasmpack = wasmpack;
  // Instantiates the module
  // https://stackoverflow.com/questions/60496032/passing-strings-between-rust-and-javascript-when-building-with-wasm-pack
  await wasmpack.default();

  window.component = component;
})();
