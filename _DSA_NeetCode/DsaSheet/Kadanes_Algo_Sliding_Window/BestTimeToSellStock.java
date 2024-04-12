package DsaSheet.Kadanes_Algo_Sliding_Window;

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
// 121. Best Time to Buy and Sell Stock
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
