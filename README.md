# intershipData

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-20232A?logo=bun&logoColor=white)](https://bun.sh/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?logo=github)](https://github.com/)

## Overview

The **intershipData** project is a lightweight data aggregation and processing tool designed for handling internship application data. It collects data from various sources (e.g., CSV exports, Google Form responses), normalizes and cleans the information, and provides utilities for further analysis or export to Excel.

Key capabilities include:

- **Data Parsing** – Robust TypeScript parsers that transform raw JSON/CSV payloads into structured objects.
- **Aggregation** – Combine multiple data files into a unified dataset, deduplicating entries and reconciling fields.
- **Export** – Generate clean Excel sheets for downstream reporting.
- **Extensibility** – Modular architecture allowing easy addition of new data sources or transformation pipelines.

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Bun (fast JavaScript runtime)
- **Package Manager**: Bun's built‑in package manager
- **Data Export**: Excel utilities powered by Node.js libraries

## Project Structure

```
intershipData/
├─ data/          # Raw data files (CSV, JSON)
├─ excel/         # Excel generation utilities
├─ parser/        # Core parsing logic (parser.ts)
├─ package.json   # Project metadata and dependencies
└─ README.md      # Project description (this file)
```

## Getting Started

**Install dependencies**

```bash
bun install
```

**Run the data aggregation script**

```bash
bun run excel/export.ts
```

The script will read the source files, process the data, and output the aggregated results in the `excel/` folder.

---

*This project was scaffolded with `bun init` (Bun v1.3.14).*
