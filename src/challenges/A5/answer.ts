/**
 * In this challenge, you should compute a week planning split in 1 hour slots
 * and including existing events. To keep it simple, don't work with Dates!
 * Be carefull with leading 0!
 *
 * Example:
 * Input: [{ day: "Monday", startTime: "09:00", endTime: "11:00", name: "First work day!" }]
 * Output: [
 *     { day: "Monday", startTime: "00:00", "endTime": "01:00"},
 *     { day: "Monday", startTime: "01:00", "endTime": "02:00"},
 *     ...,
 *     { day: "Monday", startTime: "09:00", "endTime": "10:00", event: [Object] },
 *     { day: "Monday", startTime: "10:00", "endTime": "11:00", event: [Object] },
 *     { day: "Monday", startTime: "11:00", "endTime": "12:00" },
 *     ...,
 *     { day: "Sunday", startTime: "23:00", "endTime": "00:00" },
 * ]
 *
 * @param events List of event to add on the planning
 * @returns List of planning slots, from Monday 00:00 to Sunday 00:00, 1 hour each slot
 */

// ↓ uncomment bellow lines and add your response!
export default function ({ events }: { events: Event[] }): PlanningSlot[] {
  // Création du tableau père
  let planningSemaine: PlanningSlot[] = [];

  // Création d'un tableau qui contient les jours de la semaine dans l'ordre et en langue anglaise.
  const joursSemaine = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Ajout dans le tableau père de chaque objet de chaque jour de la semaine avec chaque heure (7 (jours) x 24 (heures)). Les événéments ne sont pas ajouté ici.
  for (let i = 0; i < joursSemaine.length; i++) {
    for (let j = 0; j <= 23; j++) {
      // Formattage des heures
      let heureDebut = j.toString();
      let heureFin = (j + 1).toString();
      if (heureDebut.length < 2) {
        heureDebut = "0" + heureDebut;
      }
      if (heureFin.length < 2) {
        heureFin = "0" + heureFin;
      } else if (heureFin === "24") {
        heureFin = "00";
      }
      heureDebut = heureDebut + ":00";
      heureFin = heureFin + ":00";
      // Après le formatage, juste avant, création de chaque objet
      const chaqueHeure: PlanningSlot = {
        startTime: heureDebut,
        endTime: heureFin,
        day: joursSemaine[i],
      };
      // Ajout de l'objet dans le tableau père
      planningSemaine.push(chaqueHeure);
    }
  }

  // Ajout des événements
  for (let k = 0; k < planningSemaine.length; k++) {
    for (let l = 0; l < events.length; l++) {
      // Pendant la boucle sur chaque objet du tableau père, vérifie si un événément correspond (jour et heures)
      if (
        planningSemaine[k].startTime == events[l].startTime &&
        planningSemaine[k].day == events[l].day
      ) {
        // Appel de la fonction qui calcul de la durée de chaque événement.
        const duree = calculDuree(events[l].startTime, events[l].endTime);

        // Ajout de l'événement à chacun de ses heures.
        for (let m = 0; m < duree; m++) {
          let chaqueHeure = k + m;
          planningSemaine[chaqueHeure].event = events[l];
        }
      }
    }
  }

  // Fonction qui calcul la durée de chaque événément
  function calculDuree(heureDebut: string, heureFin: string): number {
    let divisionheureDebut = heureDebut.split(":");
    let heuresDebutString = divisionheureDebut[0];

    let divisionheureFin = heureFin.split(":");
    let heuresFinString = divisionheureFin[0];

    let heuresDebutEnNombre = parseInt(heuresDebutString);
    let heuresFinEnNombre = parseInt(heuresFinString);
    if (heuresFinEnNombre == 0) {
      heuresFinEnNombre = 24;
    }

    const duree = heuresFinEnNombre - heuresDebutEnNombre;

    return duree;
  }

  return planningSemaine;
}

// used interfaces, do not touch
export interface Event {
  day: string;
  startTime: string;
  endTime: string;
  name: string;
}

export interface PlanningSlot {
  day: string;
  startTime: string;
  endTime: string;
  event?: Event;
}
