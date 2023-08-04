Just as a heads up, I did not make this code, nor is it complete, nor do I understand how it works.
I followed the tutorial just so I knew I was actually listening basically.
I might make it work one day, but currently I know too little when it comes to rust and also crates.

https://youtu.be/hzSsOV2F7-s?t=277 finished up to this point, in which I wrote this.

from what I get about http, http servers and such

there is a bunch of protocols and such that makes it possible for 2 computers to talk to eachother through a Tcp.
To make it possible to receive and send bytes, you have to set up a kind of listener, that directs that "connection"
onto its own thread (which I also don't know how works lmao), to make sure it's ready for the next one.