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
        let mut input = String::new();

        println!("Type a number");
        io::stdin().read_line(&mut input).expect("expected a number");
        let int_input : i64 = input.trim().parse().unwrap();

        println!("{}", int_input + 2);
    }
    {
        let food = "cookie";

        if food == "cookie" {
            println!("is cookie");
        } else if food == "fruit" {
            println!("is fruit")
        } else {
            println!("{} is not cookie or fruit", food)
        }
    }
    {
        
    }
}