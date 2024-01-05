/**
 * In this challenge, you have to regroup messages into an array of day based on their
 * sentAt property.
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ...
 * instead of setHouts, setMinutes, ... to avoid timezone offsets!
 *
 * Example:
 * Input: [{ message: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" }, { message: "Hello", sentAt: "2020-11-17T11:45:01.721Z" }, { message: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" }]
 * Output: [
 *      {
 *          day: "2020-11-17T00:00:00.000Z",
 *          messages: [
 *              { message: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" },
 *              { message: "Hello", sentAt: "2020-11-17T11:45:01.721Z" },
 *          ]
 *      },
 *      {
 *          day: "2020-11-18T00:00:00.000Z",
 *          messages: [
 *              { message: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" },
 *          ]
 *      },
 * ]
 *
 * @param messages List of messages, unsorted and not grouped in days
 * @returns Sorted list of days (only days with messages!) with a list of sorted messages of the day
 */

// ↓ uncomment bellow lines and add your response!
export default function ({ messages }: { messages: Message[] }): DayMessages[] {
  // Fonction qui formate la date
  function formatDateToCustomString(inputDate: string): string {
    const dateObject = new Date(inputDate);
    const formattedDate = new Date(
      Date.UTC(
        dateObject.getUTCFullYear(),
        dateObject.getUTCMonth(),
        dateObject.getUTCDate(),
        0, // Heure à 00
        0, // Minutes à 00
        0, // Secondes à 00
        0 // Millisecondes à 000
      )
    ).toISOString();

    return formattedDate;
  }

  // Création du tableau père qui contiendra le résultat final
  let tableauDesMessages: DayMessages[] = [];
  // Création d'un tableau de comparaison de date qui sera formaté
  const tableauComparaisonDateFormate: string[] = [];

  // Ajout des dates dans le tableau père
  for (let i = 0; i < messages.length; i++) {
    // Appel fonction qui formate la date
    const dateFormate = formatDateToCustomString(messages[i].sentAt);

    if (!tableauComparaisonDateFormate.includes(dateFormate)) {
      // Ajout d'une date dans le tableau de comparaison, si elle n'y est pas déjà
      tableauComparaisonDateFormate.push(dateFormate);
      // Création d'un objet qui contiendra la date si elle n'existe pas déjà, et un tableau de messages.
      const messagesDuJour: DayMessages = { day: dateFormate, messages: [] };
      // Ajout de ce dernier dans le tableau père
      tableauDesMessages.push(messagesDuJour);
    }
  }

  // Ajout DES messages, regroupé par jour, dans le tableau père
  for (let i = 0; i < messages.length; i++) {
    const dateFormate = formatDateToCustomString(messages[i].sentAt);

    for (let j = 0; j < tableauDesMessages.length; j++) {
      if (tableauDesMessages[j].day === dateFormate) {
        // push du contenu de l'objet messages dans tableau tableauDesMessages[j]
        tableauDesMessages[j].messages.push(messages[i]);
      }
    }
  }

  // Dans le tableau père, trie des messages quotidien par date la plus ancienne en premier.
  for (let k = 0; k < tableauDesMessages.length; k++) {
    tableauDesMessages[k].messages.sort((a, b) => {
      if (a.sentAt !== b.sentAt) {
        return a.sentAt.localeCompare(b.sentAt);
      }
      return 0;
    });
  }

  // Trie du tableau père par jour les plus anciens en premier.
  tableauDesMessages.sort((a, b) => {
    if (a.day !== b.day) {
      return a.day.localeCompare(b.day);
    }
    return 0;
  });

  return tableauDesMessages;
}

// used interfaces, do not touch
export interface Message {
  author: string;
  sentAt: string;
  message: string;
}

export interface DayMessages {
  day: string;
  messages: Message[];
}
