/**
 * In this challenge, you have to get all the categories from the events. The categories
 * must be unique and sorted from A to Z.
 *
 * @param events List of events with their categories
 * @returns All existing categories sorted alphabatically without duplicates (A to Z)
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  events,
}: {
  events: EventWithCategory[];
}): string[] {
  // Création du tableau qui contiendra les catégories.
  let tableaCategorie: string[] = [];

  // Boucle sur chaque catégorie
  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < events[i].categories.length; j++) {
      // Au passage sur chaque catégorie, on l'ajoute au tableau de catégorie, si elle n'y est pas déjà
      if (!tableaCategorie.includes(events[i].categories[j])) {
        tableaCategorie.push(events[i].categories[j]);
      }
    }
  }

  // Trie du tableau par ordre alphabétique
  tableaCategorie.sort((a, b) => {
    return a.localeCompare(b);
  });

  return tableaCategorie;
}

// used interfaces, do not touch
export interface EventWithCategory {
  startDatetime: string;
  endDatetime: string;
  event: string;
  categories: string[];
}
