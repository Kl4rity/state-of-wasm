// We can see that there are new data types that we have not seen before. 
export function add(a: i32, b: i32): i32 {
  return a + b;
}

// We are already using utility functions provided by AssemblyScript here!
// All interactions using data types that cannot be passed (anything BUT numbers)
// must be serialized into memory and read from there in the wasm context.
// https://github.com/AssemblyScript/assemblyscript/blob/b640ff25e40edc98f599f2493ae4a0d40e69cb8e/lib/loader/index.js#L137
export function appendWasmToString(inputString: string): string {
  return inputString + "... from WASM!";
}

// We were able to use strings because AssemblyScript already offers convenience functions for writing and parsing them to and from memory.
// Things become more difficult once we want to do more domain-y kinds of things.
export function validateTrade(ptr: i32, len: i32): boolean {
  const trade = parseStringIntoObject(String.UTF8.decodeUnsafe(ptr, len));
  return validate(trade);
}

function validate(trade: Trade): boolean {
  // TODO Actual validation
  return true;
}

function parseStringIntoObject(utf8string: string): Trade {
  // TODO Actual parsing
  return new Trade("Hans Gruber", 12.43942348);
}

class Trade {
  amount: f64
  user: string

  constructor(user: string, amount: f64) {
    this.user = user;
    this.amount = amount;
  }
}

// as-bindgen is no longer being maintained - so looking towards the Wasm component model is the next-best step.
// https://component-model.bytecodealliance.org/language-support/javascript.html
// https://www.youtube.com/watch?v=ChBGAZRU1qs
//
// JCO is used for generating the bindings to the WIT Wasm component - we can't actually propagate AssemblyScript to that level.
//
// Start out with this:
// https://rustwasm.github.io/docs/book/game-of-life/hello-world.html
