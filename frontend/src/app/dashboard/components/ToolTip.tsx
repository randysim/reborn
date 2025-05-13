import React, { useState } from 'react'

interface TooltipProps {
    children: React.ReactNode
    content: string
}

export function Tooltip({ children, content }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div 
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    {content}
                    <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
            )}
        </div>
    )
} 