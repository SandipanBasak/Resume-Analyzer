import React from "react";

function ProjectPreview({resumeInfo}) {

  return (
    <div className="my-6 ">
      <h2 className="text-center font-bold text-sm mb-2">Projects</h2>
      <hr />
      {resumeInfo?.projects.map((project,index)=>(
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold">{project.name}</h2>
          <p className="text-xs my-2">{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;
