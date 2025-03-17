import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "@/components/ui/button";
import { AIChatSession } from "../../../service/AIModal";
import { LoaderCircle } from "lucide-react";

const PROMPT = "You are ResumeChecker, an expert in resume analysis. Analyze the following resume and provide a detailed analysis in strict JSON format. 1. Identify 5 key strengths of the resume. Each strength should be listed under the object named \"strengths\" with the key \"strength\". 2. Suggest 3-5 areas for improvement based on the job description. Provide specific recommendations under the object named \"recommendations\". 3. Provide section-wise improvements under the object named \"improvements\". Each entry must have the key \"improvement\", and there should be no further nested objects under \"improvement\". Job Description: {job_description} JSON Format Requirements: - The output should consist of three top-level objects: \"strengths\", \"improvements\", and \"recommendations\". - Each item in \"improvements\" must be an object with only the key \"improvement\" and no child objects inside it.";

const fileTypes = ["PDF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [showSections, setShowSections] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  // ✅ Handle file upload
  const handleChange = (file) => {
    setFile(file);
  };

  // ✅ Convert PDF file to Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64String = reader.result.split(",")[1]; // Remove data prefix

        // ✅ Log Base64 content
        console.log("Base64 Content:", base64String);

        // 👉 Limit Base64 size to 500KB (if needed)
        const MAX_SIZE = 500 * 1024; // 500KB
        if (base64String.length > MAX_SIZE) {
          console.warn("Base64 size exceeds limit — trimming it");
          base64String = base64String.slice(0, MAX_SIZE);
        }

        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // ✅ Send request to Gemini API
  const sendRequestToGemini = async (base64File) => {
    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: PROMPT.replace("{job_description}", description),
            },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64File,
              },
            },
          ],
        },
      ],
    };

    try {
      console.log("Sending Request to Gemini:", prompt);
      const result = await AIChatSession.sendMessage(JSON.stringify(prompt));

      // ✅ Correct JSON parsing
      const parsedResult = JSON.parse(await result.response.text());
      console.log("Gemini Response:", parsedResult);

      setResponseText(parsedResult);
    } catch (error) {
      console.error("Error in Gemini API call:", error);
      setResponseText("Failed to analyze resume. Please try again.");
    }
  };

  // ✅ Handle Analyze Button Click
  const handleAnalyzeClick = async () => {
    if (!file) return;

    setLoading(true);
    setShowSections(true);
    setSelectedOption(null);

    try {
      const base64File = await convertFileToBase64(file);

      // ✅ Log Base64 before sending
      console.log("Final Base64 File:", base64File);

      await sendRequestToGemini(base64File);
    } catch (error) {
      console.error("Error converting file:", error);
      setResponseText("Failed to convert file.");
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-center justify-center w-full h-full p-6">
        <h1 className="text-2xl font-bold mb-2">Resume Analyzer</h1>
        <p className="text-gray-600 mb-6">
          Upload your resume in PDF format. We'll analyze the content and provide detailed feedback.
        </p>

        {/* Job Description & File Upload */}
        <div>
          <h2 className="text-lg font-bold mb-0">Job Description</h2>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="max-w-lg h-44 my-5"
          />
          <FileUploader
            className="w-full max-w-md h-64"
            hoverTitle="Drop Here"
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>

        {/* File Upload Status */}
        {file ? (
          <p className="text-green-500 mt-4">File uploaded: {file.name}</p>
        ) : (
          <p className="text-gray-400 mt-4">No file uploaded yet</p>
        )}
      </div>

      {/* Analyze Button */}
      <div className="flex flex-col items-center min-h-screen p-5">
        <div className="flex justify-center items-center">
          <Button
            className={`flex ${(!file && !description) || loading ? "opacity-50 cursor-not-allowed" : ""}`}
            variant="outline"
            onClick={handleAnalyzeClick}
            disabled={(!file && !description) || loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "ANALYZE"}
          </Button>
        </div>

        {/* Display Analysis Sections */}
        {showSections && (
          <div className="mt-6 w-full">
            {/* Tabs for ATS Score & Feedback */}
            <div className="flex justify-center w-full bg-gray-100 py-4">
              <span className={`cursor-pointer px-6 py-2 text-lg font-semibold transition-all ${selectedOption === "ats" ? "text-black underline decoration-blue-500" : "text-gray-400 hover:text-gray-600"}`} onClick={() => setSelectedOption("ats")}>ATS Score</span>
              <span className={`cursor-pointer px-6 py-2 text-lg font-semibold transition-all ${selectedOption === "feedback" ? "text-black underline decoration-green-500" : "text-gray-400 hover:text-gray-600"}`} onClick={() => setSelectedOption("feedback")}>Feedback</span>
            </div>

            {/* Content Section */}
            <div className="mt-4 p-6 w-full bg-white shadow-md border min-h-[200px] flex items-center justify-center">
              {selectedOption === "ats" && <div className="text-center"><h2 className="text-2xl font-bold">ATS Score</h2><p className="mt-2">Your ATS score is <b>85%</b>. Optimize keywords for better ranking.</p></div>}
              {selectedOption === "feedback" && <div className="text-center"><h2 className="text-2xl font-bold">Feedback</h2><p className="mt-2">{responseText}</p></div>}
              {!selectedOption && <p className="text-gray-500">Select an option to see details.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DragDrop;
