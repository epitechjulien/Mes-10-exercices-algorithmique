/**
 * In this challenge, you must sort events chronologically (oldest to latest) based on
 * their startDatetime prop. If some events have the same startDatetime, then the shortest must appear
 * first
 *
 * @param events Unsorted list of events
 * @returns Sorted list of events
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  events,
}: {
  events: EventDatetime[];
}): EventDatetime[] {
  events.sort((a, b) => {
    // 1er trie : par date la plus ancienne
    if (a.startDatetime !== b.startDatetime) {
      return a.startDatetime.localeCompare(b.startDatetime);
    }
    // 2ème tri : date de fin la plus basse, donc événément le plus court
    return (
      new Date(a.endDatetime).getTime() - new Date(b.endDatetime).getTime()
    );
  });
  return events;
}

// used interfaces, do not touch
export interface EventDatetime {
  startDatetime: string;
  endDatetime: string;
  event: string;
}
