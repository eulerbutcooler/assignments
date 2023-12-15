/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let str1clean = str1.replace(/[^\w]/g, '').toLowerCase();
  let str2clean = str2.replace(/[^\w]/g, '').toLowerCase();

  if(str1.length !== str2.length){
    return false;
  }
  else{
    let str1arr=str1clean.split('').sort();
    let str2arr=str2clean.split('').sort();

    for(let i=0; i<str1arr.length; i++){
      if(str1arr[i] !== str2arr[i]) return false;
    }
  }
  return true;
}

module.exports = isAnagram;
