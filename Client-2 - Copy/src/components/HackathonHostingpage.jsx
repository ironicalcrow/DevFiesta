import React, { useState, useMemo } from 'react';
import {
  User, PartyPopper, Shapes, Calendar, Clock, Link, Image as ImageIcon,
  CheckCircle, ArrowRight, ArrowLeft, ChevronDown, Users, Trash2
} from 'lucide-react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// A mock useNavigate hook for demonstration purposes in this environment
const useNavigate = () => {
    return (path, options) => {
        console.log(`Navigating to ${path} with state:`, options?.state);
        // In a real app, this would change the URL.
    };
};


const GlobalStyles = () => (
  <style>{`
      body {
        font-family: 'Inter', sans-serif;
        background-color: #E9F0FF;
        color: #1f2937;
      }
      input[type="date"]::-webkit-calendar-picker-indicator {
         filter: invert(0.6);
      }
      .hidden-file-input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
    `}</style>
);

const FormInput = ({ id, name, type, placeholder, value, onChange, icon, error }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full pl-10 pr-3 py-3.5 rounded-lg bg-white border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const FormSelect = ({ id, name, value, onChange, icon, error, children }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full pl-10 pr-10 py-3.5 rounded-lg bg-white border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 appearance-none`}
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
      <ChevronDown size={20} />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function App() {
  const navigateto = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hackathon_name: '',
    host_username: '',
    duration: '',
    genre: '',
    rule_book: '',
    starting_date: '',
    ending_date: '',
    judges: [{ username: '' }],
    criteria: [{ criteriainfo: '' }], 
  });
  const [hackathon_image, setHackathonImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Judge Handlers ---
  const handleJudgeChange = (index, e) => {
    const { name, value } = e.target;
    const newJudges = [...formData.judges];
    newJudges[index][name] = value;
    setFormData(prev => ({ ...prev, judges: newJudges }));
  };

  const addJudge = () => {
    setFormData(prev => ({ ...prev, judges: [...prev.judges, { username: '' }] }));
  };

  const removeJudge = (index) => {
    const newJudges = formData.judges.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, judges: newJudges }));
  };

  // --- Criteria Handlers ---
  const handleCriteriaChange = (index, e) => {
    const { name, value } = e.target;
    const newCriteria = [...formData.criteria];
    newCriteria[index][name] = value;
    setFormData(prev => ({ ...prev, criteria: newCriteria }));
  };

  const addCriterion = () => {
    setFormData(prev => ({ ...prev, criteria: [...prev.criteria, { description: '' }] }));
  };

  const removeCriterion = (index) => {
    const newCriteria = formData.criteria.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, criteria: newCriteria }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    // In a real app, you would upload the file here.
    // For demonstration, we'll just store a placeholder URL.
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);
    try {
      // Using a mock API for demonstration as imgbb might be blocked.
      // In a real scenario, replace this with your actual image upload service.
      console.log("Simulating image upload...");
      const res = await new Promise(resolve => setTimeout(() => resolve({ data: { data: { url: `https://mock-image-url.com/${file.name}` } } }), 1000));
      const imageUrl = res.data.data.url;
      setHackathonImage(imageUrl);
      console.log("Image upload successful:", imageUrl);
    } catch (error) {
      setHackathonImage(null);
      setImagePreview('');
      console.error("Upload failed:", error);
      setErrors(prev => ({ ...prev, image: "Image upload failed. Please try again." }));
    }
  };

  // --- Validation Functions ---
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.hackathon_name) newErrors.hackathon_name = 'Hackathon name is required.';
    if (!formData.host_username) newErrors.host_username = 'Host username is required.';
    if (!formData.genre) newErrors.genre = 'Please select a genre.';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.starting_date) newErrors.starting_date = 'Start date is required.';
    if (!formData.ending_date) newErrors.ending_date = 'End date is required.';
    else if (formData.starting_date && new Date(formData.ending_date) < new Date(formData.starting_date)) {
      newErrors.ending_date = 'End date cannot be before the start date.';
    }
    if (!formData.duration) newErrors.duration = 'Duration is required (e.g., 48 Hours).';
    if (!formData.rule_book) {
      newErrors.rule_book = 'A link to the rule book is required.';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.rule_book)) {
      newErrors.rule_book = 'Please enter a valid URL.';
    }
    return newErrors;
  };

  const validateStep3 = () => { // New: Validate Criteria
    const newErrors = { criteria: [] };
    let hasError = false;
    formData.criteria.forEach((criterion, index) => {
      const criterionError = {};
      if (!criterion.description.trim()) {
        criterionError.description = "Criterion description is required.";
        hasError = true;
      }
      newErrors.criteria[index] = criterionError;
    });
    return hasError ? newErrors : {};
  };

  const validateStep4 = () => { // Formerly Step 3: Validate Judges
    const newErrors = { judges: [] };
    let hasError = false;
    formData.judges.forEach((judge, index) => {
      const judgeError = {};
      if (!judge.username.trim()) {
        judgeError.username = "Judge's username is required.";
        hasError = true;
      }
      newErrors.judges[index] = judgeError;
    });
    return hasError ? newErrors : {};
  };

  const nextStep = () => {
    let newErrors = {};
    if (step === 1) newErrors = validateStep1();
    if (step === 2) newErrors = validateStep2();
    if (step === 3) newErrors = validateStep3();
    if (step === 4) newErrors = validateStep4();

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0 ||
                    (newErrors.judges && newErrors.judges.every(e => Object.keys(e).length === 0)) ||
                    (newErrors.criteria && newErrors.criteria.every(e => Object.keys(e).length === 0));

    if (isValid) {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    setStep(s => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const judgeUsernames = formData.judges
      .map(judge => judge.username.trim())
      .filter(name => name)
      .join(', ');

    const criteriaDescriptions = formData.criteria
      .map(criterion => criterion.description.trim())
      .filter(desc => desc)
      .join('|'); // Using '|' as a separator for criteria

    const submissionData = { ...formData };
    delete submissionData.judges;
    delete submissionData.criteria;
    submissionData.judge_username = judgeUsernames;
    submissionData.judging_criteria = criteriaDescriptions;

    const finalData = { ...submissionData, hackathon_image };
    
    console.log('Final Form Data to be Submitted:', finalData);
    // Mocking API call
    try {
        console.log("Simulating API call to http://localhost:4000/api/hackathon/host");
        // const token = localStorage.getItem('token') || 'mock-token';
        // const response = await axios.post('http://localhost:4000/api/hackathon/host', finalData, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // console.log("API Response:", response)
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Mock API call successful.");

        setStep(s => s + 1); // Move to success screen
        setTimeout(() => {
          navigateto('/viewhackathon', { state: { finalData } });
        }, 2000);

    } catch(error) {
        console.error("API submission failed:", error);
        // Handle submission error, maybe show a notification to the user
    }
  };

  const steps = ['Core Details', 'Schedule & Rules', 'Judging Criteria', 'Add Judges', 'Banner & Review'];

  const StepIndicator = useMemo(() => (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center w-32">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${step > index + 1 ? 'bg-green-500' : step === index + 1 ? 'bg-white' : 'bg-gray-300'}`}>
              {step > index + 1 ? <CheckCircle className="w-6 h-6 text-white" /> : <span className={`${step === index + 1 ? 'text-black' : 'text-gray-600'} font-bold`}>{index + 1}</span>}
            </div>
            <p className={`mt-2 text-xs text-center transition-colors duration-500 ${step >= index + 1 ? 'text-gray-800' : 'text-gray-500'}`}>{label}</p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-auto border-t-2 transition-colors duration-500 mx-2 ${step > index + 1 ? 'border-green-500' : 'border-indigo-200'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  ), [step]);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#E9F0FF]">
        <div className="w-full max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
              Create a New Hackathon
            </h1>
            <p className="mt-3 text-lg text-gray-600">Host Registration Portal</p>
          </header>

          <main className="bg-[#6D8EF2] backdrop-blur-sm border border-indigo-200 rounded-2xl shadow-2xl p-10 sm:p-14">
            {step <= steps.length && StepIndicator}

            <form onSubmit={handleSubmit} noValidate>
              {step === 1 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-10 text-center">Step 1: Core Details</h2>
                  <div className="space-y-10">
                    <FormInput id="hackathon_name" name="hackathon_name" type="text" placeholder="My Awesome Hackathon" value={formData.hackathon_name} onChange={handleChange} icon={<PartyPopper size={20} />} error={errors.hackathon_name} />
                    <FormInput id="host_username" name="host_username" type="text" placeholder="your-username" value={formData.host_username} onChange={handleChange} icon={<User size={20} />} error={errors.host_username} />
                    <FormSelect id="genre" name="genre" value={formData.genre} onChange={handleChange} icon={<Shapes size={20} />} error={errors.genre}>
                      <option value="" disabled>Select a genre...</option>
                      <option value="Online">Online</option>
                      <option value="In-Person (University)">In-Person (University)</option>
                      <option value="In-Person (Corporate)">In-Person (Corporate)</option>
                      <option value="In-Person (Community)">In-Person (Community)</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Game Development">Game Development</option>
                      <option value="Data Science">Data Science</option>
                    </FormSelect>
                  </div>
                </section>
              )}

              {step === 2 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-10 text-center">Step 2: Schedule & Rules</h2>
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <FormInput id="starting_date" name="starting_date" type="date" value={formData.starting_date} onChange={handleChange} icon={<Calendar size={20} />} error={errors.starting_date} />
                      <FormInput id="ending_date" name="ending_date" type="date" value={formData.ending_date} onChange={handleChange} icon={<Calendar size={20} />} error={errors.ending_date} />
                    </div>
                    <FormInput id="duration" name="duration" type="text" placeholder="e.g., 48 Hours, 3 Days" value={formData.duration} onChange={handleChange} icon={<Clock size={20} />} error={errors.duration} />
                    <FormInput id="rule_book" name="rule_book" type="url" placeholder="https://link-to-your/rulebook.pdf" value={formData.rule_book} onChange={handleChange} icon={<Link size={20} />} error={errors.rule_book} />
                  </div>
                </section>
              )}
              
              {step === 3 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-10 text-center">Step 3: Judging Criteria</h2>
                  <div className="space-y-6">
                    {formData.criteria.map((criterion, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-grow">
                          <FormInput
                            id={`criterion-desc-${index}`}
                            name="description"
                            type="text"
                            placeholder={`Criterion ${index + 1} Description`}
                            value={criterion.description}
                            onChange={(e) => handleCriteriaChange(index, e)}
                            icon={<CheckCircle size={20} />}
                            error={errors.criteria?.[index]?.description}
                          />
                        </div>
                        {formData.criteria.length > 1 && (
                          <button type="button" onClick={() => removeCriterion(index)} className="p-3 text-indigo-100 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addCriterion} className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border-2 border-dashed border-indigo-200 hover:border-white hover:text-white text-indigo-100 font-semibold transition-colors">
                    <Shapes size={18} />
                    Add Another Criterion
                  </button>
                </section>
              )}

              {step === 4 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-10 text-center">Step 4: Add Judges</h2>
                  <div className="space-y-6">
                    {formData.judges.map((judge, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-grow">
                          <FormInput
                            id={`judge-username-${index}`}
                            name="username"
                            type="text"
                            placeholder={`Judge ${index + 1} Username`}
                            value={judge.username}
                            onChange={(e) => handleJudgeChange(index, e)}
                            icon={<User size={20} />}
                            error={errors.judges?.[index]?.username}
                          />
                        </div>
                        {formData.judges.length > 1 && (
                          <button type="button" onClick={() => removeJudge(index)} className="p-3 text-indigo-100 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addJudge} className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border-2 border-dashed border-indigo-200 hover:border-white hover:text-white text-indigo-100 font-semibold transition-colors">
                    <Users size={18} />
                    Add Another Judge
                  </button>
                </section>
              )}

              {step === 5 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-10 text-center">Step 5: Banner & Review</h2>
                  <div className="space-y-12">
                    <div>
                      <label htmlFor="hackathon-image-upload" className="block text-sm font-medium text-indigo-100 mb-2">Hackathon Banner Image (Optional)</label>
                      <input id="hackathon-image-upload" name="hackathon_image" type="file" className="hidden-file-input" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                      <label htmlFor="hackathon-image-upload" className="cursor-pointer flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-lg border-2 border-dashed border-indigo-200 hover:border-white hover:text-white text-indigo-100 font-semibold transition-colors">
                        <ImageIcon size={18} />
                        {hackathon_image ? 'Change Image' : 'Upload an Image'}
                      </label>
                      {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                      {imagePreview && (
                        <div className="mt-4">
                          <img src={imagePreview} alt="Banner preview" className="w-full h-auto rounded-lg object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 bg-[#6082E0]/80 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-4">Review Your Details</h3>
                      {Object.entries(formData).map(([key, value]) => {
                        if (key === 'judges' || key === 'criteria') return null;
                        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return (
                          <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3.5 border-b border-indigo-300/50 last:border-b-0">
                            <span className="text-indigo-100">{formattedKey}</span>
                            <span className="text-white font-medium text-left sm:text-right break-all">{String(value) || 'N/A'}</span>
                          </div>
                        )
                      })}
                      <div className="pt-4 border-t border-indigo-300/50">
                         <h3 className="text-indigo-100 capitalize mb-2">Judging Criteria</h3>
                         <div className="space-y-2">
                           {formData.criteria.map((criterion, index) => (
                             <div key={index} className="flex justify-between items-center text-sm p-2 bg-[#5575D0] rounded-md">
                               <span className="text-white font-medium">{criterion.description || 'Unnamed Criterion'}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                      <div className="pt-4 border-t border-indigo-300/50">
                        <h3 className="text-indigo-100 capitalize mb-2">Judges</h3>
                        <div className="space-y-2">
                          {formData.judges.map((judge, index) => (
                            <div key={index} className="flex justify-between items-center text-sm p-2 bg-[#5575D0] rounded-md">
                              <span className="text-white font-medium">{judge.username || 'Unnamed Judge'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {step === 6 && (
                <section className="text-center py-10">
                  <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white">Hackathon Created!</h2>
                  <p className="text-indigo-100 mt-2">Redirecting you now...</p>
                </section>
              )}

              {step < 6 && (
                <div className="mt-14 flex justify-between items-center">
                  {step > 1 ? (
                    <button type="button" onClick={prevStep} className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#4060C1] hover:bg-[#3551A6] text-white font-semibold transition-colors">
                      <ArrowLeft size={18} /> Back
                    </button>
                  ) : <div></div>}

                  {step < steps.length && (
                    <button type="button" onClick={nextStep} className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#4060C1] hover:bg-[#3551A6] text-white font-semibold transition-colors">
                      Next <ArrowRight size={18} />
                    </button>
                  )}

                  {step === steps.length && (
                    <button type="submit" className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#4060C1] hover:bg-[#3551A6] text-white font-semibold transition-colors">
                      Confirm & Submit <CheckCircle size={18} />
                    </button>
                  )}
                </div>
              )}
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
