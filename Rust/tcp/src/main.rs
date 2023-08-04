use std::net::{TcpListener, TcpStream};
use std::thread;
use std::io::Read;
use std::io::Write;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:8080").unwrap()

    for stream: Result<TcpStream, Error> in listener.incoming() {
        match stream {
            Ok(stream: TcpStream) => {
                thread::spawn(move || {
                    handle_client(stream);
                });
            }
        }
    }
}

fn handle_client(mut stream: TcpStream) {

    loop {
        let mut read: [u8; _] = [0; 1028];
        match stream.read(buf: &mut read) {
            Ok(n: usize) => {
                if n == 0 {
                    break;
                }
                stream.write(buf: &read[0..n]).unwrap();
            }
            Err(err: Error) => {
                panic!("Error: {}", err);
            }
        }
    }

}