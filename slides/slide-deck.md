---
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

![bg left:40% 80%](https://upload.wikimedia.org/wikipedia/commons/1/1f/WebAssembly_Logo.svg)

# **Web Assembly**

What is it and how relevant is it to my job?

---

# What I have planned
- History and "Levels of WASM" Hands-on on each Level

Style-Note:
--> Use Achievement-Unlocked jokes throughout the journey w/ examples.

---

# History - JS

---

# History - Emscripten

---

# History - asm.js

* 2013 Mozilla Firefox asm.js
** Developed in an effort to make gaming on the web better
** Subset of JS with more rigid rules to make it easy to optimise
** Compiling C to a Subset of JS while retaining much better performance than JS
** "Using JS as a VM"
** Proved foundational feasibility
*** We can run C / C++ on the web! Unreal Engine 3 in the browser!
*** It's actually (predictably) fast (enough)!

NOTES:
- Being built for the web.
-- Async loading
-- Caching compilation
-- Gzipping

Uses JS isolation. No additional sandbox.

"Help the interpreter do it's job better."
"Avoid heap allocations because they need to be GCd"

Examples: Figma used asm.js (or is it WebAssembly?)
https://www.figma.com/blog/building-a-professional-design-tool-on-the-web/

AutoCAD, Photoshop, Unity, Earth

Compute-intensive sub-tasks:
* Codecs 
* compression
* inference
* Encryption
* filterskj

--> Still JS
--> Involves the JS JIT

"Near native performance is the WHOLE POINT"

Stream compilation for fast TTI.
Stack based because it should be portable / ubiquitous. Also has smaller byte code.
Sandboxing has to be a default first-class citizen. Bytecode needs to be sandboxed BUT extendable - provide foreign functions.

Why not use existing Bytecodes / VMs?
* Not optimized for the delivery method via Web
* JVM bakes in a lot of functionality - optimised for Java. Not agnostic.
* Cannot opt out of memory management.
* Have to map source-language to the nuances of the VM you're shipping to.
* Graal has a WASM interpreter.
* WASM VM has no opinion

--> Is WASM still interpreted? First pass with initial optimisation level and then instantly highest level.

WASM Bytecode is actually an AST.
* Encodes well to Binary
** Makes it faste
** Encode and decode performance is great
** Allows parallel compilation
** Are language-agnostic

WASM is super lean.
* No opinions
* No GC - languages have to bring their own if they need one.
* No standard library
* Barely any built-in types - language has to bring it's own

WASM VM:
* Extremely fast VM starts - microseconds
* Extremely small memory footprint
* Fast Cleanup of linear memory chunk

https://www.youtube.com/watch?v=2GSlCFCuN8U

* Calls between Host and Guest are expensive - heavy computation inside of it can be a massive performance gain!

---

# History - Emscripten

* Project in the C / C++ Community
* Based on LLVM/clang
* Emulates POSIX operating system
* You can, more or less, run existing C++ codebases unaltered
** It's better if there's a nice JS wrapper around though

* Shoutout to Matthias Kreidl - great workshop running games in the browser using Emscripten

NOTES:
What we can do here already is:
- Image compression
- Face Detection
- Analyzing data client-side (download raw data)
- Limited Video Editing
- Leapfrogging web-standards - you can deliver low-level implementations (image codecs) without all browsers having to support it
- Decoding bgzipped data - web APIs can't do it

Already about 2x of native performance. Combine that with Worker Threads and you're golden.

Change note:
Going down to the Emscripten Repo - we can see that, only after a year or two of working on it, Mozilla started adding support for asm.js to the repo: https://github.com/emscripten-core/emscripten/blob/main/ChangeLog.md

Summary:
Getting existing code into the web.
Be faster in the web.

EDITOR'S NOTE: Taken from https://www.youtube.com/watch?v=vDFf8V9n6RM

---

EDITOR'S NOTE: Start from here: https://www.youtube.com/watch?v=smcN0Dvctac

* "Bringing the Web up to Speed with WebAssembly"

Emscripten existed even before asm.js -> use it as an example of the problem space

* Safety
** Memory model
** Managed Memory model
** Managed Memory doesn't allow for a lot of optimizations...
* Fast
** Managed runtimes don't allow for that much optimisations
** Low-Level code can do these optimisations and compile ahead of time
* Portability
** Native code is fast - but not portable
** Code targeting the web must be hardware and platform-independent to allow it to run consistently - wherever the browser runs.
* Compact
** It is repeatedly being transported over the network - needs to be really compact to do so.

Compare existing approaches for that at the time and where they suffer
* ActiveX
* NaCl
* PNaCl
* asm.js

* Wasm
** Abstraction over Hardware - not a programming language
** No built-in object model
** No idea how to do I/O
** Separate (linear) Memory
** Binary Encoding
*** Structured in such a way that compilation can be streamed
*** ... and parallelized

--> While the web is the primary motivation for Web-Assembly - nothing in it depends on the Web.
--> Initial version focuses on low-level languages - it is intended to grow in the future.

Highly contained - can only access what the instantiating runtime can access.

# History - Wasm

* 2015 Announcement of WASM
** asm amazed - further work was done.
** Instead of subsetting JS - separate ByteCode format
** TODO: Add what differentiates this from asm.js and what were the pillars of the design

NOTES:
- "Sub Process Sandboxing"

QUESTIONS:
- Is the Adobe CS in wasm?

---

# Level 1

Basic Web Assembly modules

- Isolated Instances
-- No outside access - everything 

---

# Level 1 - Extendend

* Emscripten
** Project to provide web-specific implementations of interfaces that C ecosystem libs depend Hands-on
"It even emulates an entire POSIX operating system, enabling programmers to use functions from the C standard library (libc)." - [Wikipedia](https://en.wikipedia.org/wiki/Emscripten)
** Unreal Engine in Brwoser
** Encryption and / or compression libraries
** Tools like SQLite

---

# Level 2

"From a new compile target -> to a new ecosystem."

-> Passing values between modules is not easy with WASM.
WHY is it not easy?

WIT - defines a world

Passing values by copy && resource types by reference

WASM Component model / packaging

* Introduce Package Registry
* Use-Cases:
** Shared Cross Cutting Concern libs
** Shared Business Logic Libs 
* Introduce different, ubiquitous WASM runtimes

Key concepts of Wit include:

* Defining interfaces in a language-neutral way, allowing WebAssembly modules written in different languages to communicate more easily.
* Enabling WebAssembly modules to interoperate without needing to know about each other's memory layout or binary representation.
* Potentially allowing WebAssembly modules to interact with host functions and APIs without relying on JavaScript glue code, improving performance and reducing module size.

WIT hasn't fully arrived. We're still stuck with knowing about the memory layout of the target languages or using low-level languages.

---

# Level 3 

If WASM modules cannot access surrounding systems, they require quite extensive wrappers for usual tasks.

TODO: What problem does this solve and what does it enable?

Deploying applications compiled to wasm:

TODO: Which advantages does that have?

* Small footprint and fast startup make it great for Serverless
* Sandboxing is a wee bit too good - WASM essentially can't do anything.
** Get time
** Open files
** Create TCP connections
** ... different systems have different calls

How does WASM do system calls?
* It doesn't.
* Cannot reach out.
* We need to import host functions. Needs to be provided.
* Needed to implement them every time.

--> We standardize.

## In come WASI
* Should we just re-implenent POSIX?
** What about non-posix systems?
** Not super secure - not easily sandboxable.

* WASM Code should be treated as insecure. We need the host to offer fine-grained capabilities.

--> Custom set of host functions which enables new security model. WASI.

https://github.com/WebAssembly/WASI

## Here there be dragons.
* Not completed
* Doesn't yet account for network sockets
* Industry hasn't converged on the standard yet.

WASIX is an alternative which reimplements POSIX and therefore foregoes the enhanced security model.
* Only one runtime implenents WASIX.
* All of the runtimes implement WASI.
* WASMTime implements WASI

https://www.spinkube.dev/

---

# Level 4

Frameworks such as WASMCloud

* This is nuts. It does SO much at once that it is hard to comprehend.




Notes:
https://thenewstack.io/what-is-a-webassembly-component-the-ultimate-guide/

---

# Future
* What to do with GC?
** Multiple instances -> problem.
*** Inefficient
*** Larger

--> Host provides GC? PoC with Kotlin + Chrome.

* How about Threads?
** Everything is Signle Threaded - no parallelism.
*** Atomic privileges to WASM
** WASI Threads
*** How to schedule Threads etc.


---

# Summary

* Cool, lots unfolding
* Currently mostly useful for...
* Keep an eye out for...

