
**pinky** takes two lists of words, in any language, and finds the rules and exceptions that classify them in a compact and non-redundant way.


with the two lists of words, it calculates the frequencies of all their edge-grams (prefix & suffix), and finds the signals that best classify the lists, as well the exceptions to these rules.

this logic is used to build the classifiers of nlp_compromise in all languages.

```javascript
let inlist = [
  "walking",
  "talking",
  "sleeping",
  "jumping"
]
let outlist = [
  "king",
  "peanut butter",
  "salad",
  "hot potato",
  "daryl sutter",
  "jamaica",
]
console.log(nlpPinky(inlist, outlist, {}))
/*
{
  rules:[
    {
      suffix:"ing",
      exceptions:[
        "king"
      ]
    }
  ],
  coverage:100
}
*/
```
it is :boom:badasss:boom:

MIT
