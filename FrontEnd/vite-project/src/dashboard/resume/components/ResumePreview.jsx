import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreviw from './preview/SummaryPreviw'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import ProjectPreview from './preview/ProjectPreview'


function ResumePreview() {
    const {resumeInfo,setResumeInfo}= useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'>
      {/* Personal detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreviw resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      {resumeInfo?.experience?.length>0 &&  <ExperiencePreview resumeInfo={resumeInfo} />}



      {/* Educational */}
      {resumeInfo?.education?.length>0 &&   <EducationalPreview resumeInfo={resumeInfo} />}

      {/* Skills */}
      {resumeInfo?.skills?.length>0 &&    <SkillsPreview resumeInfo={resumeInfo}/>}

      {/* Projects */}
      { resumeInfo?.skills?.length>0 &&   <ProjectPreview resumeInfo={resumeInfo}/>}
      
    </div>
  )
}

export default ResumePreview
