/**
 * In this challenge, you have to regroup submissions by the month they got submitted
 * The result should be an array containing one object for each month. These objects
 * must be sorted chronoligically (oldest first) based on their month property (ISO8601 datetime).
 * Please note that the date of a month will be the first day of this month at midnigth (ISO8601)
 * For instance, the datetime of novembre is: "2020-11-01T00:00:00.000Z"
 *
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ...
 * instead of setHouts, setMinutes, ... to avoid timezone offsets!
 *
 * Example:
 * Input: [
 *      { name: "Quest NodeJS", submittedAt: "2020-11-17T11:45:01.721Z" },
 *      { name: "Quest GraphQL", submittedAt: "2020-03-12T13:45:01.721Z" },
 *      { name: "Quest ReactJS", submittedAt: "2020-03-10T07:45:47.721Z" },
 *      { name: "Quest Angular", submittedAt: "2020-01-21T21:25:47.721Z" },
 *      { name: "Quest MySQL", submittedAt: "2020-06-16T21:25:47.721Z" },
 * ]
 * Output: [
 *      {
 *          month: "2020-01-01T00:00:00.000Z",
 *          submissions: [
 *              { name: "Quest Angular", submittedAt: "2020-01-21T21:25:47.721Z" }
 *          ]
 *      },
 *      {
 *          month: "2020-03-01T00:00:00.000Z",
 *          submissions: [
 *              { name: "Quest GraphQL", submittedAt: "2020-03-12T13:45:01.721Z" },
 *              { name: "Quest ReactJS", submittedAt: "2020-03-10T07:45:47.721Z" },
 *          ]
 *      },
 *      {
 *          month: "2020-06-01T00:00:00.000Z",
 *          submissions: [
 *              { name: "Quest MySQL", submittedAt: "2020-06-16T21:25:47.721Z" },
 *          ]
 *      },
 *      {
 *          month: "2020-11-01T00:00:00.000Z",
 *          submissions: [
 *              { name: "Quest NodeJS", submittedAt: "2020-11-17T11:45:01.721Z" },
 *          ]
 *      },
 * ]
 *
 * @param submissions A list of test submissions with their name and submission datetime
 * @returns A list of objects. Each object must contain a month and its associated submissions. The list must be sorted chronoligically
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  submissions,
}: {
  submissions: Submission[];
}): MonthSubmission[] {
  //
  // Création du tableau qui contiendra les données final
  let tableauPere: MonthSubmission[] = [];
  // Création d'un tableau temporaire sur lequel sera stocké les mois des événéments, sans doublon.
  // Par exemple, il y a 2 événéments en mars mais le mois de mars ne sera présent qu'une seule fois
  let listeMois: string[] = [];

  // Trie par dates les plus anciennes en priorité
  submissions.sort((a, b) => {
    if (a.submittedAt !== b.submittedAt) {
      return a.submittedAt.localeCompare(b.submittedAt);
    }
    return 0;
  });

  for (let objet of submissions) {
    // Appel de la fonction qui formate les dates en format ISO ISO8601
    const dateMois = formatageDate(objet.submittedAt);
    // Insertion des dates formaté dans le tableau des mois
    if (!listeMois.includes(dateMois)) {
      listeMois.push(dateMois);
    }
  }

  for (let chaqueMois of listeMois) {
    // Création de chaque objet qui contiendra le mois des événéments, pour le moment on y renseigne uniquement le mois formaté
    const objetMois: MonthSubmission = {
      month: chaqueMois,
      submissions: [],
    };
    // Insertion de/des soumissions dans l'objet précdédent
    for (let objet of submissions) {
      const dateMoisFormate = formatageDate(objet.submittedAt);
      if (chaqueMois == dateMoisFormate) {
        const chaqueSoumission = {
          name: objet.name,
          submittedAt: objet.submittedAt,
        };
        objetMois.submissions.push(chaqueSoumission);
      }
    }
    // Insertion dans le tableau père
    tableauPere.push(objetMois);
  }

  // Fonction qui formate la date en format ISO ISO8601
  function formatageDate(date: string): string {
    const dateObject = new Date(date);
    const formattedDate = new Date(
      Date.UTC(
        dateObject.getUTCFullYear(),
        dateObject.getUTCMonth(),
        0o1, // Jour à 01
        0, // Heure à 00
        0, // Minutes à 00
        0, // Secondes à 00
        0 // Millisecondes à 000
      )
    ).toISOString();

    return formattedDate;
  }

  return tableauPere;
}

// used interfaces, do not touch
export interface Submission {
  name: string;
  submittedAt: string;
}

export interface MonthSubmission {
  month: string;
  submissions: Submission[];
}
