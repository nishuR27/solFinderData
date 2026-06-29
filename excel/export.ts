import * as XLSX from "xlsx";
import students from "../parser/parser";
import path from "node:path";

const INPUT = path.join(import.meta.dir, "../data/SIP(SOL FINDER).xlsx");
const OUTPUT = path.join(import.meta.dir, "../data/students.xlsx");

const workbook = XLSX.readFile(INPUT);
const sheetName = workbook.SheetNames[0] as string;
const sheet = workbook.Sheets[sheetName] as XLSX.WorkSheet;

const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
});

function normalize(value: unknown): string {
    return String(value ?? "")
        .toUpperCase()
        .replace(/\(.*?\)/g, "")
        .replace(/[^A-Z0-9 ]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// --------------------
// Build lookup maps
// --------------------

const uidMap = new Map<string, (typeof students)[number]>();
const nameMap = new Map<string, (typeof students)[number]>();

for (const s of students) {
    if (s.uid) uidMap.set(normalize(s.uid), s);
    if (s.name) nameMap.set(normalize(s.name), s);
}

const matchedUIDs = new Set<string>();

let matched = 0;
let uidMatches = 0;
let nameMatches = 0;

// --------------------
// Merge
// --------------------

for (const row of rows) {
    const uid = normalize(row.UID);
    const name = normalize(row.Name);

    let student = uidMap.get(uid);

    if (student) {
        uidMatches++;
    } else {
        student = nameMap.get(name);
        if (student) nameMatches++;
    }

    if (!student) continue;

    matched++;

    matchedUIDs.add(normalize(student.uid));

    row.Course = student.course || row.Course || "";
    row.Branch = student.branch || row.Branch || "";
    row["Area of Interest"] =
        student.areaOfInterest ||
        row["Area of Interest"] ||
        "";
    row.Experience =
        student.experience ||
        row.Experience ||
        "";
}

// --------------------
// Create new sheet
// --------------------

const newSheet = XLSX.utils.json_to_sheet(rows);

// Column widths
newSheet["!cols"] = [
    { wch: 35 }, // Email Address
    { wch: 28 }, // Name
    { wch: 35 }, // Email ID
    { wch: 18 }, // Phone
    { wch: 20 }, // UID
    { wch: 15 }, // Session
    { wch: 15 }, // Program
    { wch: 10 }, // Semester
    { wch: 25 }, // Company
    { wch: 15 }, // Course
    { wch: 35 }, // Branch
    { wch: 35 }, // Area
    { wch: 90 }, // Experience
];

workbook.Sheets[sheetName] = newSheet;

XLSX.writeFile(workbook, OUTPUT);

// --------------------
// Logs
// --------------------

console.log("==================================");
console.log(`College Records : ${rows.length}`);
console.log(`WhatsApp Records: ${students.length}`);
console.log(`Matched         : ${matched}`);
console.log(`UID Matches     : ${uidMatches}`);
console.log(`Name Matches    : ${nameMatches}`);
console.log(`Output          : ${OUTPUT}`);
console.log("==================================");

// Unmatched WhatsApp records
const unmatched = students.filter(
    s => !matchedUIDs.has(normalize(s.uid))
);

if (unmatched.length) {
    console.log("\nStudents not found in Excel:\n");

    console.table(
        unmatched.map(s => ({
            Name: s.name,
            UID: s.uid,
        }))
    );
}