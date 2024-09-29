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

##### ============================
steps:

1) browser check's if site IP is present in
     ---> local DNS cache ( in browser)
    if (yes)==> send direct request to that IP

2) --> OS DNS cache    ( In OS )
3) --> OS DNS Resolver ( In OS ) --> 
   1) Root server ( determines high level domain )
   2) HLD domain server ( determines DNS server )
   3) DNS server ( determines IP of domain i.e. site)
4) --> DNS Resolver --> send request Browser 
