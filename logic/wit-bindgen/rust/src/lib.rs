// Use a procedural macro to generate bindings for the world we specified in
// `host.wit`
wit_bindgen::generate!({
    // the name of the world in the `*.wit` input file
    world: "trading",
});

const ASSETS: [&str; 3] = ["BTC", "ETH", "DOGE"];

// Define a custom type and implement the generated `Guest` trait for it which
// represents implementing all the necessary exported interfaces for this
// component.
struct MyHost;

impl Guest for MyHost {
    fn validate(trade: Trade) -> bool {
        let is_jonas = trade.user == "Jonas";
        let is_positive = trade.amount > 0.0;
        let is_tradable = ASSETS.contains(&&*trade.asset);
        is_jonas && is_positive && is_tradable
    }
}

// export! defines that the `MyHost` struct defined below is going to define
// the exports of the `world`, namely the `run` function.
export!(MyHost);
