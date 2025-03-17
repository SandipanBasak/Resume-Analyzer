import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: '',
    },
  ]);
  const [loading,setLoading] = useState(false)
  const {resumeId} = useParams()
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)

  useEffect(()=>{
      resumeInfo&&setSkillsList(resumeInfo?.skills)
    },[])

  const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
        newEntries[index][name]=value;
        setSkillsList(newEntries);
  }

  const AddNewSkill=()=>{
    setSkillsList([...skillsList,
        {
            name:''
        }
    ])
  }

  

  const RemoveSkill=()=>{
    setSkillsList(skillsList=>skillsList.slice(0,-1))
  }

  const onSave=()=>{
    setLoading(true);
    const data={
        data:{
            skills:skillsList.map(({ id, ...rest }) => rest)
        }
    }
    GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error, Try again!')
        })
  }

  useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        skills:skillsList
    })
  },[skillsList])

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 mb-2">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add Your top proffesional key skills</p>
      </div>
      <div>
        {skillsList.map((item, index) => (
            <div className="rounded-lg mb-2 border p-3 gap-2">
                <div>
                <label className="text-xs">Name</label>
                <Input defaultValue={item?.name} onChange={(e)=>handleChange(index,'name',e.target.value)} />
                </div>
            </div>
        ))}
      </div>
      <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewSkill} className="text-primary"> + Add More Skills</Button>
            <Button variant="outline" onClick={RemoveSkill} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>

    </div>
  );
}

export default Skills;
