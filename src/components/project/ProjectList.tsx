import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthProvider';
import { db } from '../../firebase';
import { ProjectType } from './types';
import Project from './Project';

function ProjectList() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'projects'), where('userId', '==', currentUser.uid));

      getDocs(q).then((querySnapshot) => {
        const projectsData: ProjectType[] = [];
        querySnapshot.forEach((doc) => {
          projectsData.push({ ...doc.data() as ProjectType, id: doc.id });
        });
        setProjects(projectsData);
      });
    }
  }, [currentUser]);

  return (
    <div>
      {projects.map((project) => (
        <Project key={ project.id } project={ project } />
      ))}
    </div>
  );
}

export default ProjectList;
