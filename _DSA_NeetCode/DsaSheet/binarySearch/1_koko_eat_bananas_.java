/*
Question:  Koko loves to eat bananas. There are N piles of bananas, the i-th pile has piles[i] bananas. The guards have gone and will come back in H hours.
What is the minimum integer K such that she can eat all bananas within H hours?
Example 1:
Input: piles = [3,6,7,11], H = 8
Output: 4

1. max time = H = 8 - it means he can eat in 8 hours at least when he eats SLOWLY
 - consider this as finding the min speed of eating bananas in H hours so that he can eat all bananas
 - min speed + max time 
 - distribute such that he eats all bananas in H hours even if he eats slowly
 

Explanation:
If K = 4, she can eat 3 bananas in the first pile, 1 banana in the second pile, and 0 bananas in the third pile, and 0 in the fourth pile.
Then she will be able to eat all the bananas in 8 hours.
 [3,6,7,11] --> [3,4,2,4,3,4,4,3].length = 8

 steps:
    1. find the max element in the array
    2. find the min element in the array
    3. find the mid element
    4. until min <= max
        1. find the mid element
        2. check if the mid element is valid
            1. if valid then update the result and move to left
            2. else move to right
    5. return the result
    
 */

