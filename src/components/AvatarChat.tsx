import React, { useState } from "react";
import { postToAPI } from "./utils/postToAPI.ts";
// import { createNewSession, startAndDisplaySession, talkHandler, closeConnectionHandler } from "./utils/avatarAPI.ts";
// import ReactPlayer from "react-player";


function AvatarChat () {
  // const [videoURL, setVideoURL] = useState<string>('');
  const [answer, setAnswer] = useState<string | undefined>("");
  const [question, setQuestion] = useState<string | undefined>("Any quick suggestions or comments to make your next flight even better?");
  const [insightsKPI, setInsightsKPI] = useState<any[]>([]);
  const [chatEnabled, setChatEnabled] = useState<Boolean>(true);
  const [loading, setLoading] = useState<Boolean>(false);

  const loadingComponent = (
    <div
        className="relative left-2/4 justify-self-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
  )

  /*
  useEffect(() => {
      createNewSession(setVideoURL).then(data => {
          console.log(data)
          startAndDisplaySession().then(data =>{
              console.log(data)
              talkHandler("Any quick suggestions or comments to make your next flight even better?");
              window.addEventListener('unload', closeConnectionHandler)
              })
          })
      }, []);
  */

  const handleSubmit = () => {
      if (chatEnabled)  {
          setLoading(true)
          postToAPI("chat/", {"insights_KPIs": insightsKPI, "impromtu_answer": answer, "insight_question": question}).then(data => {
              console.log(data)
              setInsightsKPI(prevData => [...prevData, data]);
              console.log(insightsKPI.length)
              if (insightsKPI.length > 3) {
                  setChatEnabled(false);
                  setQuestion("Thank you for your valuable feedback, we will reach back to you as soon as possible!")
              } else{
                  setQuestion(data[1])
                  setAnswer("")
                  // talkHandler(data[1])
                }
            setLoading(false)
          })
      }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-content-center align-center px-6 lg:px-8">
        <div className="sm:mx-auto w-full">

            <div className="flex w-full align-center justify-center">
             {
                 /*
                 (videoURL != "") ?
                 <ReactPlayer
                            url={videoURL}
                            className="mt-10 react-player"
                            playing
                        />
                        :
                        <img className="pt-12 mt-10" src={"./Banner design.png"} width={"25%"}/>
                        */
                        <img className="pt-12 mt-10" src={"./Banner design.png"} width={"25%"}/>
                        }
            </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {question}
          </h2>

        <div className="mt-5 mx-auto w-full max-w-5xl justify-center"> 
            
        {chatEnabled &&
            (loading ? loadingComponent : <><div>
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
            </div></>)}
          

        </div>
        </div>
      </div>
    </>
  )
}

export default AvatarChat;
