/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let vowelcount=0;
    if (str.length===0)
    {
      return 0;
    }
    else{
    let strnew=str.toLowerCase().replace(/[^\w\s]/g,'').split('');
    for(let i=0; i<strnew.length;i++){
      const vowels=new Set(['a','e','i','o','u']);
      if(vowels.has(strnew[i]))
      {
        console.log(strnew[i])
        vowelcount++;
      }

    }}
    return vowelcount;
}

module.exports = countVowels;