# Rust README
For Rust to work, you should go to https://youtu.be/T_KrYLW4jw8 and follow that tutorial.
As long as you aren't using a build of mine, where you would only need to use Windows (since it's what I would compile it on.)

    let x = 4; // implicit type | compiler decides

    let x:u32 // not implicit

    let x = 4;
    println!("x is: {}", x) // for embedding. x will be put into {}

    let mut x = 4; | For making values mutable, can also "recreate" it. So just repeating let x = NEW_VALUE
    println!("x is: {}", x);
    x = 5;
    println!("x is: {}", x);

    { this is a new scope
        I can use the "parent" variables, but the parent can't use this scope's variable. So name shadowing is possible
        let x = 2;
        println!("x is: {}", x);
    }

    const SECONDS_IN_MINUTE:u32 = 60; | This is a constant, you have to give it a value and type for it to work.
    println!("there are {} seconds in a minute", SECONDS_IN_MINUTE);

 Here are a couple data types: 

 Scalar data type:
    1. Integer (uint, int)
    2. floating-point
    3. boolean
    4. character/char
 
 Compound data type:
    1. array
    2. tuple
     
 Here are some examples:

    integers:
        let x: i32 = 2; | This is the default number value
        Other int types are:
            1. i8
            2. i16
            3. i32 (mentioned)
            4. i64
            5. i128
        let x: u32 = 2 | This is an unsigned integer. 
        u8 can represent values of 0 -> 2^8 -1
        i8 can represent values of -2^7 -> 2^7 -1

    floats: 
        let floating_point: f64 = 10.9; | This is the default for a floating point, which is essentially decimal numbers
        the two types are: 
            1. f32
            2. f64 (mentioned)

    boolean:
        let true_or_false : bool = true; | this is the boolean. Can also use 1 or 0

    character/char:
         let letter: char = 'a'; | this is a singular character.

    tuple:
        let tup: (i32, bool, char) = (1, true, 's'); | this is a tuple
        let tup: (i8, bool, char) = (1, true, 's'); | this is a different tuple, and those two tuples are not the same value. As 
        one value within is different, making them, well, different.

        println!("{}", tup); | this won't work!
        println!("{}", tup.0); | this will work!
        The reason number 2 here works, is because the compiler won't understand what you mean when you reference the whole 
        tuple. At least not with the default formatter.

        let mut tup: (i32, bool, char) = (1, true, 's');
        tup.0 = 10; | this works
        println!("{}", tup,0); 
        tup = (5, false, 'a'); | this also works, but it's rather stupid. As the top value is never read. Avoid this
        println!("{}", tup,0);
    
    array: 
        let arr = [1, 2, 3, 4, 5]; | This is an array, it's type is defined by content. Cannot push to the array. All values 
        must be of the same type.

        arr[0] | Accessing first value, this would be 1

        let mut arr = [1, 2, 3, 4, 5]
        arr[4] = 3 | this works since it's a mutable array
        println!("{}", arr[4])

        let arr: [i32; 5] = [1, 2, 3, 4, 5] | This is how you make the value have spesific type
        let arr: [i32; 5]; | This doesn't work
        let arr: [i32; 5] = [] | This doesn't work either. You need some values.

    Heads up! You need to be careful with values!
        let x: u8 = 4;
        let y: i32 = x | Even if the x is a integer, they are different types.


Comment on tutorial episode 5: From NorteX:
    For anyone interested, the Result() in Rust can be somewhat compared to a Promise inside JS, just not asynchronous. But 
    essentially it means it can be successful (and return Ok, or in JS .then) or unsuccessful (and return an Err, or in JS .
    catch).

Prelude: 
    The prelude is the list of things that Rust automatically imports into every Rust program. It's kept as small as 
    possible, and is focused on things, particularly traits, whic are used in almost every single Rust program.

Crate:
    The name for libraries.

Module:
    A piece of functionality.

    let x: u8 = 9; // range = 0 - 255
    let y: i8 = 10; // range =  -128 - 127
    let z = x + y // This won't work, the types doesn't match! If they had the same type, then it works.
    let x: u8 = 256; | Won't work, it's an overflowing literal! Same will happen if this is due to some arithmetic.
    let x = 255.0f32; | This works. We are basically forcing the variable to treat the value as whatever is there.
    let x = 255.0_f32; | This also works.
    let x = 124_000i64; | This also works, will return large number.
    let x = 124_000 as i64; | This also works..
     let x = 120 as i8;
     let y:u8 = 64;

     let z = x / (y as i8); | this works!
     let z = x / y as i8; | this also works!
    let x = (i32::max as i64) + 1;
    let z:i32 = x as i32 | this overflows

the different operands that exist are:
"<" for smaller than
">" for larger than
"<=" for smaller than or equal
">=" for larger than or equal
"!=" for not equal
"==" for equal
"&&" for and
"||" for or
"!" for is not (example: !false would be true)

you got to use the same type on both sides of an integer. Convert if needed.

When it comes to garbage collection, it does that automatically when scope is no longer in use.
Say, you have a function with let x = 2;, x will use up a spot in the stack. When the function is done,
the x is deleted. Stack only accepts static values.

let string = String::from("hello"); | This is a dynamic String. And since it is, we store it on the heap.
In the heap, we need to search through the heap and find enough space for whatever we need to store.
The stack just places it on the top. (FILO, or First In Last Out, describes that.).

When storing in heap, we store the value in heap, and the pointer in stack.
When you want to get that value, you need to use the pointer to find the value in the heap, then you can access it.

## That's it for now.

For future learning: https://www.youtube.com/watch?v=OX9HJsJUDxA&list=PLai5B987bZ9CoVR-QEIN9foz4QCJ0H2Y8

On https://www.youtube.com/watch?v=2V0JaMVjzws&list=PLai5B987bZ9CoVR-QEIN9foz4QCJ0H2Y8&index=3 right now!

--- Ownership rules ---
1. Each value in Rust has a variable that's called its owner.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value will be dropped

--- The Rules of References ---
1. At any given time, you can have either one mutable reference or any number of immutable references.
2. References must always be valid.