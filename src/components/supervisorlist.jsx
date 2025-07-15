import React, { useState } from 'react';
import '../layouts/supervisorlist.css'; // Importing the CSS for styling

const SupervisorPanel = () => {
    // Initial supervisors state with default data
    const [supervisors, setSupervisors] = useState([
        {
            id: 1,
            name: 'Abidur Rahman',
            teams: ['Team jambura khabo', 'Team wayne enterprise'],
        },
        {
            id: 2,
            name: 'Mohammad Ali',
            teams: ['Team green apple', 'Team red apple'],
        },
    ]);

    // State for new supervisor and teams input fields
    const [newSupervisorName, setNewSupervisorName] = useState('');
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeams, setNewTeams] = useState([]);

    // Function to add a new supervisor and teams
    const addSupervisor = () => {
        if (newSupervisorName.trim() && newTeams.length > 0) {
            const newSupervisor = {
                id: supervisors.length + 1,
                name: newSupervisorName,
                teams: newTeams,
            };

            // Update the state with the new supervisor
            setSupervisors([...supervisors, newSupervisor]);

            // Clear input fields after adding
            setNewSupervisorName('');
            setNewTeamName('');
            setNewTeams([]);
        }
    };

    // Function to handle team name input and add to the team list
    const handleAddTeam = () => {
        if (newTeamName.trim()) {
            setNewTeams([...newTeams, newTeamName]);
            setNewTeamName('');
        }
    };

    // Function to delete a supervisor
    const deleteSupervisor = (id) => {
        const updatedSupervisors = supervisors.filter(supervisor => supervisor.id !== id);
        setSupervisors(updatedSupervisors);
    };

    return (
        <div className="container">
            <header className="header">
                <button className="back-btn">Go back</button>
                <h1>Supervisor Panel</h1>
            </header>

            {/* Form to add new supervisor and teams */}
            <div className="add-supervisor">
                <input
                    type="text"
                    value={newSupervisorName}
                    onChange={(e) => setNewSupervisorName(e.target.value)}
                    placeholder="Enter supervisor name"
                    className="input-field"
                />
                <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="input-field"
                />
                <button className="add-team-btn" onClick={handleAddTeam}>
                    Add Team
                </button>
                <button className="add-btn" onClick={addSupervisor}>
                    Add supervisor
                </button>
            </div>

            {/* Render the list of supervisors dynamically */}
            {supervisors.map((supervisor) => (
                <div key={supervisor.id} className="supervisor-card">
                    <h3>{supervisor.name}</h3>
                    <p><strong>Supervising Teams:</strong></p>
                    <ul>
                        {supervisor.teams.map((team, index) => (
                            <li key={index}>{team}</li>
                        ))}
                    </ul>
                    <button className="view-details-btn">View details</button>
                    <button className="delete-btn" onClick={() => deleteSupervisor(supervisor.id)}>
                        Delete Supervisor
                    </button>
                </div>
            ))}
        </div>
    );
}

export default SupervisorPanel