import { useState } from "react";
import { postToAPI } from "./utils/postToAPI.ts";
import { useNavigate } from "react-router-dom";

function GenerationForm({ mainQuery, setMainQuery }: { mainQuery:string, setMainQuery: any }) {
    const nav = useNavigate()

    const [industry, setIndustry] = useState<string>('')
    const [targetCustomer, setTargetCustomer] = useState<string>('')

    const [story, setStory] = useState<string>('')
    const [questions, setQuestions] = useState<any[]>([])
    const onClickHandler = () => {
      postToAPI("generateSurvey/", {"survey_goal": mainQuery, "industry": industry, "target_audience": targetCustomer}).then(data => {
              console.log(data)
              setStory(data['story_script'])
              setQuestions(data['Questions'])
              console.log(data['Questions'])
              data['Questions'].map(({Question, Options} : {Question: string, Options: string[]}) => {
                      console.log(Question)
                      console.log(Options)
                      Options.map((Option: string)=>{console.log(Option)})
                  })

          })
    }

    const onClickDone = () => {
      nav('/')
    }
    
    return (
            <div className="min-h-screen bg-gray-100 flex">
                    <div className="flex flex-col w-64 bg-white shadow-lg">
                        <div className="px-4 py-6">
                            <h2 className="text-lg font-semibold text-gray-900">AI survey builder <span className="text-sm text-blue-600">Beta</span></h2>
                            <p className="text-sm text-gray-700 mt-1">Type your survey goal and let AI create your survey. Type specifically what you want to know.</p>
                            <div className="mt-4">
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={mainQuery} onChange={e => setMainQuery(e.target.value)}/>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm text-gray-700">Enter the Industry you serve</label>
                                <div className="mt-1">
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={industry} onChange={e => setIndustry(e.target.value)}/>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm text-gray-700">Enter the target audience</label>
                                <div className="mt-1">
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={targetCustomer} onChange={e => setTargetCustomer(e.target.value)}/>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button onClick={onClickHandler} className="w-full px-3 py-2 bg-blue-600 text-white rounded-md">Generate survey</button>
                            </div>
                            {(story != '') &&
                            <div className="mt-6">
                                <button onClick={onClickDone} className="w-full px-3 py-2 bg-green-500 text-white rounded-md">Done</button>
                            </div>
                            }
                        </div>
                        <div className="mt-auto flex items-center justify-center py-4 bg-gray-50">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Use this survey</button>
                            <p className="text-xs text-gray-500 ml-2">You can edit this survey later</p>
                        </div>
                    </div>
                    <div className="flex-1">
                    <div className="flex-1 px-4 py-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold text-gray-900">Storyline</h1>
                            <button className="text-gray-600 focus:outline-none">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <h1 className="px-6 py-4 text-lg font-bold">{(story == '') ? "Please enter details to generate story": story}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 px-4 py-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold text-gray-900">Default Survey Questions</h1>
                            <button className="text-gray-600 focus:outline-none">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        {(story == '' || questions.length == 0) ? 
                            (<h1 className="px-6 py-4 text-lg font-bold">Please enter the details and generate survey</h1>)
                            :
                            ( questions.map(({Question, Options} : {Question: string, Options: string[]}) => (
                                <ul className="divide-y divide-gray-200">
                                    <li className="px-6 py-4">
                                        <h3 className="text-sm font-medium text-gray-900">{Question}</h3>
                                        {(Options)? Options.map((Option: any) => ( 
                                        <p className="text-sm text-gray-600 mt-1">{Option}</p>
                                        )): ("Option Answer")}
                                    </li>
                                </ul>
                            )))
                        }
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
    );
}
export default GenerationForm;
