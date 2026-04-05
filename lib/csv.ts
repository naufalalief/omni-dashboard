import Papa from "papaparse";

export function parseCsv(csvText: string) {
  const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  return data;
}
