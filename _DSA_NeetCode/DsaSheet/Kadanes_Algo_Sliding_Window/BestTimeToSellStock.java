package DsaSheet.Kadanes_Algo_Sliding_Window;

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
// 121. Best Time to Buy and Sell Stock
/*
Logic:
1. We have to buy at low and sell at high to get the maximum profit.
2. We will keep track of the minimum price to buy.
3. We will keep track of the maximum profit.
4. We will iterate over the array.
5. If the current price is less than the minimum price then update the minimum price.
6. If the current price is greater than the minimum price then calculate the profit.
7. Update the maximum profit.
8. Return the maximum profit.

 */
public class BestTimeToSellStock {
    public static void main(String[] args) {
        int[] prices = {7, 1,5, 3, 6, 4};
        System.out.println(maxProfit(prices));
    }

    // buy at low sell at high to get max profit
    static int maxProfit_2(int[] prices){
        int buy=prices[0];
        int maxProfit=0;
        for(int i=0;i<prices.length;i++){
            // buy at low
            if(prices[i]<buy){
                buy=prices[i];
            }
            else{
                // sell at high
                maxProfit=Math.max(maxProfit, prices[i]-buy);
            }
        }
        return maxProfit;
    }

    static int maxProfit(int[] prices){
        int maxProfit = 0;
        int currentProfit = 0;
        for(int i=1;i<prices.length;i++){
            currentProfit=Math.max(currentProfit, 0);
            currentProfit=currentProfit+prices[i]-prices[i-1];
            maxProfit=Math.max(maxProfit, currentProfit);
        }

        return maxProfit;
    }
}
