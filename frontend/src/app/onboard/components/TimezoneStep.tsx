'use client'
import { useState, useEffect } from 'react'

interface TimezoneStepProps {
    timezone: string
    error: string
    onTimezoneSelect: (timezone: string) => void
}

export default function TimezoneStep({ timezone, error, onTimezoneSelect }: TimezoneStepProps) {
    const [timezoneSearch, setTimezoneSearch] = useState(timezone)
    const [filteredTimezones, setFilteredTimezones] = useState<string[]>([])
    const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false)

    // Get all timezones
    const timezones = Intl.supportedValuesOf('timeZone')

    useEffect(() => {
        const searchTerm = timezoneSearch.toLowerCase().replace(/\s+/g, '_')
        const filtered = timezones.filter(tz => 
            tz.toLowerCase().replace(/\s+/g, '_').includes(searchTerm)
        )
        setFilteredTimezones(filtered)
    }, [timezoneSearch])

    const handleTimezoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTimezoneSearch(value)
        setShowTimezoneDropdown(true)

        onTimezoneSelect(value);
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <label htmlFor="timezone" className="block text-sm font-medium text-white">
                    Timezone
                </label>
                <input
                    id="timezone"
                    type="text"
                    value={timezoneSearch}
                    onChange={handleTimezoneInputChange}
                    onFocus={() => setShowTimezoneDropdown(true)}
                    onBlur={() => {
                        setTimeout(() => setShowTimezoneDropdown(false), 200)
                    }}
                    className={`mt-1 block w-full px-3 py-2 bg-white/10 border ${error ? 'border-red-500' : 'border-white/20'} rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Search timezone..."
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                <div className="mt-1 text-sm text-white/60">
                    <p>Requirements:</p>
                    <ul className="list-disc list-inside">
                        <li>Must select a valid timezone from the list</li>
                    </ul>
                </div>
                {showTimezoneDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-[#1a1f2e] border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredTimezones.length > 0 ? (
                            filteredTimezones.map((tz) => (
                                <div
                                    key={tz}
                                    onClick={() => {
                                        onTimezoneSelect(tz)
                                        setTimezoneSearch(tz)
                                        setShowTimezoneDropdown(false)
                                    }}
                                    className="px-4 py-2 text-white hover:bg-white/20 cursor-pointer"
                                >
                                    {tz}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-white">No timezones found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
} 