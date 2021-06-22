const threeSum = function(nums){
    nums = nums.sort();
    var result = [];
    for(var i = 0 ; i < nums.length ; i ++ ){
        if(nums[i] > 0 ){
            break;
        }
        if(i > 0 && nums[i] === nums[i-1]){
            continue;
        }
        var p = i+1;
        var q = nums.length-1;
        
        while(p < q){
            var sum = nums[p] + nums[q]+nums[i]
            if(nums[p] + nums[q]+nums[i] === 0){
                while(p < q && nums[p] === nums[p+1]){
                    p++
                    console.log(1)
                }
                while(p < q && nums[q] === nums[q-1]){
                    q-- 
                }
                result.push([nums[i],nums[p],nums[q]])
                p++;
                q--
            }
            if(sum > 0){
                q--;
            }
            if(sum<0){
                p++;
            }
        }
    }
    return result;
}
var nums = [-3,-3,-1,0,1,2,3];
console.log(threeSum(nums));