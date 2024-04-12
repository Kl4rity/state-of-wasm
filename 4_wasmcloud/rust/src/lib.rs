wit_bindgen::generate!({
    world: "hello",
    exports: {
        "wasi:http/incoming-handler": HttpServer,
        world: HttpServer,
    },
});

use exports::wasi::http::incoming_handler::Guest as OtherGuest;
use wasi::http::types::*;

struct HttpServer;

impl OtherGuest for HttpServer {
    fn handle(_request: IncomingRequest, response_out: ResponseOutparam) {
        let response = OutgoingResponse::new(Fields::new());
        response.set_status_code(200).unwrap();
        let response_body = response.body().unwrap();
        response_body
            .write()
            .unwrap()
            .blocking_write_and_flush(b"Hello, from Rust!\n")
            .unwrap();
        OutgoingBody::finish(response_body, None).expect("failed to finish response body");
        ResponseOutparam::set(response_out, Ok(response));
    }
}

impl Guest for HttpServer {
    fn greet() -> String {
        "Hello, from Rust!\n".to_string()
    }
}

