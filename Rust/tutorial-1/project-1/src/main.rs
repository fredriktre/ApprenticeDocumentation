use std::io;

fn main() {
    {
        let mut input = String::new();
    
        println!("type something");
        io::stdin().read_line(&mut input).expect("failed to read line"); // This is for making console inputs.
        // got the module -> called function -> passing mutable reference -> catching errors
    
        println!("{}", input);
    }
    {
        let x: u8 = 9; // range = 0 - 255
        let y: i8 = 10; // range =  -128 - 127

        // let z = x + y // This won't work, the types doesn't match! If they had the same type, then it works.
        // let x: u8 = 256; | Won't work, it's an overflowing literal! Same will happen if this is due to some arithmetic.

    }
}