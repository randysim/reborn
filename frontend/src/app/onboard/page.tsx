'use client'
import { UserContext } from "../components/Auth"
import { useContext, useState } from "react"
import { redirect } from "next/navigation"
import { API_URL } from "../lib/constants"
import UsernameStep from "./components/UsernameStep"
import TimezoneStep from "./components/TimezoneStep"
import BirthDateStep from "./components/BirthDateStep"

export default function Onboard() {
    const { user, signedIn, refreshUser } = useContext(UserContext)
    const [step, setStep] = useState(1)
    const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const [formData, setFormData] = useState<UserUpdateRequest>({
        username: '',
        timezone: defaultTimezone,
        birthDate: ''
    })

    const [errors, setErrors] = useState({
        username: '',
        timezone: ''
    })

    // Get all timezones
    const timezones = Intl.supportedValuesOf('timeZone')

    if (!signedIn) redirect("/");
    if (user.onboarded) redirect("/dashboard");

    const validateUsername = (username: string) => {
        if (!username.trim()) {
            return 'Username is required'
        }
        if (username.length > 30) {
            return 'Username must be 30 characters or less'
        }
        return ''
    }

    const validateTimezone = (timezone: string) => {
        if (!timezone) {
            return 'Timezone is required'
        }
        if (!timezones.includes(timezone)) {
            return 'Please select a valid timezone from the list'
        }
        return ''
    }

    const validateBirthDate = (birthDate: string) => {
        if (!birthDate) {
            return 'Birth date is required'
        }

        return ''
    }

    const isStepValid = () => {
        if (step === 1) {
            return !validateUsername(formData.username)
        } else if (step === 2) {
            return !validateTimezone(formData.timezone)
        } else if (step === 3) {
            return !validateBirthDate(formData.birthDate)
        }
        return false
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        // Clear error when user starts typing
        if (name === 'username') {
            setErrors(prev => ({
                ...prev,
                username: ''
            }))
        }
    }

    const handleTimezoneSelect = (timezone: string) => {
        setFormData(prev => ({
            ...prev,
            timezone
        }))

        setErrors(prev => ({
            ...prev,
            timezone: ''
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault()

        try {
            const response = await fetch(`${API_URL}/api/users/me/onboard`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            
            if (response.ok) {
                await refreshUser()
                redirect('/dashboard')
            }
        } catch (error) {
            console.error('Error during onboarding:', error)
        }
    }

    const nextStep = () => {
        if (step === 1) {
            const usernameError = validateUsername(formData.username)
            if (usernameError) {
                setErrors(prev => ({ ...prev, username: usernameError }))
                return
            }
        } else if (step === 2) {
            if (!timezones.includes(formData.timezone)) {
                setErrors(prev => ({ 
                    ...prev, 
                    timezone: 'Please select a valid timezone from the list' 
                }))
                return
            }
        }
        setStep(prev => prev + 1)
    }

    const prevStep = () => setStep(prev => prev - 1)

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#04090e]">
            <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-sm border-2 border-white [box-shadow:0_0_20px_#3b82f6]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white [text-shadow:0_0_10px_#3b82f6]">Onboarding</h1>
                    <p className="mt-2 text-white/80">Step {step} of 3</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {step === 1 && (
                        <UsernameStep
                            username={formData.username}
                            error={errors.username}
                            onChange={handleInputChange}
                        />
                    )}

                    {step === 2 && (
                        <TimezoneStep
                            timezone={formData.timezone}
                            error={errors.timezone}
                            onTimezoneSelect={handleTimezoneSelect}
                        />
                    )}

                    {step === 3 && (
                        <BirthDateStep
                            birthDate={formData.birthDate}
                            onChange={handleInputChange}
                        />
                    )}

                    <div className="flex justify-between">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-4 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
                            >
                                Previous
                            </button>
                        )}
                        
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className={`px-4 py-2 border-2 border-white text-white transition-colors ${
                                    isStepValid() 
                                        ? 'hover:bg-white hover:text-black cursor-pointer' 
                                        : 'opacity-50 cursor-not-allowed'
                                }`}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!isStepValid()}
                                className={`px-4 py-2 border-2 border-white text-white transition-colors ${
                                    isStepValid() 
                                        ? 'hover:bg-white hover:text-black cursor-pointer' 
                                        : 'opacity-50 cursor-not-allowed'
                                }`}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}