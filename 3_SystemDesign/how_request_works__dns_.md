
The process of a browser making a request and establishing a connection with a server can be broken down into the following steps:

1. **URL**: The process begins with the URL of the website you want to visit.
2. **DNS Lookup**: The browser performs a DNS lookup to convert the domain name into an IP address. This involves several steps:
   - Checking the DNS cache in the browser.
   - If not found in the browser cache, checking the OS cache.
   - If not found in the OS cache, making a request to the DNS resolver.
   - The DNS resolver then makes a request to the DNS server.
3. **TCP Connection**: Once the IP address is known, the browser establishes a TCP connection with the server. This involves an SSL and TLS handshake.
4. **Connection Established**: After the handshake is successful, the connection is established and the browser can start sending requests to the web server.

##
```
     Url --> DNS look up --> 1) DNS cache (browser cache) 
                             2) OS cache
        --> DNS resolver --> DNS server--> browser
        --> TCP connection with server  ( SSl + TLC handshake)--> web server
        --> connection establishes
```


# DNS Lookup Process

The process of a browser performing a DNS lookup to resolve a domain name into an IP address can be broken down into the following steps:

1. **Local DNS Cache**: The browser first checks if the IP address for the site is present in the local DNS cache.
   - If the IP address is found, the browser sends a direct request to that IP address.

2. **OS DNS Cache**: If the IP address is not found in the local DNS cache, the browser checks the OS DNS cache.

3. **OS DNS Resolver**: If the IP address is not found in the OS DNS cache, the browser uses the OS DNS resolver. The resolver goes through the following steps:
   - Contacts the Root server to determine the high-level domain.
   - Contacts the high-level domain server to determine the DNS server.
   - Contacts the DNS server to determine the IP address of the domain (i.e., the site).

4. **Send Request**: Once the IP address is known, the DNS resolver sends a request to the browser.

##
steps:
```
1) browser check's if site IP is present in
     ---> local DNS cache ( in browser)
    if (yes)==> send direct request to that IP

2) --> OS DNS cache    ( In OS )
3) --> OS DNS Resolver ( In OS ) --> 
   1) Root server ( determines high level domain )
   2) HLD domain server ( determines DNS server )
   3) DNS server ( determines IP of domain i.e. site)
4) --> DNS Resolver --> send request Browser 
```
                       
