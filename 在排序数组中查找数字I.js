var search = function(nums,target){
    var leftIdx = nums.length-1 ;
    var rightIdx = 0;
   const binarySearch = function(left,right,target){
       
        var midIdx = Math.florr((right+left)/2) + 1;
        if(nums[midIdx] === target){
            left = Math.min(midIdx,leftIdx)
            right = Math.min(midIdx,rightIdx)
        }
        if(left === right){
            return;
        }
        binarySearch(left,midIdx-1,target)
        binarySearch(midIdx,right,target)
   } 
   binarySearch(0,nums.length,target);
}