use std::io;
use std::cmp::Ordering;
use rand::Rng;
use colored::*;

// Current video : https://www.youtube.com/watch?v=n3bPhdiJm9I&list=PLai5B987bZ9CoVR-QEIN9foz4QCJ0H2Y8&index=5

fn main() {

    
    let mut choice:String = String::new(); 
    
    let mut active = true;

    while active == true {
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
            active = false;
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
    let y = "six";
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
    };

    let mut iterations = 0;
    let res2 = while iterations < 11 {
        iterations += 1;
        let mut counter = 0;
        let result = loop {
            counter += 1;
            
            if counter == 10 {
                break counter;
            }
        };
    };

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

// struct Color(i32, i32, i32); 


fn struct_project() {

    struct_project_1();
    struct_project_2();

}

fn struct_project_1() {
    let mut user1 = User {
        email: String::from("bogdan@mail.com"),
        username: String::from("bogdan123"),
        active: true,
        sign_in_count: 1
    };

    let name = user1.username;
    user1.username = String::from("wallace123");

    let user2 = struct_project_1_build_user(
        String::from("kyle@mail.com"),
        String::from("kyle123")
    );

    let user3 = User {
        email: String::from("james@mail.com"),
        username: String::from("james123"),
        ..user2
    };
}

fn struct_project_1_build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1
    }
}

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn struct_project_2() {
    let rect = Rectangle {
        width: 30,
        height: 50
    };

    let rect1 = Rectangle {
        width: 20,
        height: 40
    };

    let rect2 = Rectangle {
        width: 40,
        height: 50
    };
    
    let rect3 = Rectangle::square(25);

    println!("rect can hold rect1: {}", rect.can_hold(&rect1));
    println!("rect can hold rect1: {}", rect.can_hold(&rect2));

    println!("rect: {:#?}", rect);

    println!(
        "The area of the rectangle is {} square pixels.",
        rect.area()
    );
}

enum IpAddrKind {
    V4(String),
    V6(String),
}

enum Message {
    Quit,
    Move { x: i32, y: i32},
    Write(String),
    ChangeColor(i32, i32, i32)
}

impl Message {
    fn some_function() {
        println!("Let's Get Rusty!")
    }
}

struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

fn enum_project() {
    let localhost = IpAddrKind::V4(127, 0, 0, 1),
}

fn route(ip_kind: IpAddrKind) {}