import React, { useState } from 'react';


const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" /></svg>;
const OfficeBuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;



const FilterCheckbox = ({ label }) => (
    <label className="flex items-center space-x-3 text-gray-700 hover:text-black cursor-pointer">
        <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span className="text-base">{label}</span>
    </label>
);

const FilterGroup = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="font-semibold text-base text-gray-800 mb-4">{title}</h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const HackathonCard = () => (
  
    <div className="border rounded-xl p-6 flex gap-6 transition-shadow hover:shadow-xl">
        <div className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-100"></div>
        </div>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="md:col-span-2 space-y-3">
                <div className="h-7 bg-gray-100 rounded w-3/4"></div>
                <div className="h-5 bg-gray-100 rounded w-1/2"></div>
                <div className="h-5 bg-gray-100 rounded w-2/3"></div>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6 space-y-3">
                <div className="h-7 bg-gray-100 rounded w-1/2"></div>
                <div className="h-5 bg-gray-100 rounded w-full"></div>
                <div className="flex flex-wrap gap-2 mt-3">
                    <div className="h-6 bg-gray-100 rounded-md w-24"></div>
                    <div className="h-6 bg-gray-100 rounded-md w-28"></div>
                </div>
            </div>
        </div>
    </div>
);

// --- Main Page Component ---
const HackathonSearchPage = () => {
    const [hackathonnum,sethackathonnum] = useState(10);
    const [showFilters, setShowFilters] = useState(false);
    const [showMoreTags, setShowMoreTags] = useState(false);

    const interestTags = ['Beginner Friendly', 'Social Good', 'Machine Learning/AI', 'Open Ended', 'Education'];
    const extraTags = ['Gaming', 'Health', 'Finance', 'Productivity', 'Music'];

    return (
        <div className="bg-white min-h-screen font-sans">
            <header className="bg-[#6D8EF2] text-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold"> Explore hackathons and join them  be test your skills </h1>
                </div>
            </header>

            <div className="max-w-screen-2xl bg-[#E9F0FF] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="relative flex items-center mb-10">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="search"
                        placeholder="Search by hackathon title or keyword"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />
                    <button className="ml-4 bg-[#6D8EF2] text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-700 text-lg">Search</button>
                </div>

                <div className="lg:grid lg:grid-cols-4 lg:gap-12">
                    <aside className={`lg:col-span-1 lg:block ${showFilters ? 'block' : 'hidden'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button className="text-base  hover:underline">Clear filters</button>
                        </div>
                        <FilterGroup title="Managed by Devpost">
                            <FilterCheckbox label="Managed by DevFiesta" />
                        </FilterGroup>
                        <FilterGroup title="Location">
                            <FilterCheckbox label="Online" />
                            <FilterCheckbox label="In-person" />
                        </FilterGroup>
                        <FilterGroup title="Status">
                            <FilterCheckbox label="Upcoming" />
                            <FilterCheckbox label="Open" />
                            <FilterCheckbox label="Ended" />
                        </FilterGroup>
                         <FilterGroup title="Length">
                            <FilterCheckbox label="1-6 days" />
                            <FilterCheckbox label="1-4 weeks" />
                            <FilterCheckbox label="1+ month" />
                        </FilterGroup>
                        <FilterGroup title="Interest tags">
                            {interestTags.map(tag => <FilterCheckbox key={tag} label={tag} />)}
                            {showMoreTags && extraTags.map(tag => <FilterCheckbox key={tag} label={tag} />)}
                             <button onClick={() => setShowMoreTags(!showMoreTags)} className="text-base text-blue-600 hover:underline mt-2">
                                Show {showMoreTags ? 'less' : `more (${extraTags.length})`}
                            </button>
                        </FilterGroup>
                         <FilterGroup title="Host">
                           <select className="w-full p-3 border border-gray-300 rounded-lg text-base">
                                <option>Select host</option>
                                <option>Google</option>
                                <option>Adobe</option>
                                <option>Microsoft</option>
                           </select>
                        </FilterGroup>
                    </aside>

                    <main className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-5 mb-8">
                            <p className="text-base text-gray-600 mb-4 sm:mb-0">Showing {hackathonnum} hackathons</p>
                            <div className="flex items-center gap-3 text-base">
                                <span className="font-semibold">Sort:</span>
                                 <button className="text-gray-600 hover:text-black px-3 py-1">Most relevant</button>
                                <button className="text-gray-600 hover:text-black px-3 py-1">Submission date</button>
                                <button className="text-gray-600 hover:text-black px-3 py-1">Recently added</button>
                                <button className="text-gray-600 hover:text-black px-3 py-1">Prize amount</button>
                            </div>
                        </div>
                        
                        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden w-full mb-6 bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg text-lg">
                            {showFilters ? 'Hide' : 'Show'} Filters
                        </button>

                        <div className="space-y-8">
                            {Array.from({ length: hackathonnum }).map((_, index) => (
                                <HackathonCard key={index} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
            <div className="fixed bottom-8 right-8">
                <button className="bg-[#003E4D] text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const Hackathons = () => {
    return <HackathonSearchPage />;
}

export default Hackathons;
