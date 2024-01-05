/**
 * In this challenge, you have to add a list of skills to each group (based on
 * students skills in the group). Duplicates skills for one group is not permitted. Skills must be
 * sorted alphabatically. Groups order, students order and students skills order must remain
 * untouched.
 *
 * @param groups List of groups without skills, but with students
 * @returns List of groups with a new prop skills
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ groups }: { groups: Group[] }): GroupWithSkills[] {
  // Changement du type de la variable groups
  let updatedGroup: GroupWithSkills[] = groups as GroupWithSkills[];

  // Boucle sur le tableau d'objet
  for (let i = 0; i < updatedGroup.length; i++) {
    // Création d'un tableau vide qui contiendra les nouveaux compétences de chaque groupe
    let nouvelElementSkills: string[] = [];
    // Ajout du nouveau tableau "skills" à chaque groupe
    updatedGroup[i].skills = nouvelElementSkills;
    // Boucle sur LES étudiants de chaque groupe
    let eachStudent = updatedGroup[i].students;
    for (let j = 0; j < eachStudent.length; j++) {
      // Boucle sur LES compétences de chaque étudiant
      let eachStudentSkill = eachStudent[j].skills;
      for (let k = 0; k < eachStudentSkill.length; k++) {
        // Ajout de chaque compétence dans le tableau nouvelElementSkills SI la compétence n'y est pas déjà
        let eachSkill = eachStudentSkill[k];
        if (!nouvelElementSkills.includes(eachSkill)) {
          nouvelElementSkills.push(eachSkill);
        }
      }
    }
    // Trier les skills par ordre alphabétique
    nouvelElementSkills.sort((a, b) => a.localeCompare(b));
  }
  return updatedGroup;
}

// used interfaces, do not touch
interface Student {
  name: string;
  age: number;
  skills: string[];
}

export interface Group {
  students: Student[];
  name: string;
}

export interface GroupWithSkills extends Group {
  skills: string[];
}
