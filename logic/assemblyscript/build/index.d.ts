/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * src/index/add
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function add(a: number, b: number): number;
/**
 * src/index/appendWasmToString
 * @param inputString `~lib/string/String`
 * @returns `~lib/string/String`
 */
export declare function appendWasmToString(inputString: string): string;
/**
 * src/index/validateTrade
 * @param ptr `i32`
 * @param len `i32`
 * @returns `bool`
 */
export declare function validateTrade(ptr: number, len: number): boolean;
