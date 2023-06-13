fn main() {

    // let x = 4; // implicit type | compiler decides
    // let x:u32 // not implicit

    // let x = 4;
    // println!("x is: {}", x) // for embedding. x will be put into {}

    // let mut x = 4; | For making values mutable, can also "recreate" it. So just repeating let x = NEW_VALUE
    // println!("x is: {}", x);

    // x = 5;
    // println!("x is: {}", x);

    // { // this is a new scope
        // I can use the "parent" variables, but the parent can't use this scope's variable. So name shadowing is possible
    //     let x = 2;
    //     println!("x is: {}", x);
    // }

    // const SECONDS_IN_MINUTE:u32 = 60; | This is a constant, you have to give it a value and type for it to work.
    // println!("there are {} seconds in a minute", SECONDS_IN_MINUTE);
}