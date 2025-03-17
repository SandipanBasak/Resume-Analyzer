import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";

function LandingPage() {
  const { user, isSignedIn } = useUser();
  return (
    <div>
      <div
        className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
        style={{
          fontFamily: 'Manrope, "Noto Sans", sans-serif',
        }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="@container">
                <div className="@[480px]:p-4">
                  <div
                    className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/c72b789b-8fab-4876-b226-4a59cac826df.png")'
                    }}
                  >
                    <div className="flex flex-col gap-2 text-left">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Optimize your resume in minutes
                      </h1>
                      <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                        Get past the bots and in front of the hiring manager
                        with a resume that stands out. Our AI-powered tool will
                        analyze your resume for content, formatting, language,
                        and more, and give you personalized suggestions to help
                        you get the job you want.
                      </h2>
                    </div>
                    <label className="flex flex-col min-w-40 h-14 w-full max-w-[150px] @[480px]:h-16">
                      <div className="flex w-full flex-1 items-center justify-between rounded-xl h-full gap-2">
                        {isSignedIn ? (
                          <div className="flex w-full flex-1 items-center justify-between rounded-xl h-full gap-2">
                            <Link to="/resume-analyzer">
                              <Button variant="outline">Analyze Resume</Button>
                            </Link>
                            <Link to="/dashboard">
                              <Button variant="outline">Create Resume</Button>
                            </Link>
                          </div>
                        ) : (
                          <Link to="/auth/sign-in">
                            <Button variant="outline">Get Started</Button>
                          </Link>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
