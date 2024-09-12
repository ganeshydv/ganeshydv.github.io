
## General Process:
```yml
step 1 : user completes tasks --> gets points + rewards assigned (sls-rewards) 
Step 2 : if Points are sufficient (>=6500) --> Redeem ---> decide Redeem Type 
--> Coneverts Points to $/ Currency -- [ Reward Redeem Rule] --> 
step 3 : axios [/orders] to TangoCard
step 4 : gets link and code
```

### 1. How Points are assigned ? which service is handling it?

### 2. How Redeem works? How user claims rewards ?

#### Tango Card :


 - ### Reward Catalog : Collection of Cards/Gifts for all countries. 
   It typically includes various digital gift cards, prepaid cards, 
   and other rewards from different brands and retailers, such as Amazon, Starbucks, and many other

 - ### Reward Rule :  contans Badge + Points
 ````yml
    [  {
            "name": "rule_playlist_orientation_complete",
            "desc": "Completing Orientation Playlist within 2 weeks of first Mentor login",
            "cadence": "ONETIME",
            "requiredFacts": [
                "playlist"
            ],
            "points": 500,
            "badge": "fast_start",
            "badge_desc": "On-Time Orientation",
            "badge_icon": "https://portal.edriving.com/img/badge/fast_start.png"
        },
    ]
````

 - ### Reward Redeem Rule : to convert Points into $ 
     EX: Exchange Rate to convert points of specific country to Cash
     - JP: 
````yml
      {
        "type": "AMAZON",
        "name": "Amazon.com Gift Card",
        "imageUrl": ".png",
        "disclaimer": "<p>Restrictions apply.</p>\r\n",
        "tangoUtid": "U163059",
        "country": "US",
        "currency": "USD",
        "currencyRate": 1,
        "currencyRateLastModifiedDate": "",
        "stepAmount": 5,
        "pointsPerStep": 6500,
        "minimumStep": 1,
        "maximumStep": 2
    },
 ````
 - ### Business Rule : country to custom tc data for customization

 - #### Rules : 
```js
  {
   name: REWARD_KEY.rule_playlist_orientation_complete,
   cadence: RewardTriggerCadences.ONETIME,
   requiredFacts: [FACTS.playlist],
   badge: "fast_start",
   points: 500,
   when: [
     (facts) =>{
       var orientationAssigned=0;
       for(var i=0;i<facts.playlist.length;i++){
         var module = facts.playlist[i];
         if(module.masterProductCode.startsWith("MENTOR-MODULE-O-")){
           orientationAssigned++;
           if(!module.completedOn || module.completedOn==0 || (module.completedOn-module.createdOn)>14*24*60*60*1000) return false;
         }
       }
       return orientationAssigned>=8;//this guarentee there are more than 8 orientation assigned
     }
   ]
 }
```


 