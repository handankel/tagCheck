'use strict';

function tagCheck(paragraph) {
  let position = 0;
  let tagStack = [];
  
  while (true) { // loop untill no new tags are found
    let tag = getTag(paragraph, position);
    let tagFormated = '<' + tag + '>';
    let peek = '#';
    
    if (tag === -1) { //past the end
      break;
    }
    
    if (tag.length === 0) {// make sure the tag has content
      position = paragraph.indexOf('<' , position) +1;
      continue;
    }
    
    position = paragraph.indexOf('<' + tag + '>', position) + 1;
    
    if (tagStack.length > 0) {
      peek = '</'+tagStack[tagStack.length - 1]+ '>';
    } 
    
    if ( isEnd(tag) ) {
      if ( peek === tagFormated ) {
        tagStack.pop();
      } else {
        return 'Expected ' + peek + ' found ' + tagFormated ;
      }
    } else {
      tagStack.push(tag);
    }
  }// end while
  
  if (tagStack.length === 0) {
    return 'Correctly tagged paragraph';
  } else {
    return 'Expected </' + tagStack.pop() + '> found #';
  }
}

// cet the content of a valid tag
function getTag(paragraph, index = 0 ) {
  let tagStart = paragraph.indexOf('<', index);
  let tagEnd = paragraph.indexOf('>', tagStart);

  if (tagStart < 0 || tagEnd < 0) { // past the end
    return -1;
  }
  
  let tag = paragraph.slice(tagStart+1, tagEnd);
  
  if ( isTag(tag)) { // zeo or one / with one capital letter e.g /B
    return tag; 
  }
  
  return '';
}

//check tag has valid content
function isTag(tag) {
  if ( tag.match(/\/?[A-Z]$/) ) { // zeo or one / with one capital letter e.g /B
    return true; 
  }
  return false;
}

function isEnd(tag) {
  if (tag[0] === '/' && isTag(tag)) {
    return true;
  }
  return false;
}

module.exports = {
  tagCheck,
  getTag,
  isTag,
  isEnd
};