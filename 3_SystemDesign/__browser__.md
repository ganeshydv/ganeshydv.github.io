
The process of a browser making a request and establishing a connection with a server can be broken down into the following steps:

1. **URL**: The process begins with the URL of the website you want to visit.
2. **DNS Lookup**: The browser performs a DNS lookup to convert the domain name into an IP address. This involves several steps:
   - Checking the DNS cache in the browser.
   - If not found in the browser cache, checking the OS cache.
   - If not found in the OS cache, making a request to the DNS resolver.
   - The DNS resolver then makes a request to the DNS server.
3. **TCP Connection**: Once the IP address is known, the browser establishes a TCP connection with the server. This involves an SSL and TLS handshake.
4. **Connection Established**: After the handshake is successful, the connection is established and the browser can start sending requests to the web server.

##### ==============================
     Url --> DNS look up --> 1) DNS cache (browser cache) 
                        2) OS cache
        --> DNS resolver --> DNS server--> browser
        --> TCP connection with server  ( SSl + TLC handshake)--> web server
        --> connection establishes



                       
