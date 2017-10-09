console.log("yeii bro");



function Animal(){
    return {
        sound: function(){
            console.log("do re mi");
        },
        move:"ta ta"        
    }
}

var  peter = Animal();

peter.sound();

var shape = function () {
};
var p = {
    a: function () {
        console.log('aaa');
    }
};
shape.prototype.__proto__ = p;
console.log(peter.__proto__ );