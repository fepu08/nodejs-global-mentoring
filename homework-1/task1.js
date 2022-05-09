function reverseString(str) {
  if (str === '') return '';
  return reverseString(str.substring(1)) + str.charAt(0);
}

process.stdin.on('data', (data) => {
  process.stdout.write(reverseString(data.toString()) + '\n');
});
