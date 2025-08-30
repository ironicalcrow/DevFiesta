import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Crown, Medal, Award, Trophy } from 'lucide-react';
import axios from 'axios';

// --- Skeleton Loader Components ---
const SkeletonPodiumCard = () => (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
);

const SkeletonEntry = () => (
    <div className="flex items-center p-4 my-2 rounded-lg shadow-sm bg-white animate-pulse">
        <div className="w-10 h-10 bg-gray-200 rounded"></div>
        <div className="flex-grow mx-4 h-5 bg-gray-200 rounded"></div>
        <div className="w-20 h-6 bg-gray-200 rounded"></div>
    </div>
);


// --- UI Components ---
const TopRankCard = ({ team, rank }) => {
    const getRankStyle = () => {
        switch (rank) {
            case 1:
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-300',
                    shadow: 'shadow-yellow-500/20',
                    icon: <Crown size={32} className="text-yellow-500" />,
                    textColor: 'text-yellow-800',
                    pointsColor: 'text-yellow-600'
                };
            case 2:
                return {
                    bg: 'bg-gray-100',
                    border: 'border-gray-300',
                    shadow: 'shadow-gray-500/20',
                    icon: <Medal size={28} className="text-gray-500" />,
                    textColor: 'text-gray-800',
                    pointsColor: 'text-gray-600'
                };
            case 3:
                return {
                    bg: 'bg-orange-50',
                    border: 'border-orange-300',
                    shadow: 'shadow-orange-500/20',
                    icon: <Award size={28} className="text-orange-500" />,
                    textColor: 'text-orange-800',
                    pointsColor: 'text-orange-600'
                };
            default: return {};
        }
    };

    const style = getRankStyle();
    const animationDelay = rank === 1 ? '0.2s' : (rank === 2 ? '0.1s' : '0.3s');
    const order = rank === 1 ? 'order-first md:order-2' : (rank === 2 ? 'order-first md:order-1' : 'order-first md:order-3');
    const scale = rank === 1 ? 'md:scale-110' : 'md:scale-100';

    return (
        <div
            className={`flex flex-col items-center p-6 rounded-xl border-b-4 shadow-lg transition-transform duration-300 hover:-translate-y-2 ${style.bg} ${style.border} ${style.shadow} ${order} ${scale}`}
            style={{ animation: `fadeInUp 0.6s ${animationDelay} ease-out forwards`, opacity: 0 }}
        >
            <div className="mb-4">{style.icon}</div>
            <h3 className={`text-xl font-bold ${style.textColor} text-center truncate w-full`}>{team.team_name}</h3>
            <div className="mt-4">
                <span className={`text-3xl font-extrabold ${style.pointsColor}`}>{team.total_marks || 0}</span>
                <span className="text-base font-medium text-gray-500 ml-1.5">pts</span>
            </div>
        </div>
    );
};

const LeaderboardEntry = ({ team, rank }) => (
    <div
        className="flex items-center p-4 my-2 rounded-lg shadow-sm bg-white transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-md"
        style={{ animation: `fadeInUp 0.5s ${0.3 + (rank * 0.05)}s ease-out forwards`, opacity: 0 }}
    >
        <div className="flex items-center justify-center w-10 h-10 font-bold text-gray-500 text-lg">{rank}</div>
        <div className="flex-grow mx-4">
            <h3 className="text-md font-bold text-gray-800 truncate">{team.team_name}</h3>
        </div>
        <div className="text-right">
            <span className="text-lg font-bold text-indigo-600">{team.total_marks || 0}</span>
            <span className="text-sm font-medium text-gray-500 ml-1">pts</span>
        </div>
    </div>
);

// --- Main Page Component ---
const LeaderboardPage = () => {
    const location = useLocation();
    const { id, hname } = location.state || {};
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLeaderboard = async () => {
            if (!id) {
                setError("No hackathon ID provided.");
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:4000/api/participation/leaderboard/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const allTeams = response.data?.data?.leaderboard?.[0] || [];
                setTeams(allTeams);
            } catch (err) {
                console.error("Failed to load leaderboard", err);
                setError("Could not load the leaderboard. Please try again later.");
            } finally {
                // Add a small delay to prevent jarring layout shifts
                setTimeout(() => setIsLoading(false), 500);
            }
        };
        getLeaderboard();
    }, [id]);

    const hackathonName = hname || "Innovation Challenge";
    const topThree = teams.filter(team => team.team_rank <= 3).sort((a, b) => a.team_rank - b.team_rank);
    const others = teams.filter(team => team.team_rank > 3).sort((a, b) => a.team_rank - b.team_rank);

    const renderContent = () => {
        if (isLoading) {
            return (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-end mb-12 md:pt-6">
                        <SkeletonPodiumCard />
                        <SkeletonPodiumCard />
                        <SkeletonPodiumCard />
                    </div>
                    <div>
                        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                        <SkeletonEntry />
                        <SkeletonEntry />
                        <SkeletonEntry />
                    </div>
                </>
            );
        }

        if (error) {
            return (
                <div className="text-center py-20 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-red-600">An Error Occurred</h2>
                    <p className="mt-2 text-gray-500">{error}</p>
                </div>
            );
        }

        if (teams.length === 0) {
            return (
                <div className="text-center py-20 bg-white rounded-lg shadow-md">
                    <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700">Leaderboard is being updated</h2>
                    <p className="mt-2 text-gray-500">Check back soon to see the final rankings.</p>
                </div>
            );
        }

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-end mb-12 md:pt-6">
                    {topThree.map(team => (
                        <TopRankCard key={team.team_id} team={team} rank={team.team_rank} />
                    ))}
                </div>

                {others.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">All Rankings</h2>
                        {others.map((team) => (
                            <LeaderboardEntry key={team.team_id} team={team} rank={team.team_rank} />
                        ))}
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="min-h-screen font-sans bg-[#E9F0FF]">
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Leaderboard</h1>
                    <p className="mt-2 text-xl text-[#4060C1] font-semibold">{hackathonName}</p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default LeaderboardPage;

