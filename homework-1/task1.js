function reverseString(str) {
  if (str === '') return '';
  return reverseString(str.substring(1)) + str.charAt(0);
}

process.stdin.on('data', (data) => {
  const str = data.toString().replace(/(\r\n|\r|\n)/, '');
  process.stdout.write(reverseString(str) + '\n\n');
});
