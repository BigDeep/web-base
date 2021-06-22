var maxProfit = function(prices) {
    let minprice = Number.MAX_VALUE;
    let maxprofit = 0;
    for (const price of prices) {
        maxprofit = Math.max(price - minprice, maxprofit); //0 0 
        minprice = Math.min(price, minprice);//3 1
    }
    return maxprofit;
};

[3,5,20,6,19,2,20]


var maxProfit = function(prices){
    let minPrice = prices[0];
    let maxProfit = 0;
    for(let i = 1; i < prices.length ;i++){
        minPrice = Math.min(minPrice,prices[i]);
        maxProfit = Math.max(maxProfit,prices[i]-minPrice);
    }
    return maxProfit
}