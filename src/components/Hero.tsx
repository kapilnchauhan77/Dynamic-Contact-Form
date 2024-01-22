import { useNavigate } from "react-router-dom";

/*
function Hero2() {
  const ref = useRef<any>(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="grid grid-cols-5 bg-slate-200">

      <div className="bg-slate-200 h-full">

            <div className="py-8">
              <h1 className="text-sm font-bold tracking-tight text-gray-900 m-3">Test</h1>
              <p className="mt-2 ml-3 text-sm leading-8 text-gray-600">Test</p>
              <p className="mt-2 ml-3 text-sm leading-8 text-gray-600">Test</p>
              <p className="mt-2 ml-3 text-sm leading-8 text-gray-600">Test</p>
              <p className="mt-2 ml-3 text-sm leading-8 text-gray-600">Test</p>
              <p className="mt-2 ml-3 text-sm leading-8 text-gray-600">Test</p>
            </div>

            <div className="py-8">
              <h1 className="text-sm font-bold tracking-tight text-gray-900 m-3">Test</h1>
              <p className="mt-2 ml-3 text-sm leading-8 text-gray-600">Test</p>
            </div>

      </div>

      <div onClick={handleClick} className="col-span-4">

        
      <div className="bg-slate-100 grid grid-rows-2">

            <div className="py-8 bg-black">
              <div className="flex flex-col items-center">
                  <h1 className="text-sm font-bold tracking-tight text-white m-3">Create Interactive Surveys with us</h1>
                  <form className="space-y-6" method="POST">
                    <div>
                        <input
                          id="query"
                          name="query"
                          type="text"
                          autoComplete="name"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                  </form>
              </div>
            </div>

            <div className="py-8">
              <h1 className="text-sm font-bold tracking-tight text-gray-900 m-3">History</h1>
              <p className="mt-2 ml-3 text-sm leading-8 text-gray-600">Placeholder</p>
            </div>

      </div>



      </div>

    </div>
  )
}
*/

function Hero({ mainQuery, setMainQuery }: { mainQuery:string, setMainQuery: any }) {
    const nav = useNavigate()
    const handleSubmit = (e: any) => {
            e.preventDefault();
            nav('/generate');
        }

  return (
  
  <div className="flex h-screen">
   <div className="w-64 bg-white shadow-md">
    <div className="p-4 border-b">
     <div className="relative">
      <input className="w-full p-2 border rounded" placeholder="Search" type="search"/>
      <i className="fas fa-search absolute right-3 top-3 text-gray-400">
      </i>
     </div>
    </div>
    <div className="p-4">
     <div className="flex items-center mb-4">
      <i className="fas fa-chart-line mr-2 text-blue-500">
      </i>
      <span className="font-semibold">
       Projects
      </span>
     </div>
     <div className="flex items-center text-gray-400">
      <i className="fas fa-cog mr-2">
      </i>
      <span>
       Settings
      </span>
     </div>
    </div>
   </div>
   <div className="flex-1 flex flex-col">
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
     <div className="flex">
      <button className="text-blue-500">
       All
      </button>
      <button className="text-gray-500 text-sm ml-6">
       Draft
      </button>
      <button className="text-gray-500 text-sm ml-6">
       Under approval
      </button>
      <button className="text-gray-500 text-sm ml-6">
       Approved
      </button>
      <button className="text-gray-500 text-sm ml-6">
       Running
      </button>
      <button className="text-gray-500 text-sm ml-6">
       Paused
      </button>
      <button className="text-gray-500 text-sm ml-6">
       Completed
      </button>
      <button className="text-gray-500 text-sm ml-6">
       Under edit
      </button>
     </div>
     <div className="flex items-center">
      <span className="text-gray-500 mr-4">
       Sort by: Newest first
      </span>
      <i className="fas fa-filter text-gray-500 mr-4">
      </i>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
       Create project
      </button>
     </div>
    </div>
    <div className="flex-1 p-4">
     <div className="bg-white shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">
       AI survey builder
       <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
        Beta
       </span>
      </h2>
      <p className="text-gray-600 mb-4">
       Type your survey goal and let AI create your survey. Type specifically what you want to know.
      </p>
      <form onSubmit={handleSubmit}>
      <input name="query" className="w-full p-2 border rounded mb-4" placeholder="e.g. I want to understand how likely people are to switch from gas motorcycles to electric motorcycles." type="text" onChange={(e)=>{setMainQuery(e.target.value)}} value={mainQuery} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
       Generate survey
      </button>
      </form>
     </div>
     <div className="bg-white shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
       <h3 className="text-lg font-semibold">
        Example Survey
       </h3>
       <span className="text-gray-500 text-sm">
        Created at: Jan 19, 2024
       </span>
      </div>
      <div className="flex justify-between items-center">
       <div className="flex items-center">
        <i className="fas fa-file-alt text-gray-400 mr-2">
        </i>
        <span className="text-gray-500">
         Completes 0/0
        </span>
       </div>
       <i className="fas fa-ellipsis-v text-gray-400">
       </i>
      </div>
     </div>
     <div className="flex flex-col items-center justify-center">
      <img alt="A placeholder image of a cat with a laurel wreath around its neck, representing an empty state" className="mb-4" height="200" src="https://www.pollfish.com/researcher-dashboard/4f1e7abd53fe46a66b89babeed99bb6f.svg" width="200"/>
      <div className="relative left-2 flex flex-col">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
       Create project
      </button>
      <p className="text-gray-500">
       from templates or start from scratch
      </p>
      </div>
     </div>
    </div>
   </div>
  </div>
  )
}
export default Hero;
