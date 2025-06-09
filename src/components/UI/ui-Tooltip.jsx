
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// This component is called a Tooltip, and it is used to show tooltips when you 
// hover over, click, or interact with an element in a certain way.
export function Tooltip({ children, content }) {
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        className="bg-gray-900 text-white px-3 py-1.5 rounded text-sm animate-in fade-in-0 zoom-in-95"
                        sideOffset={5}
                    >
                        {content}
                        <TooltipPrimitive.Arrow className="fill-gray-900" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
