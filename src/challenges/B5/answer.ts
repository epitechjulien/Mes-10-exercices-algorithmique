/**
 * In this challenge, you have to split up a video in several successive segments
 * that can be either segments with notes or without.
 *
 * Successive = the end time of a segment must be the start time of the next one.
 * Also FYI, duration are in the format "HH:mm:ss" (hours, minutes, seconds)
 *
 * Example:
 * Input: {
 *      videoDuration: "01:33:12",
 *      notes: [
 *          { fromTime: "00:05:23", toTime: "00:15:10", note: "NodeJS presentation" },
 *          { fromTime: "00:26:12", toTime: "00:51:02", note: "Installation" },
 *          { fromTime: "00:51:02", toTime: "00:53:55", note: "Execution" },
 *          { fromTime: "01:01:48", toTime: "01:07:29", note: "Livereloading" },
 *          { fromTime: "00:16:12", toTime: "00:24:39", note: "NodeJS concepts" }
 *      ]
 * }
 * Ouput: [
 *      { fromTime: "00:00:00", toTime: "00:05:23" },
 *      { fromTime: "00:05:23", toTime: "00:15:10", note: "NodeJS presentation" },
 *      { fromTime: "00:15:10", toTime: "00:16:12" },
 *      { fromTime: "00:16:12", toTime: "00:24:39", note: "NodeJS concepts" },
 *      { fromTime: "00:24:39", toTime: "00:26:12" },
 *      { fromTime: "00:26:12", toTime: "00:51:02", note: "Installation" },
 *      { fromTime: "00:51:02", toTime: "00:53:55", note: "Execution" },
 *      { fromTime: "00:53:55", toTime: "01:01:48" },
 *      { fromTime: "01:01:48", toTime: "01:07:29", note: "Livereloading" }
 *      { fromTime: "01:07:29", toTime: "01:33:12" },
 * ]
 */

// ↓ uncomment bellow lines and add your response!
export default function ({ video }: { video: VideoWithNotes }): VideoSegment[] {
  //
  // Trie par ordre chronologique sur les donnnées de départ (input 'video')
  video.notes.sort((a, b) => {
    if (a.fromTime !== b.fromTime) {
      return a.fromTime.localeCompare(b.fromTime);
    }
    return 0;
  });

  // Création du tableau père qui contiendra toutes les données final
  let tableauPere: VideoSegment[] = [];
  // Création d'un tableau sur lequel seront stockées toutes les segments.
  const tableauTemps = creationTableauTemps();
  // Création d'une variable qui contient la durée totale en secondes
  const dureeEnSecondes = convertirHeureEnSecondes(video.videoDuration);

  // Génération puis insertion de chaque segments dans le tableau père, mais pas encore les "notes"
  for (let i = 0; i < dureeEnSecondes; i++) {
    for (let j = 0; j < tableauTemps.length; j++) {
      // Si la seconde est égal à un segment (basé sur son temps de départ)
      if (i == convertirHeureEnSecondes(tableauTemps[j])) {
        // Génération de l'objet avec les données
        const sequence = {
          fromTime: tableauTemps[j],
          toTime: tableauTemps[j + 1],
        };
        // Insertion de l'objet dans le tableau père
        tableauPere.push(sequence);
      }
    }
  }

  // Insertions des notes (séquence vidéo), dans le tableau père
  for (let sequenceVideoTableauPere of tableauPere) {
    for (let sequenceVideo of video.notes) {
      // Si séquence vidéo (et non pas un segment entre vidéos)
      if (sequenceVideoTableauPere.fromTime == sequenceVideo.fromTime) {
        // Insertion de la note dans le tableau père
        sequenceVideoTableauPere.note = sequenceVideo.note;
      }
    }
  }

  // Fonction qui créé un tableau sur lequel seront stockées toutes les segments (séquence vidéo et ségment intermédiaire)
  // Cela inclut le temps du départ "00:00:00" et la temps de la fin (video.videoDuration)
  function creationTableauTemps(): string[] {
    let tableauTemps: string[] = [];
    const demarrage = "00:00:00";
    tableauTemps.push(demarrage);
    for (let objet of video.notes) {
      if (!tableauTemps.includes(objet.fromTime)) {
        tableauTemps.push(objet.fromTime);
      }
      if (!tableauTemps.includes(objet.toTime)) {
        tableauTemps.push(objet.toTime);
      }
    }
    tableauTemps.push(video.videoDuration);
    return tableauTemps;
  }

  // Fonction qui converti une durée (heure, minute) en secondes
  function convertirHeureEnSecondes(heureMinuteSeconde: string): number {
    const [heures, minutes, secondes] = heureMinuteSeconde
      .split(":")
      .map(Number);

    // Conversion en secondes
    const totalSecondes = heures * 3600 + minutes * 60 + secondes;

    return totalSecondes;
  }

  return tableauPere;
}

// used interfaces, do not touch
export interface VideoWithNotes {
  videoDuration: string;
  notes: { fromTime: string; toTime: string; note: string }[];
}

export interface VideoSegment {
  fromTime: string;
  toTime: string;
  note?: string;
}
