import fs from "node:fs";

export interface Student {
    name: string;
    uid: string;
    course: string;
    branch: string;
    areaOfInterest: string;
    experience: string;
}

const text = fs.readFileSync("./data/raw.txt", "utf8");

const blocks = text
    .split(/(?=^(?:\[\d{1,2}:\d{2},.*?\]\s*.*?:\s*)?Name\s*[:-])/gim)
    .map(b => b.trim())
    .filter(Boolean);

function field(block: string, key: string): string {
    const regex = new RegExp(
        `${key}\\s*[:-]\\s*([\\s\\S]*?)(?=\\n(?:Name|UID|Course|Branch|Area of Interest|Experience)\\s*[:-]|$)`,
        "i"
    );

    return (
        regex.exec(block)?.[1]
            ?.replace(/\r/g, "")
            .replace(/\n+/g, " ")
            .trim() ?? ""
    );
}
export const students: Student[] = [];

for (const block of blocks) {
    // Ignore unrelated messages
    if (!/Name\s*[:-]/i.test(block) || !/UID\s*[:-]/i.test(block))
        continue;

    students.push({
        name: field(block, "Name"),
        uid: field(block, "UID"),
        course: field(block, "Course"),
        branch: field(block, "Branch"),
        areaOfInterest: field(block, "Area of Interest"),
        experience: field(block, "Experience"),
    });
}

console.table(students);

export default students;