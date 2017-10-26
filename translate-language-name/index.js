var translate = require('yandex-translate-api')('trnsl.1.1.20171025T134826Z.648189837b2e3506.f72bbb946f5e5717971aad8af115512842a8a103');


// JSON.pruned : a function to stringify any object without overflow
// example : var json = JSON.pruned({a:'e', c:[1,2,{d:{e:42, f:'deep'}}]})
// two additional optional parameters :
//   - the maximal depth (default : 6)
//   - the maximal length of arrays (default : 50)
// GitHub : https://github.com/Canop/JSON.prune
// This is based on Douglas Crockford's code ( https://github.com/douglascrockford/JSON-js/blob/master/json2.js )
(function () {
    'use strict';

    var DEFAULT_MAX_DEPTH = 6;
    var DEFAULT_ARRAY_MAX_LENGTH = 50;
    var seen; // Same variable used for all stringifications

    Date.prototype.toPrunedJSON = Date.prototype.toJSON;
    String.prototype.toPrunedJSON = String.prototype.toJSON;

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder, depthDecr, arrayMaxLength) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            partial,
            value = holder[key];
        if (value && typeof value === 'object' && typeof value.toPrunedJSON === 'function') {
            value = value.toPrunedJSON(key);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
            if (depthDecr<=0 || seen.indexOf(value)!==-1) {
                return '"-pruned-"';
            }
            seen.push(value);
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = Math.min(value.length, arrayMaxLength);
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value, depthDecr-1, arrayMaxLength) || 'null';
                }
                v = partial.length === 0
                    ? '[]'
                    : '[' + partial.join(',') + ']';
                return v;
            }
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    try {
                        v = str(k, value, depthDecr-1, arrayMaxLength);
                        if (v) partial.push(quote(k) + ':' + v);
                    } catch (e) { 
                        // this try/catch due to some "Accessing selectionEnd on an input element that cannot have a selection." on Chrome
                    }
                }
            }
            v = partial.length === 0
                ? '{}'
                : '{' + partial.join(',') + '}';
            return v;
        }
    }

    JSON.pruned = function (value, depthDecr, arrayMaxLength) {
        seen = [];
        depthDecr = depthDecr || DEFAULT_MAX_DEPTH;
        arrayMaxLength = arrayMaxLength || DEFAULT_ARRAY_MAX_LENGTH;
        return str('', {'': value}, depthDecr, arrayMaxLength);
    };

}());




let data= getData();
for(let i=0;i<data.language.length;i++) {
    translate.translate(data.language[i].value[0].name, { to: 'pt'}, function(err, res) {
            data.language[i].value[1].name=res.text;
      });
};
setTimeout(function(){
    console.log(JSON.pruned(data));        
  },10000);

function getData(){
    return {
        "language": [{
            "type": "language",
            "value": [{
                "name": "German",
                "lang_id": "en"
            }, {
                "name": "Alemão",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Italian",
                "lang_id": "en"
            }, {
                "name": "Italiano",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Russian",
                "lang_id": "en"
            }, {
                "name": "Russo",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Mandarin",
                "lang_id": "en"
            }, {
                "name": "Mandarim",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Arabian",
                "lang_id": "en"
            }, {
                "name": "Árabe",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Turkish",
                "lang_id": "en"
            }, {
                "name": "Turco",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Dutch",
                "lang_id": "en"
            }, {
                "name": "Holandês",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Hindu",
                "lang_id": "en"
            }, {
                "name": "Hindú",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Bengali",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Danish",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Hebrew",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Japanese",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Indonesian",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Kashmiri",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Korean",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Norwegian",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Hungarian",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Polish",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Romanian",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Sanskrit",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Serbian",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Swedish",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Czech",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Farsi",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }, {
            "type": "language",
            "value": [{
                "name": "Finnish",
                "lang_id": "en"
            }, {
                "name": "",
                "lang_id": "pt"
            }]
        }]
    };
}