(function($){
    
    return function(test,success,failure){
        if(test()){
            return success();
        }
        else{
            return failure();
        }
    }

})();