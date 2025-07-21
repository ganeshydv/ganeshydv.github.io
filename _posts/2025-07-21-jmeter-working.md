---
layout: post
title: "JMeter : working"
date: 2025-07-21
categories: [testing, jmeter-md]
tags: [java, database, networking, concurrency]
author: "GGurkhude"
excerpt: "Learning notes on jmeter : working"
original_path: "JMeter/Jmeter.md"
---

## JMeter : working
1. open source
2. based on java
3. for performance testing only not functional testing
4. can use for 
    1. web apps (http/https)
    2. SOAP/REST
    3. FTP
    4. Database via JDBC 
## Installation steps
1. java
2.  download 

## GUI :

1. Template : for creating structure for web apps, dbs testing, etc.
2. logs
3. creare test
4. run 
5. stop
6. reports
7. tools : 1. heap dump 2. thread dump 3. function helper 4. html report

# Steps :
## 1. Create TestPlan : consider it as project
## 2. Thread Group 
1. Actions : what to do after sampler i.e. test faces error
2. Thread Properties : 
    1. how many threads  : no of request
    2. ramp-up time : total time to start all threads
    3. loop count : how many time test should run
## 3. Create Sampler : Test
- Add request details

## 4. Add Listners : for Results Report
- For Reports 
- check latency : when server starts sending reponse
- sample time : total time taken by request for response
- Connect TIme : time taken to connect server
- can export results to csv/excel file
1. View Result in Table
    - Latency : when server starts sending reponse - time when receiver recives 1st byte
       - it includes the time from when the request is sent to the time the first byte of the response is received.
       - Key Point: Latency does not include the time taken to download the full response.
    - Sample time (Response Time) : total time taken by request for response 
       - Time to establish a connection.
       - Time for the server to process the request.
       - Time to receive the full response.
    - Connect Time : time taken to connect server
    - `High Latency: Indicates issues with server processing, network delays, or load on the server.`
    - `High Sample Time but Low Latency: Indicates large response payloads or slow network speeds`
2. View Results Tree
3. Aggregate Report : average of all requests
    - throughput : req/min (in Jmeter but in real amount of data transfered in given time)
4. Graph Results
5. Summary Report
6. Simple Data Writer

## 5. Assertions

#
## Questions :
1. how request can be analyzed?
2. What kind of results we expect ?
3. can add request like we do in postman?
4. what kind of request can be tested?
5. If one request depends on response of another how can manage this case?
6. Is it possible to create environment such that we can do load test for specific feature? Ex. login, playlist
7. can hit 1M request? : thread X loop
8. Is Jmeter affecting any way in report times/response/data transfer