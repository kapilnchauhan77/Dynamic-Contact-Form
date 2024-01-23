import { useNavigate } from 'react-router-dom'

export default function Contact() {
    const nav = useNavigate()

    return (
        <div className='bg-slate-200'>
            <div className="mx-auto max-w-2xl text-center p-3">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"><u>Hi!</u></h2>
                <h3 className="text-2xl font-bold text-red-600 sm:text-2xl">Looking for something specific?</h3>
                <p className="text-lg font-bold leading-8">Try our state of the art AI while conveying your market research use case</p>
            </div>
            <div className="isolate bg-white px-6 py-1 sm:py-4 lg:px-8 grid grid-cols-2">
                <div className="relative isolate px-6 pt-14 lg:px-8 flex justify-center items-center">

                    <img className="rounded-full" src={"/Screenshot-2023-11-26-033607.png"} alt="" />

                </div>
                <div>
                    <form className="space-y-6" onSubmit={() => (nav('/'))}>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        required
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="company-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Company name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="company-name"
                                        id="company-name"
                                        autoComplete="company-name"
                                        required
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="designation" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Designation
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="designation"
                                        id="designation"
                                        autoComplete="designation"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Try our AI
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
