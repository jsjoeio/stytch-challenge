// add your code here 🎉

type FixMeLater = any;

export function parseCsv(csvData: string): Record<string, string>[] {
  const lines = csvData.trim().split("\n");
  if (lines.length === 0) {
    return [];
  }

  const headers = lines[0].split(",").map((header) => header.trim()); // Trim headers
  const parsedData: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length === headers.length) {
      const entry: Record<string, string> = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      parsedData.push(entry);
    }
  }

  return parsedData;
}

// "  a description, including a comma  "
export function parseCsvLine(line: string): string[] {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      //   insideQuotes = !insideQuotes;
      values.push(char);
    } else if (char === "," && !insideQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(insideQuotes ? current : current.trim());
  return values.map((value) => value.replace(/^"|"$/g, "")); // Remove surrounding double quotes
}
