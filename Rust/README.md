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
        A piece of functionality