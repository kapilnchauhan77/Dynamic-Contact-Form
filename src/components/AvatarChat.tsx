import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { postToAPI } from "./utils/postToAPI.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function AvatarChat() {
    let { id, uid } = useParams();
    const search = useLocation().search;
    const next_question =  new URLSearchParams(search).get('next_question');
    const forsta_uuid : string|null=  new URLSearchParams(search).get('fs_uuid');
    const forsta_sid : string|null=  new URLSearchParams(search).get('fs_surveyid');
    const uuid =  (forsta_uuid != null && forsta_uuid?.length != 0) ? forsta_uuid : new URLSearchParams(search).get('uuid');
    uid =  (uid != null && uid?.length != 0) ? uid : (uuid == null) ? undefined : uuid;
    const sid =  (forsta_sid != null && forsta_sid?.length != 0) ? forsta_uuid : new URLSearchParams(search).get('sid');
    const state =  new URLSearchParams(search).get('return-url');
    let que =  new URLSearchParams(search).get('que');
    uid += (que != null && que?.length != 0) ? " " + que : ""
    let domain: string|null;
    if (state?.length != 0){
        domain = state;
        }
    else{
        domain =  new URLSearchParams(search).get('domain');
        domain = `${domain}/survey/${sid}/${uuid}`
    }
    const startPrompt: string = (id) ? "Please provide quick feedback or comments" : "What industry is your intended Market Research (MR) Survey geared towards?"
    const [answer, setAnswer] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [question, setQuestion] = useState<string | undefined>(startPrompt);
    const [insightsKPI, setInsightsKPI] = useState<any[]>([]);
    const [chatEnabled, setChatEnabled] = useState<Boolean>(true);
    const [loading, setLoading] = useState<Boolean>(false);
    const [showMail, setShowMail] = useState<Boolean>(false);
    const [showGen, setShowGen] = useState<Boolean>(true);

    const [industry, setIndustry] = useState<string | undefined>("");
    const [targetAudience, setTargetAudience] = useState<string | undefined>("");
    const [surveyGoal, setSurveyGoal] = useState<string | undefined>("");

    const nav = useNavigate();

    const [listen, setListen] = useState(false);
    const [prevLengthOfTranscript, setPrevLengthOfTranscript] = useState(0);


    let { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();


    if (!browserSupportsSpeechRecognition) {
        return null
    }

    useEffect(() => {
            if (listen) {setAnswer(transcript.substr(prevLengthOfTranscript))}
        }, [transcript])

    const listenContinuously = () => {
        setListen(true)
        SpeechRecognition.startListening({
        continuous: true,
        language: 'en-GB'
      }) }

    useEffect(() => {
        if (id) {
            setLoading(true)
            setQuestion('')
            setAnswer('')
            console.log(id)
            postToAPI("first_question/", { "id": id, "next_question": next_question }).then((data) => {
                console.log("First Question")
                console.log('id')
                console.log(id)
                console.log('uid')
                console.log(uid)
                console.log('sid')
                console.log(sid)
                console.log('next_question')
                console.log(next_question)
                console.log('uuid')
                console.log(uuid)
                console.log(data)
                setIndustry(data[0])
                setTargetAudience(data[1])
                setSurveyGoal(data[2])
                setQuestion(data[4])
                setLoading(false)
                setChatEnabled(true)
                if (uid) {
                    setShowGen(false)
                    setShowMail(false)
                    }
                else {
                    setShowGen(true)
                    setShowMail(true)
                    }
            })
        }
    }, [])

    const loadingComponent = (
        <div
            className="relative left-2/4 justify-self-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    )

    const handleEmailSubmission = () => {
        setLoading(true)
        postToAPI("mail/", {"email": email, "uuid": id, "industry": industry, "target_audience": targetAudience, "survey_goal": surveyGoal}).then((data) => {
            console.log(data)
            if (domain) {
                window.location.replace(domain);
                }
                else{
                setLoading(false)
                setQuestion("Please find the link to your survey here in your mail!")
                    }
            setShowMail(false)
            setShowGen(false)
            setChatEnabled(false)
        })
    }

    const handleGenInfo = () => {
        setLoading(true)
        setQuestion("Generating conversational survey")
        postToAPI("generateInfo/", { "insights_KPIs": [...insightsKPI, {"index": insightsKPI.length, "question": question, "answer": answer }] }).then((data: string) => {
            console.log(`url: ${data}`)
            setShowMail(false)
            nav(data.substr(data.lastIndexOf('/')))
            id = data.substr(data.lastIndexOf('/')+1)
            setLoading(true)
            setQuestion('')
            setAnswer('')
            postToAPI("first_question/", { "id": id , "next_question": next_question }).then((data) => {
                console.log("First Question")
                console.log(data)
                setIndustry(data[0])
                setTargetAudience(data[1])
                setSurveyGoal(data[2])
                setQuestion(data[4])
                setLoading(false)
                setChatEnabled(true)
                setInsightsKPI([])
                if (uid) {
                    setShowGen(false)
                    setShowMail(false)
                    }
                else {
                    setShowGen(true)
                    // setShowMail(true)
                    }
            })
        })
    }

    const handleSubmit = () => {
        setPrevLengthOfTranscript(transcript.length);
        if (chatEnabled) {
            setLoading(true)
            if (id) {
                postToAPI("uid/", {"uuid": uuid, "id": id, "uid": uid, "next_question": next_question , "insights_KPIs": [...insightsKPI, { "index": insightsKPI.length, "question": question, "answer": answer }], "impromtu_answer": answer, "insight_question": question }).then(data => {
                    console.log(data)
                    console.log(insightsKPI.length)
                    if (insightsKPI.length > 0) {
                        setChatEnabled(false);
                        if (uid!=uuid){
                            setQuestion("Thank you for your feedback, we will reach out to you shortly!") 
                        } else {
                            if (domain) {
                                window.location.replace(domain);
                                }
                            setQuestion((state == null || state?.length == 0) ? ("Like what you witnessed? Enter your mail below to connect with us as well as receive a link to your trial survey!") : ("")) 
                                }
                    } else {
                        setQuestion(data[1])
                        setAnswer("")
                    }
                    setInsightsKPI(prevData => [...prevData, {"index": insightsKPI.length, "question": question, "answer": answer }]);
                    setLoading(false)
                })
            } else {
                postToAPI("chat/", { "next_question": next_question, "insights_KPIs": [...insightsKPI, {"index": insightsKPI.length, "question": question, "answer": answer }], "impromtu_answer": answer, "insight_question": question, "generation_flow": true }).then(data => {
                    console.log(data)
                    console.log(insightsKPI.length)
                    if (insightsKPI.length > 1) {
                        // postToAPI("generateInfo/", {"insights_KPIs": [...insightsKPI, { "question": question, "answer": answer }]})
                        setChatEnabled(false);
                        setQuestion("Thanks for answering the questions! We now have enough data to generate your conversational survey")
                    } else {
                        setQuestion(data[1])
                        setAnswer("")
                    }
                    setInsightsKPI(prevData => [...prevData, {"index": insightsKPI.length, "question": question, "answer": answer }]);
                    setLoading(false)
                })
            }
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-content-center align-center overflow-hidden">
                <div className="sm:mx-auto w-full">

                    <div className="flex w-full align-center justify-center overflow-hidden">
                        {(state == null || state?.length == 0) && (<img  src={"/img.jpg"} width={"100%"} className="overflow-hidden" />)}
                        <div className={(state == null || state?.length == 0) ? ("absolute top-1/2 px-20 bg-white/70") : ("absolute top-[20%] px-20 bg-white/70")}>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            {question}
                        </h2>

                        <div className="mt-5 mx-auto w-full max-w-5xl justify-center">

                            {loading ? loadingComponent : 
                            (chatEnabled ?
                                (<><div>
                                    <div className="mt-2">
                                        <textarea
                                            rows={5}
                                            id="answer"
                                            name="answer"
                                            required
                                            className="resize-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={answer}
                                            onChange={(e: React.ChangeEvent<any>) => setAnswer(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                </div>


                                    <div className="relative py-4 justify-self-end pb-24">
                                        <button
                                            type="submit"
                                            className="w-28 absolute right-0 justify-self-end rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    { (!listen) ? (
                                    <button 
                                        className="w-28 justify-self-end rounded-md bg-green-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                        onClick={listenContinuously}>Listen</button>)
                                    :
                                    (<button
                                        className="w-28 justify-self-end rounded-md bg-red-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        onClick={() => {
                                            SpeechRecognition.stopListening;
                                            setListen(false);
                                            }}>Stop</button>)}

                                    </div></>) :

                                (state == null || state?.length == 0) && (showGen) && ((showMail) ? (
                                <div>
                                    <div>
                                        <label htmlFor="text_mail" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="text_mail"
                                                id="text_mail"
                                                required
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={email}
                                                onChange={(e: React.ChangeEvent<any>) => setEmail(e.target.value)}
                                                onKeyDown={(e) => ((e.key === "Enter") && handleEmailSubmission())}
                                            />
                                        </div>
                                    </div>


                                    <div className="mt-10">
                                        <button
                                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={handleEmailSubmission}
                                        >
                                            Connect & Receive survey in mail!
                                        </button>
                                    </div>
                                </div>
                                ) 
                                :
                                (
                                <div>
                                    <div className="mt-10 pb-8">
                                        <button
                                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={handleGenInfo}
                                        >
                                            Try AI generated Conversational Survey!
                                        </button>
                                    </div>
                                </div>
                                )
                            ))}
                        </div>
                    </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default AvatarChat;
