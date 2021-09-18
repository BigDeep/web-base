var cutRope = function(n){
    const dp = new Array(n+1).fill(1);
    for(let i = 3 ; i<n ;i++){
        for(j = 1 ; j < i ;j++){
            dp[i] = Math.max(dp[i],j*(i-j),j*dp[i-j]);
        }
    }
    return dp[n];
}


