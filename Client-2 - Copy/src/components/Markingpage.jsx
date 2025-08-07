import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, Check, ExternalLink, Loader } from 'lucide-react';

const ProjectJudgingCard = ({ project, scoringCriteria }) => {
    const [scores, setScores] = useState(() => {
        const initialScores = {};
        scoringCriteria.forEach(criterion => {
            initialScores[criterion.name] = 0;
        });
        return initialScores;
    });

    const [comments, setComments] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleScoreChange = (criterionName, value) => {
        const newScore = Math.max(0, Math.min(10, Number(value)));
        setScores(prev => ({ ...prev, [criterionName]: newScore }));
        setIsSaved(false);
    };

    const totalScore = scoringCriteria.reduce((sum, criterion) => sum + (scores[criterion.name] || 0), 0);
    const maxScore = scoringCriteria.length * 10;

    const handleSave = () => {
        console.log({
            projectId: project.id,
            scores,
            totalScore,
            comments,
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="bg-[#E9F0FF] rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
            <div className=" p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold text-indigo-600">{project.team}</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{project.name}</h3>
                    </div>
                    <a href="#" className="text-blue-500 hover:text-blue-700 p-2">
                        <ExternalLink size={20} />
                    </a>
                </div>
                <p className="text-gray-600 mt-2">{project.overview}</p>
            </div>

            <div className="bg-gray-50 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Scoring</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {scoringCriteria.map(criterion => (
                        <div key={criterion.name} className="flex items-center justify-between">
                            <label htmlFor={`${project.id}-${criterion.name}`} className="text-gray-700">{criterion.name}</label>
                            <input
                                type="number"
                                id={`${project.id}-${criterion.name}`}
                                value={scores[criterion.name]}
                                onChange={(e) => handleScoreChange(criterion.name, e.target.value)}
                                className="w-20 text-center font-bold text-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                min="0"
                                max="10"
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end items-center font-bold text-xl">
                    <span className="text-gray-600 mr-4">Total:</span>
                    <span className="text-indigo-600">{totalScore} / {maxScore}</span>
                </div>
            </div>

            <div className="p-6">
                 <label htmlFor={`${project.id}-comments`} className="text-lg font-semibold text-gray-800 mb-2 block">Comments</label>
                 <textarea
                    id={`${project.id}-comments`}
                    rows="4"
                    value={comments}
                    onChange={(e) => {
                        setComments(e.target.value);
                        setIsSaved(false);
                    }}
                    placeholder="Provide constructive feedback..."
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                 ></textarea>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button 
                    onClick={handleSave}
                    className={`flex items-center justify-center w-36 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors ${isSaved ? 'bg-green-600' : 'bg-indigo-700'}`}
                >
                    {isSaved ? <Check size={20} className="mr-2"/> : <Star size={20} className="mr-2"/>}
                    {isSaved ? 'Saved!' : 'Save Score'}
                </button>
            </div>
        </div>
    );
};

const ProjectJudgingPage = () => {
    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const hackathonData = location.state?.hackathon || {
        hackathonName: "Hackathon",
        criteria: []
    };

    useEffect(() => {
     
        setProjects([]);
        setLoading(false);
    }, [hackathonData.id]);

    return (
        <div className=" min-h-screen font-sans">
            <header className="bg-[#6D8EF2] shadow-md">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-white">Project Judging</h1>
                    <p className="text-lg text-gray-200 mt-1">Review and score the submissions for {hackathonData.hackathonName}.</p>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader className="animate-spin h-12 w-12 text-indigo-600" />
                    </div>
                ) : projects.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.map(project => (
                            <ProjectJudgingCard 
                                key={project.id} 
                                project={project}
                                scoringCriteria={hackathonData.criteria} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700">No Projects Submitted Yet</h2>
                        <p className="mt-2 text-gray-500">Check back later once participants have submitted their projects.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProjectJudgingPage;
