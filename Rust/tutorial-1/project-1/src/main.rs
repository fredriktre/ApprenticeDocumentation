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
        test_one();
        add_numbers(10, 20);
    }
    {
        let number = { // this works, since the x + 1 is an expression, so it returns something. if it wasn't there, it would fail.
            let x = 3;
            x + 1 // this here should not have a semicolon ";", as it's an expression, and not a statement
        };
        println!("number: {}", number);

        println!("number is = {}", add_numbers_2(20, 10));
        println!("number is = {}", add_numbers_3(10, 15));
    }
}

// snake_case functions
fn test_one() {
    println!("this is a test function");
}

fn add_numbers(x:i32, y:i32) {
    println!("The sum is: {}", x + y);
}

fn add_numbers_2(x: i32, y:i32) -> i32 {
    x + y // returns value, as it's an expression.
}

fn add_numbers_3(x: i32, y:i32) -> i32 {
    let result = x + y;
    if result > 10 {
        return result - 10
    }
    result
}