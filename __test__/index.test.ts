import { parseCsv, parseCsvLine } from "../src/index";

describe("parseCsv", () => {
  it.skip("should parse and transform CSV data correctly with 1 row", () => {
    const input = `book_id,name,description,price
1,Hello,good,20`;

    const expectedOutput = [
      {
        book_id: "1",
        name: "Hello",
        description: "good",
        price: "20",
      },
    ];

    const output = parseCsv(input);

    expect(output).toEqual(expectedOutput);
  });
  it("should parse and transform CSV data correctly", () => {
    const input = `book_id,name,description,price
1,Hello,good,20
2,Harry Potter,a popular book,$30
3,Book, too much      whitespace    , $10
4d,the dictionary,"  a description, including a comma  ", $30.30`;

    const expectedOutput = [
      {
        book_id: "1",
        name: "Hello",
        description: "good",
        price: "20",
      },
      {
        book_id: "2",
        name: "Harry Potter",
        description: "a popular book",
        price: "$30",
      },
      {
        book_id: "3",
        name: "Book",
        description: "too much      whitespace",
        price: "$10",
      },
      {
        book_id: "4d",
        name: "the dictionary",
        description: '"  a description, including a comma  "',
        price: "$30.30",
      },
    ];

    const output = parseCsv(input);

    expect(output).toEqual(expectedOutput);
  });
  it("should parse and transform CSV data correctly (edge case 4)", () => {
    const input = `book_id,name,description,price
4d,the dictionary,"  a description, including a comma  ", $30.30`;

    const expectedOutput = [
      {
        book_id: "4d",
        name: "the dictionary",
        description: '"  a description, including a comma  "',
        price: "$30.30",
      },
    ];

    const output = parseCsv(input);

    expect(output[0].description).toEqual(expectedOutput[0].description);
  });
});

describe.only("parseCsvLine", () => {
  it.skip("should handle the happy path", () => {
    const input = " $30.30";
    const output = parseCsvLine(input);
    const expected = ["$30.30"];
    expect(output).toEqual(expected);
  });
  it("should handle double quotes", () => {
    const input = '"  a description, including a comma  "';
    const output = parseCsvLine(input);
    const expected = ['"  a description, including a comma  "'];
    expect(output).toEqual(expected);
  });
});
