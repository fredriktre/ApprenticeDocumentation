use std::io;

fn main() {

    let NOK:f32 = 1;
    let YEN:f32 = 0.074;
    let USD:f32 = 10.72;

    let mut active_one:bool = true;
    let mut active_two:bool = false;
    let mut active_amount:bool = false;
    let mut choice_one:String = String::new();
    let mut choice_two:String = String::new();
    let mut choice_amount:String = String::new();

    while active_one == true {
        println!("Pick a currency to convert from!");
        println!("1. NOK");
        println!("2. YEN");
        println!("3. USD");
        io::stdin()
            .read_line(&mut choice_one)
            .expect("Need a currency!");
        
        let choice_one: u32 = match choice_one.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        if choice_one == 1 || choice_one == 2 || choice_one == 3 {
            active_one = false;
            active_two = true;
        } else {
            continue;
        }
    }

    while active_two == true {

        println!("Convert to what currency?");

        if choice_one == 1 {

            println!("1. YEN");
            println!("2. USD");

        } else if choice_one == 2 {
            
            println!("1. NOK");
            println!("2. USD");
    
        } else if choice_one == 3 {

            println!("1. NOK");
            println!("2. YEN");
    
        } else {

            println!("something went wrong");
            break;
    
        }

        io::stdin()
            .read_line(&mut choice_two)
            .expect("Need a currency!");
        
        let choice_two: u32 = match choice_two.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        if choice_two == 1 || choice_two == 2 {
            active_two = false;
            active_amount = true;
        } else {
            continue;
        }
    }

    while active_amount == true {

        println!("Pick an amount!");

        io::stdin()
            .read_line(&mut choice_amount)
            .expect("Need an amount!");
        
        let choice_amount: f32 = match choice_amount.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        if choice_amount != 0 {
            active_amount = false;
        } else {
            continue;
        }
    }

    let mut converted_value:f32 = 0;

    if choice_one == 1 && choice_two == 2 {

        converted_value = choice_amount / YEN;

    } else if choice_one == 1 && choice_two == 3 {

        converted_value = choice_amount / USD;

    } else if choice_one == 2 && choice_two == 1 {

        converted_value = choice_amount ;

    } else if choice_one == 2 && choice_two == 3 {

    } else if choice_one == 3 && choice_two == 1 {

    } else if choice_one == 3 && choice_two == 2 {

    }

    println!("Chosen amount in {} was {}", choice_one, choice_amount);
    println!("Chosen amount converted to {} was {}", choice_two, );

}