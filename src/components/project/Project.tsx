import { ProjectType } from './types';

function Project({ project }: { project: ProjectType }) {
  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.link}</p>
      <img src={ project.image } alt={ project.name } />
      <p>{project.tags}</p>
    </div>
  );
}

export default Project;
