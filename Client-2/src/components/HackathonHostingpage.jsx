import React, { useState, useMemo } from 'react';
import { User, Mail, Phone, Building, Hash, Calendar, CheckCircle, ArrowRight, ArrowLeft, PartyPopper, Users, Trash2, Image as ImageIcon, ListChecks, PlusCircle } from 'lucide-react';

const GlobalStyles = () => (
  <style>{`
    body {
      font-family: 'Inter', sans-serif;
      background-color: #111827;
      color: #d1d5db;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    input[type=number] {
      -moz-appearance: textfield;
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
      className={`w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-200 border ${error ? 'border-red-500' : 'border-gray-600'} text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    hackathonName: '',
    theme: '',
    startDate: '',
    endDate: '',
    judges: [{ username: '' }],
    criteria: [{ name: '' }],
  });
  const [hackathonImage, setHackathonImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
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

  const handleCriterionChange = (index, e) => {
    const { value } = e.target;
    const newCriteria = [...formData.criteria];
    newCriteria[index].name = value;
    setFormData(prev => ({ ...prev, criteria: newCriteria }));
  };

  const addCriterion = () => {
    setFormData(prev => ({ ...prev, criteria: [...prev.criteria, { name: '' }] }));
  };

  const removeCriterion = (index) => {
    const newCriteria = formData.criteria.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, criteria: newCriteria }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        setHackathonImage(file);
        setImagePreview(URL.createObjectURL(file));
        setErrors(prev => ({...prev, image: null}));
    } else {
        setHackathonImage(null);
        setImagePreview('');
        if(file) {
            setErrors(prev => ({...prev, image: 'Please select a valid image file.'}));
        }
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    if (!formData.phone) newErrors.phone = 'Phone number is required.';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.hackathonName) newErrors.hackathonName = 'Hackathon name is required.';
    if (!formData.theme) newErrors.theme = 'A theme or topic is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    if (!formData.endDate) newErrors.endDate = 'End date is required.';
    else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date cannot be before the start date.';
    }
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = { judges: [] };
    let hasError = false;
    formData.judges.forEach((judge, index) => {
        const judgeError = {};
        if (!judge.username) {
            judgeError.username = "Judge's username is required.";
            hasError = true;
        }
        newErrors.judges[index] = judgeError;
    });
    return hasError ? newErrors : {};
  };

  const validateStep4 = () => {
    const newErrors = { criteria: [] };
    let hasError = false;
    formData.criteria.forEach((criterion, index) => {
        const criterionError = {};
        if (!criterion.name) {
            criterionError.name = "Criterion name is required.";
            hasError = true;
        }
        newErrors.criteria[index] = criterionError;
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

    if (Object.keys(newErrors).length === 0) {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    setStep(s => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Hackathon Image File:', hackathonImage);
    nextStep();
  };

  const steps = ['Personal Info', 'Hackathon Details', 'Add Judges', 'Scoring Criteria', 'Review & Submit'];

  const StepIndicator = useMemo(() => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center w-20">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${step > index + 1 ? 'bg-green-500' : step === index + 1 ? 'bg-indigo-600' : 'bg-gray-700'}`}>
              {step > index + 1 ? <CheckCircle className="w-6 h-6 text-white" /> : <span className="text-white font-bold">{index + 1}</span>}
            </div>
            <p className={`mt-2 text-xs text-center transition-colors duration-500 ${step >= index + 1 ? 'text-white' : 'text-gray-400'}`}>{label}</p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-auto border-t-2 transition-colors duration-500 mx-2 sm:mx-4 ${step > index + 1 ? 'border-green-500' : 'border-gray-700'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  ), [step, steps]);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">DevFiesta 2025</span>
            </h1>
            <p className="mt-3 text-lg text-gray-400">Host Registration Portal</p>
          </header>

          <main className="bg-[#BCD0FF] backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-4 sm:p-8 lg:p-10">
            {step <= steps.length && StepIndicator}

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <FormInput id="fullName" name="fullName" type="text" placeholder="John Doe" value={formData.fullName} onChange={handleChange} icon={<User size={20} />} error={errors.fullName} />
                    <FormInput id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} icon={<Mail size={20} />} error={errors.email} />
                    <FormInput id="phone" name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} icon={<Phone size={20} />} error={errors.phone} />
                    <FormInput id="organization" name="organization" type="text" placeholder="Your Company/University (Optional)" value={formData.organization} onChange={handleChange} icon={<Building size={20} />} />
                  </div>
                </section>
              )}

              {step === 2 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Hackathon Details</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <FormInput id="hackathonName" name="hackathonName" type="text" placeholder="e.g., AI for Good Challenge" value={formData.hackathonName} onChange={handleChange} icon={<PartyPopper size={20} />} error={errors.hackathonName} />
                    <FormInput id="theme" name="theme" type="text" placeholder="e.g., Sustainability, FinTech, Health" value={formData.theme} onChange={handleChange} icon={<Hash size={20} />} error={errors.theme} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormInput id="startDate" name="startDate" type="date" placeholder="Start Date" value={formData.startDate} onChange={handleChange} icon={<Calendar size={20} />} error={errors.startDate} />
                      <FormInput id="endDate" name="endDate" type="date" placeholder="End Date" value={formData.endDate} onChange={handleChange} icon={<Calendar size={20} />} error={errors.endDate} />
                    </div>
                    <div>
                        <label htmlFor="hackathon-image-upload" className="block text-sm font-medium text-gray-300 mb-2">Hackathon Banner Image (Optional)</label>
                        <input id="hackathon-image-upload" name="hackathon-image" type="file" className="hidden-file-input" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                        <label htmlFor="hackathon-image-upload" className="cursor-pointer flex items-center justify-center gap-2 w-full px-6 py-2.5 rounded-lg border-2 border-dashed border-gray-600 hover:border-indigo-500 hover:text-indigo-400 text-gray-400 font-semibold transition-colors">
                            <ImageIcon size={18} />
                            {hackathonImage ? 'Change Image' : 'Upload an Image'}
                        </label>
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Hackathon banner preview" className="w-full h-auto rounded-lg object-cover" />
                            </div>
                        )}
                    </div>
                  </div>
                </section>
              )}

              {step === 3 && (
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Add Judges</h2>
                    <div className="space-y-4">
                        {formData.judges.map((judge, index) => (
                            <div key={index} className="flex items-center gap-2 sm:gap-4">
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
                                    <button type="button" onClick={() => removeJudge(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addJudge} className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border-2 border-dashed border-gray-600 hover:border-indigo-500 hover:text-indigo-400 text-gray-400 font-semibold transition-colors">
                        <Users size={18} />
                        Add Another Judge
                    </button>
                </section>
              )}

              {step === 4 && (
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Define Scoring Criteria</h2>
                    <div className="space-y-4">
                        {formData.criteria.map((criterion, index) => (
                            <div key={index} className="flex items-center gap-2 sm:gap-4">
                                <div className="flex-grow">
                                    <FormInput 
                                        id={`criterion-name-${index}`} 
                                        name="name" 
                                        type="text" 
                                        placeholder={`Criterion ${index + 1} (e.g., Innovation)`}
                                        value={criterion.name} 
                                        onChange={(e) => handleCriterionChange(index, e)} 
                                        icon={<ListChecks size={20} />} 
                                        error={errors.criteria?.[index]?.name} 
                                    />
                                </div>
                                {formData.criteria.length > 1 && (
                                    <button type="button" onClick={() => removeCriterion(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addCriterion} className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border-2 border-dashed border-gray-600 hover:border-indigo-500 hover:text-indigo-400 text-gray-400 font-semibold transition-colors">
                        <PlusCircle size={18} />
                        Add Another Criterion
                    </button>
                </section>
              )}

              {step === 5 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Review Your Information</h2>
                  <div className="space-y-4 bg-gray-900/50 p-4 sm:p-6 rounded-lg">
                    {imagePreview && (
                        <div className="mb-4">
                            <span className="text-gray-400 capitalize block mb-2">Hackathon Banner</span>
                            <img src={imagePreview} alt="Hackathon banner" className="w-full h-auto rounded-lg object-cover max-h-48" />
                        </div>
                    )}
                    {Object.entries(formData).map(([key, value]) => {
                      if (key === 'judges' || key === 'criteria') return null;
                      return (
                        <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-white font-medium text-left sm:text-right break-all">{value || 'N/A'}</span>
                        </div>
                      )
                    })}
                    <div className="pt-4 border-t border-gray-700">
                        <h3 className="text-gray-400 capitalize mb-2">Judges</h3>
                        <div className="space-y-2">
                        {formData.judges.map((judge, index) => (
                            <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-800 rounded-md">
                                <span className="text-white font-medium">{judge.username || 'Unnamed Judge'}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                        <h3 className="text-gray-400 capitalize mb-2">Scoring Criteria</h3>
                        <div className="space-y-2">
                        {formData.criteria.map((criterion, index) => (
                            <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-800 rounded-md">
                                <span className="text-white font-medium">{criterion.name || 'Unnamed Criterion'}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                  </div>
                </section>
              )}

              {step === 6 && (
                <section className="text-center">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white">Registration Successful!</h2>
                  <p className="text-gray-400 mt-2">Thank you for registering to host. We've received your information and will be in touch soon.</p>
                </section>
              )}

              {step <= steps.length && (
                <div className="mt-8 flex justify-between items-center">
                  {step > 1 && step <= steps.length ? (
                    <button type="button" onClick={prevStep} className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg bg-[#4060C1] hover:bg-gray-500 text-white font-semibold transition-colors text-sm sm:text-base">
                      <ArrowLeft size={18} />
                      Back
                    </button>
                  ) : <div></div>}
                  
                  {step < steps.length && (
                    <button type="button" onClick={nextStep} className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg 
                    bg-[#6D8EF2] hover:bg-indigo-700 text-white font-semibold transition-colors text-sm sm:text-base">
                      Next
                      <ArrowRight size={18} />
                    </button>
                  )}

                  {step === steps.length && (
                     <button type="submit" className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors text-sm sm:text-base">
                      Confirm & Submit
                      <CheckCircle size={18} />
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
