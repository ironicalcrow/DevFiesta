import React, { useEffect, useState } from 'react';
import { Globe, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Assuming your context hook is in this path as per your original code
import { useHackathons } from '../hooks/HackathonContext'; 

// --- Helper Components & Icons ---

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

/**
 * A reusable checkbox component for the filter sidebar.
 * @param {object} props - The component props.
 * @param {string} props.label - The text label for the checkbox.
 * @param {string} props.value - The value associated with the checkbox.
 * @param {function} props.onChange - The function to call when the checkbox state changes.
 * @param {boolean} props.checked - Whether the checkbox is currently checked.
 */
const FilterCheckbox = ({ label, value, onChange, checked }) => (
    <label className="flex items-center space-x-3 text-gray-700 hover:text-black cursor-pointer">
        <input
            type="checkbox"
            value={value}
            onChange={onChange}
            checked={checked}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-base">{label}</span>
    </label>
);

/**
 * A container for a group of filters.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the filter group.
 * @param {React.ReactNode} props.children - The filter controls.
 */
const FilterGroup = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="font-semibold text-base text-gray-800 mb-4">{title}</h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);


const getHackathonStatus = (startDateStr, endDateStr) => {
    const now = new Date();
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (now > end) {
        return { text: 'Ended' };
    } else if (now >= start && now <= end) {
        return { text: 'Running' };
    } else {
        const daysLeft = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
        return { text: 'Upcoming', timeLeft: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left` };
    }
};

/**
 * Returns Tailwind CSS classes based on the hackathon status text.
 * @param {string} statusText - The status text ('Upcoming', 'Running', 'Ended').
 * @returns {string} The corresponding CSS classes for styling.
 */
const getStatusClasses = (statusText) => {
    switch (statusText) {
        case 'Running':
            return 'bg-green-100 text-green-800';
        case 'Ended':
            return 'bg-red-100 text-red-800';
        case 'Upcoming':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};


// --- Data-driven Components ---

/**
 * A card component to display summary information about a single hackathon.
 * @param {object} props - The component props.
 * @param {object} props.info - The hackathon data object.
 */
const HackathonCard = ({ info }) => {
    const navigateto = useNavigate();
    const status = getHackathonStatus(info.starting_date, info.ending_date);
    const statusClasses = getStatusClasses(status.text);

    const handleCardClick = () => {
        
        console.log("Navigating to hackathon:", info.hackathon_name);
        const hackathon = info
        navigateto('/viewhackathon',{state:{hackathon}})
        
        
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white border-l-4 border-teal-500 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col justify-between"
        >
            <div>
                <div className="flex items-center mb-4">
                    <img
                        src={info.hackathon_image || `https://placehold.co/48x48/E0E0E0/000000?text=${info.hackathon_name.charAt(0)}`}
                        alt={`${info.hackathon_name} logo`}
                        className="w-12 h-12 mr-4 rounded-md object-cover bg-gray-200"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/E0E0E0/000000?text=${info.hackathon_name.charAt(0)}`; }}
                    />
                    <div className="flex items-center text-gray-600">
                        <Globe size={16} className="mr-2" />
                        <span>{info.genre}</span>
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{info.hackathon_name}</h3>
                <div className="flex items-center text-sm mb-5">
                    <span className={`${statusClasses} font-semibold px-3 py-1 rounded-full`}>
                        {status.text === 'Upcoming' ? status.timeLeft : status.text}
                    </span>
                    <span className="ml-4 text-gray-500 font-medium">
                        {`${info.starting_date.split('T')[0]} - ${info.ending_date.split('T')[0]}`}
                    </span>
                </div>
            </div>
            <div className="flex items-center text-gray-800 pt-4 border-t border-gray-100">
                 {/* Prize and participant info can be added here if available */}
            </div>
        </div>
    );
};

// --- Main Page Component ---

const HackathonSearchPage = () => {
    const { hackathons, Loading } = useHackathons(); 

    // State for managing filter inputs
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [activeSort, setActiveSort] = useState(''); // State for sorting
    const [filteredHackathons, setFilteredHackathons] = useState([]);

    // State for UI toggles
    const [showFilters, setShowFilters] = useState(false);

    // Effect to apply filters and sorting
    useEffect(() => {
        let tempHackathons = hackathons || [];

        // --- Filtering Logic ---
        // 1. Filter by search term
        if (searchTerm.trim() !== '') {
            tempHackathons = tempHackathons.filter(h =>
                h.hackathon_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // 2. Filter by genre
        if (selectedGenre) {
            tempHackathons = tempHackathons.filter(h => h.genre === selectedGenre);
        }
        // 3. Filter by duration
        if (selectedDurations.length > 0) {
            tempHackathons = tempHackathons.filter(h => 
                selectedDurations.includes(h.duration)
            );
        }
        // 4. Filter by status
        if (selectedStatuses.length > 0) {
            tempHackathons = tempHackathons.filter(h => {
                const status = getHackathonStatus(h.starting_date, h.ending_date);
                return selectedStatuses.includes(status.text);
            });
        }

        // --- Sorting Logic ---
        const sortedHackathons = [...tempHackathons]; // Create a new array to avoid mutating state directly
        if (activeSort === 'submission') {
            sortedHackathons.sort((a, b) => new Date(a.ending_date) - new Date(b.ending_date));
        } else if (activeSort === 'recent') {
            sortedHackathons.sort((a, b) => new Date(b.added_date) - new Date(a.added_date));
        }

        setFilteredHackathons(sortedHackathons);

    }, [searchTerm, selectedGenre, selectedDurations, selectedStatuses, activeSort, hackathons]);

    // Handler for duration checkbox changes
    const handleDurationChange = (event) => {
        const { value, checked } = event.target;
        setSelectedDurations(prev =>
            checked ? [...prev, value] : prev.filter(d => d !== value)
        );
    };
    
    // Handler for status checkbox changes
    const handleStatusChange = (event) => {
        const { value, checked } = event.target;
        setSelectedStatuses(prev =>
            checked ? [...prev, value] : prev.filter(s => s !== value)
        );
    };

    // Handler to clear all active filters
    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedGenre('');
        setSelectedDurations([]);
        setSelectedStatuses([]);
        setActiveSort(''); // Also reset the sort
    };

    if (Loading) {
        return <div className="text-center p-10 font-bold text-xl">Loading Hackathons...</div>;
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            <header className="bg-[#6D8EF2] text-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Explore hackathons and test your skills</h1>
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="lg:grid lg:grid-cols-4 lg:gap-12">
                    {/* --- Filters Sidebar --- */}
                    <aside className={`lg:col-span-1 lg:block ${showFilters ? 'block' : 'hidden'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={clearAllFilters} className="text-base text-blue-600 hover:underline">Clear filters</button>
                        </div>
                        
                        <FilterGroup title="Status">
                            <FilterCheckbox label="Upcoming" value="Upcoming" onChange={handleStatusChange} checked={selectedStatuses.includes('Upcoming')} />
                            <FilterCheckbox label="Running" value="Running" onChange={handleStatusChange} checked={selectedStatuses.includes('Running')} />
                            <FilterCheckbox label="Ended" value="Ended" onChange={handleStatusChange} checked={selectedStatuses.includes('Ended')} />
                        </FilterGroup>

                        <FilterGroup title="Duration">
                            <FilterCheckbox label="12hr" value="12" onChange={handleDurationChange} checked={selectedDurations.includes('12')} />
                            <FilterCheckbox label="24hr" value="24" onChange={handleDurationChange} checked={selectedDurations.includes('24')} />
                            <FilterCheckbox label="48hr" value="48" onChange={handleDurationChange} checked={selectedDurations.includes('48')} />
                        </FilterGroup>

                        <FilterGroup title="Genre">
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg text-base"
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                <option value="">All Genres</option>
                                <option value="Web Development">Web Development</option>
                                <option value="App Development">App Development</option>
                                <option value="AI">AI</option>
                                <option value="Blockchain">Blockchain</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Cloud / DevOps">Cloud / DevOps</option>
                                <option value="AR/VR / XR">AR/VR / XR</option>
                                <option value="Game Development">Game Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="University">University</option>
                            </select>
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

                    {/* --- Main Content: Hackathon List --- */}
                    <main className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-5 mb-8">
                            <p className="text-base text-gray-600 mb-4 sm:mb-0">Showing {filteredHackathons.length} hackathons</p>
                            <div className="flex items-center gap-3 text-base">
                                <span className="font-semibold">Sort:</span>
                                <button
                                    onClick={() => setActiveSort('submission')}
                                    className={`px-3 py-1 rounded-md ${activeSort === 'submission' ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-600 hover:text-black'}`}
                                >
                                    Submission date
                                </button>
                                <button
                                    onClick={() => setActiveSort('recent')}
                                    className={`px-3 py-1 rounded-md ${activeSort === 'recent' ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-600 hover:text-black'}`}
                                >
                                    Recently added
                                </button>
                            </div>
                        </div>

                        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden w-full mb-6 bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg text-lg">
                            {showFilters ? 'Hide' : 'Show'} Filters
                        </button>

                        <div className="space-y-8">
                            {filteredHackathons.length > 0 ? (
                                filteredHackathons.map((info) => (
                                    <HackathonCard key={info.hackathon_id} info={info} />
                                ))
                            ) : (
                                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-800">No Hackathons Found</h3>
                                    <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {/* Floating Action Button */}
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
};

export default Hackathons;
