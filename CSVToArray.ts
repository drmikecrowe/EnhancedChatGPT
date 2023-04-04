export function CSVToArray(strData: string, strDelimiter: string) {
  strDelimiter = strDelimiter || ",";
  var pattern = new RegExp(
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    "([^\"\\" + strDelimiter + "\\r\\n]*))",
    "gi"
  );
  var data: string[][] = [[]];
  var matches;
  while (matches = pattern.exec(strData)) {
    var delimiter = matches[1];
    if (delimiter.length && delimiter !== strDelimiter) {
      data.push([]);
    }
    var value = matches[2]
      ? matches[2].replace(new RegExp("\"\"", "g"), "\"")
      : matches[3];
        data[data.length - 1].push(value);
  }
  return data;
}
