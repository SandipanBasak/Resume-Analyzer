import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";

function Project() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [projectList, setProjectList] = useState([
    {
      name: "",
      description: "",
    },
  ]);

  useEffect(() => {
    resumeInfo && setProjectList(resumeInfo?.projects);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
  };

  const AddNewEducation = () => {
    setProjectList([
      ...projectList,
      {
        name: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation=()=>{
    setProjectList(projectList=>projectList.slice(0,-1))
  }
  
  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        projects:projectList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
      console.log(resp);
      setLoading(false)
      toast('Details updated !')
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!')
    })
  }

  useEffect(()=>{
      setResumeInfo({
        ...resumeInfo,
        projects:projectList
      })
    },[projectList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Projects</h2>
      <p>Add Your project details</p>
      <div>
        {projectList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>Name</label>
                <Input
                  name="name"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.name}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Project;
