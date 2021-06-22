Function.prototype.before = function( beforefn ){ 
    var __self = this;
    return function(){
    beforefn.apply( this, arguments );
    return __self.apply( this, arguments );
    } 
   }; 
   Function.prototype.after = function( afterfn ){ 
    var __self = this; 
    return function(){ 
    var ret = __self.apply( this, arguments ); 
    afterfn.apply( this, arguments ); 
    return ret; 
    } 
   }; 
   var func = function(){ 
    console.log( 2 ); 
   }; 
   func = func.before(function(){ 
    console.log( 1 ); 
   }).after(function(){ 
    console.log( 3 ); 
   }); 
   func();