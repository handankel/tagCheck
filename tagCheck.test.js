'use strict';
const tc = require('./tagCheck');

// getTag
test('get tag from "The following text<C>"', () => {
  expect(tc.getTag('The following text<C>')).toBe('C');
});
test('get tag from "The following text<C>"', () => {
  expect(tc.getTag('The following text<C>')).toBe('C');
});
test('get tag from "The following text<>"', () => {
  expect(tc.getTag('The following text<>')).toBe('');
});
test('get tag after charicter 2 from "<C>The following text<\\C>"', () => {
  expect(tc.getTag('<C>The following text<\\C>', 2)).toBe('\\C');
});
test('get tag after charicter 23 from "<C>The following text<\\C>"', () => {
  expect(tc.getTag('<C>The following text<\\C>', 23)).toBe(-1);
});

//isTag
test('check if /B is an ending tag', () => {
  expect(tc.isTag('/B')).toBe(true);
});
test('check if B is an ending tag', () => {
  expect(tc.isTag('B')).toBe(true);
});
test('check if /9 is an ending tag', () => {
  expect(tc.isTag('/9')).toBe(false);
});

// isEnd
test('check if /B is an ending tag', () => {
  expect(tc.isEnd('/B')).toBe(true);
});
test('check if B is an ending tag', () => {
  expect(tc.isEnd('B')).toBe(false);
});
test('check if /9 is an ending tag', () => {
  expect(tc.isEnd('/9')).toBe(false);
});

//tagCheck
test('tagCheck: "The following text<C><B>is centred and in boldface</B></C>"', () => {
  expect(tc.tagCheck('The following text<C><B>is centred and in boldface</B></C>')).toBe("Correctly tagged paragraph");
});
test('tagCheck: "<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>"', () => {
  expect(tc.tagCheck('<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>')).toBe("Expected </C> found </B>");
});
test('tagCheck: "<B>This should be in boldface, but there is an extra closing tag</B></C>"', () => {
  expect(tc.tagCheck('<B>This should be in boldface, but there is an extra closing tag</B></C>')).toBe("Expected # found </C>");
});
test('tagCheck: "<B><C>This should be centred and in boldface, but there is a missing closing tag</C>"', () => {
  expect(tc.tagCheck('<B><C>This should be centred and in boldface, but there is a missing closing tag</C>')).toBe("Expected </B> found #");
});
