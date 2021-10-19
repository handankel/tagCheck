'use strict';

function tagCheck(paragraph) {
  const corectMessage = 'Correctly tagged paragraph';
  const tagArray = getTag(paragraph); 
  
  const reducer = tagArray.reduce((a, b) => {
    const peeked = peek(a.stack)
    if ( isClosing(peeked, b)) {// good tag match
       a.stack.pop();
       return a;
    } 
    a.stack.push(b);
    if (isEnd(b)){ // bad tag match
      a.message = 'Expected ' + makeEnd(peeked) + ' found ' + b ;
      a.stack.pop();
    }
    return a
  }, {stack:[], message: corectMessage});
  if (reducer.stack.length > 0 &&  reducer.message === corectMessage) {// leftover tags in the stack
    reducer.message = "Expected " + makeEnd(reducer.stack[0]) +" found #"
  }
  return reducer.message
}

function isEnd(tag) {
  return (tag[1] === '/');
}

function peek(a){
  if (a.length === 0) {
    return '#';
  }
  return a[a.length -1];
}

function isClosing(a, b){
  if (isEnd(b)) {
    const cleanB = b.replace('/', '');
    return a === cleanB
  }
  return false;
}

function makeEnd(val) {
  return val.replace('<', '</');
}

function getTag(val) {
  return val.match(/<\/?[A-Z]>/g);
}

module.exports = {
  tagCheck,
  peek,
  isClosing,
  makeEnd,
  getTag,
  isEnd
};