import { HeadingCache } from "obsidian";
import { OffsetRange, PosRange } from "./range";

export function getParentHeadings(
  headings: HeadingCache[] | null,
  range: PosRange
): HeadingCache[] {
  if (!headings) {
    return [];
  }
  const lastHeadingIdx = indexOfLastHeading(headings, range.end.line);
  let parents: HeadingCache[] = [];
  let level = Infinity;
  for (let i = lastHeadingIdx; i >= 0; i--) {
    if (headings[i].level < level) {
      level = headings[i].level;
      if (headings[i].position.start.line <= range.start.line) {
        parents.unshift(headings[i]);
      }
    }
  }
  return parents;
}

export function getHeadingContentRange(
  parent: HeadingCache,
  headings: HeadingCache[],
  docLen: number
): OffsetRange {
  const start = parent.position.start.offset;
  let end = docLen;
  for (let i = headings.indexOf(parent) + 1; i < headings.length; i++) {
    if (headings[i].level <= parent.level) {
      end = headings[i].position.start.offset - 1;
      break;
    }
  }
  return { start, end };
}

function indexOfLastHeading(
  headings: HeadingCache[],
  beforeLine: number
): number {
  let idx = -1;
  for (let i = 0; i < headings.length; i++) {
    if (headings[i].position.end.line > beforeLine) {
      break;
    }
    idx = i;
  }
  return idx;
}
