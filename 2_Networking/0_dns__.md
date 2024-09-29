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