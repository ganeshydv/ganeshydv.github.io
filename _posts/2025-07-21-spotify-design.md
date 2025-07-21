---
layout: post
title: "Spotify Design"
date: 2025-07-21
categories: [system-design, hld]
tags: [database]
author: "GGurkhude"
excerpt: "Learning notes on spotify design"
original_path: "3_SystemDesign/HLD/spotify/Spotify_design.md"
---

![Spotify Design](Spotify_design.jpg)

# Spotify Design 
## Functional Requirement :
- Users : 1B
- DAU : 200M
- SONGS: 100M
- 1. can search & play song (Live + Local cache + System Cache)
- 2. Playlist


## Non-Functional Requirement :
- Latency
- Availablity
- Consistency
- Resiliance : can recover in no time after failure
- Durability : Data should be safely stored even in case of service failures.

## Database Requirment :
### Tables : 
1. User  : [name, user_id,.etc]
2. Artist : [name, artist_id,]
3. Albums : [name, album_id, desc, artist_id, release date,.etc]
4. Songs_meta_data : [songs_id,artist_id, album_id, song_file_location,etc]
5. Playlist : [user_id, song_id,playlist_name,etc]

 - 1 User : 500  bytes
 - 1 song : 5 MB
 - 1 songs_meta_data : 1 kb
 - 1 artists : 1 kb
 - 1 album : 1 kb
 -  playlist : 1 kb

>  ### DB Requirement Calac :
 - users : 1B x 500bytes : 0.5TB
 - songs : 5MB x 100M : 500 TB ->  0.5PB
 - songs_meta : 1 Kb x 200 M=200 GB
 - artists : 0.5M x 1 kb= 0.5 GB
 - albums : 0.1M x 1kb = 0.1 GB
 - Playlist : 1kb [size] X 1B [users] X 30 [Max_Playlist] = 1TBx30 =  30TB
 - TOTAL : 505 TB + 201 GB + 30TB = 536 TB
   
## Latency & Throughout :
- read req : 10 read req/user
- write : 1M artist : 10k artists uploading files daily
  -  10k artists & update data 1M req: = 1M w req/ day
- Read Latency : (200M x 10)/(24 x 60 x 60) =2000M/10^5= 20K req/sec (approx.)
- Write Latency : 1 M /10^5 = 10 req/sec approx.
- TOTAL Throughput : read latency + write latency = 20k + 10 = 20k/sec approx
- at Peak hours : 
  - 1B user = 600 M users active
  - Read = 100 read/user
  - Read Latency : 600M X 15 /10^5 = 90K req/sec
  - write = 100M  w/day = 100 M/10^5= 1k req/sec
  - total throughput = 91k/sec




