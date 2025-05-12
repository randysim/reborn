'use client'

interface UsernameStepProps {
    username: string
    error: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function UsernameStep({ username, error, onChange }: UsernameStepProps) {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-white">
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    maxLength={30}
                    value={username}
                    onChange={onChange}
                    className={`mt-1 block w-full px-3 py-2 bg-white/10 border ${error ? 'border-red-500' : 'border-white/20'} rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your username"
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                <div className="mt-1 text-sm text-white/60">
                    <p>Requirements:</p>
                    <ul className="list-disc list-inside">
                        <li>Must not be empty</li>
                        <li>Maximum 30 characters</li>
                    </ul>
                </div>
            </div>
        </div>
    )
} 