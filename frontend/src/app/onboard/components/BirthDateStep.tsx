'use client'

interface BirthDateStepProps {
    birthDate: string
    error: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function BirthDateStep({ birthDate, error, onChange }: BirthDateStepProps) {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-white">
                    Birth Date
                </label>
                <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    required
                    value={birthDate}
                    onChange={onChange}
                    className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-1 text-sm text-white/60">
                    <p>Requirements:</p>
                    <ul className="list-disc list-inside">
                        <li>Must select a valid date</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}