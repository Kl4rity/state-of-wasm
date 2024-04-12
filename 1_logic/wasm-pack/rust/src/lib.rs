use wasm_bindgen::prelude::*;

const ASSETS: [&str; 3] = ["BTC", "ETH", "DOGE"];

#[wasm_bindgen]
pub struct Trade {
    user: String,
    asset: String,
    amount: f32,
}

#[wasm_bindgen]
impl Trade {
    #[wasm_bindgen(constructor)]
    pub fn new(user: String, asset: String, amount: f32) -> Trade {
        Trade { user, asset, amount }
    }
}

#[wasm_bindgen]
pub fn validate(trade: Trade) -> bool {
    let is_jonas = trade.user == "Jonas";
    let is_tradable = ASSETS.contains(&&*trade.asset); 
    let is_positive = trade.amount > 0.0;

    is_jonas && is_positive && is_tradable
}

