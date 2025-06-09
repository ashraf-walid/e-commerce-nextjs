
import * as SliderPrimitive from '@radix-ui/react-slider';

export function Slider({ min, max, value, onChange }) {
    return (
        <SliderPrimitive.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={value}
            max={max}
            min={min}
            step={100}
            onValueChange={onChange}
        >
            <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-1">
                <SliderPrimitive.Range className="absolute bg-blue-600 rounded-full h-full" />
            </SliderPrimitive.Track>
            {value.map((_, i) => (
                <SliderPrimitive.Thumb
                    key={i}
                    className="block w-4 h-4 bg-white border border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ))}
        </SliderPrimitive.Root>
    );
}