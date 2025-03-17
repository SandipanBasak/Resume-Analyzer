import React from "react";

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6 ">
      <h2 className="text-center font-bold text-sm mb-2">Skills</h2>
      <hr />
      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill,index)=>(
            <div key={index} className="flex items-center justify-between">
                <li className="text-xs">{skill.name}</li>
            </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
