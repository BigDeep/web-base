var getIntersectionNode = function(headA,headB){
    var map = new Map();
    var head = headA;
    while(head){
        map.set(head,true);
        head = head.next;
    }
    head = headB;
    while(head){
        if(map.has(head)){
            return head.val;
        }else{
            head = head.next;  
        }
    }
    return null;
}