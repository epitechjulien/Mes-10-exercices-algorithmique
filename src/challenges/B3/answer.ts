/**
 * In this challenge, you must find and attach to each group the group (or groups)
 * with which the current group has the most skills in common.
 * Attached groups must be sorted by their name (A to Z).
 * You must not change the order of the main list of groups.
 *
 * @param groups List of groups without closestGroups
 * @returns The same list but with a new closestGroups prop on each
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  groups,
}: {
  groups: GroupWithSkills[];
}): GroupWithSkillsAndClosestGroups[] {
  // Création du tableau final avec son type
  let tableauPere: GroupWithSkillsAndClosestGroups[] = [];

  for (let groupe of groups) {
    let similariteMax = -1;
    let groupesLePlusProches: GroupWithSkills[] = [];

    for (let autreGroupe of groups) {
      if (groupe !== autreGroupe) {
        // Comparaison
        const similarite = groupe.skills.filter((skill) =>
          autreGroupe.skills.includes(skill)
        ).length;

        if (similarite > similariteMax) {
          similariteMax = similarite;
          // Ajout du groupe le plus proche
          groupesLePlusProches = [autreGroupe];
        } else if (similarite === similariteMax) {
          // Ajout d'un éventuel 2ème groupe en cas d'égalité de points commun
          groupesLePlusProches.push(autreGroupe);
        }
      }
    }
    // Création de chaque objet qui contient le groupe ainsi que son/ses groupe le plus proche
    const chaqueGroupe: GroupWithSkillsAndClosestGroups = {
      name: groupe.name,
      skills: groupe.skills,
      closestGroups: groupesLePlusProches,
    };
    // Ajout de ce dernier dans le tableau final
    tableauPere.push(chaqueGroupe);
  }
  return tableauPere;
}

// used interfaces, do not touch
export interface GroupWithSkills {
  name: string;
  skills: string[];
}

export interface GroupWithSkillsAndClosestGroups extends GroupWithSkills {
  closestGroups: GroupWithSkills[];
}
