use std::io;
use std::cmp::Ordering;
use rand::Rng;
use colored::*;

// Current video : https://www.youtube.com/watch?v=n3bPhdiJm9I&list=PLai5B987bZ9CoVR-QEIN9foz4QCJ0H2Y8&index=5

fn main() {

    
    let mut choice:String = String::new(); 
    
    loop {
        println!("Welcome! What do you want to do? (write number to choose...)");
        println!("1. exit");
        println!("2. guess_game");
        println!("3. struct_project");

        io::stdin()
            .read_line(&mut choice)
            .expect("Failed to read line");
    
        let choice: u32 = match choice.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        if choice == 1 {
            break;
        } else if choice == 2 {
            guess_game();
        } else if choice == 3 {
            struct_project();
        }
    }
}

fn guess_game () {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    println!("The secret number is: {}", secret_number);

    loop {
        println!("Please input your guess...");
    
        let mut guess:String = String::new(); 
    
    
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");
    
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        
        println!("You guessed: {}", guess);
    
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("{}", "is too small!".red()),
            Ordering::Greater => println!("{}", "is too big!".red()),
            Ordering::Equal => {
                println!("{}", "is correct! You win!".green());
                break;
            },
        }
    }
}

fn print_project () {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);

    const SUBSCRIBER_COUNT: u32 = 100_000;

    let y = 5;
    println!("The value of y is: {}", y);
    let y = "six"    
    println!("The value of y is: {}", y);

    let tup = ("Let's Get Rusty!", 100_000);
    let (channel, sub_count) = tup;
    let sub_count = tup.1;

    let error_codes = [200, 400, 500];
    let not_found = error_codes[1];

    let mut counter = 0;
    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter;
        }
    }

    let mut iterations = 0;
    let res2 = do {
        loop {
            iterations += 1;
            let mut counter = 0;
            let result = loop {
                counter += 1;
                
                if counter == 10 {
                    break counter;
                }
            }
        }
    } while iterations < 11;

    for element in error_codes.iter() {
        println!("error code {}", element);
    }

    for number in 1..5 {
        println!("{}!", number)
    }
}

struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool
}

fn struct_project() {

    

}