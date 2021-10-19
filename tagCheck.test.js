'use strict';
const tc = require('./tagCheck');

// getTag
test('getTag: "The following text<C>"', () => {
  expect(tc.getTag('The following text<C>')).toStrictEqual(['<C>']);
});
test('getTag: "<A></A><b></b><9></><><Z><ABC>"', () => {
  expect(tc.getTag("<A></A><b></b><9></><><Z><ABC>")).toStrictEqual(['<A>', '</A>', '<Z>']);
});

// peek
test("peek: ['a']", () => {
  expect(tc.peek(['a'])).toBe('a');
});
test("peek: []", () => {
  expect(tc.peek([])).toBe('#');
});

//isClosing
test("isClosing: '<B>', '</B>'", () => {
  expect(tc.isClosing('<B>', '</B>')).toBe(true);
});
test("isClosing: '<B>', '<B>'", () => {
  expect(tc.isClosing('<B>', '<B>')).toBe(false);
});
test("isClosing: '<A>', '</B>'", () => {
  expect(tc.isClosing('<A>', '</B>')).toBe(false);
});

//makeEnd
test("makeEnd: '<A>'", () => {
  expect(tc.makeEnd('<A>')).toBe('</A>');
});

// isEnd
test('isEnd: </B>', () => {
  expect(tc.isEnd('</B>')).toBe(true);
});
test('isEnd: <B>', () => {
  expect(tc.isEnd('<B>')).toBe(false);
});

//tagCheck
test('tagCheck: "The following <>text<C><B>is centred and in boldface</B></C>"', () => {
  expect(tc.tagCheck('The following <>text<C><B>is centred and in boldface</B></C>')).toBe("Correctly tagged paragraph");
});
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
