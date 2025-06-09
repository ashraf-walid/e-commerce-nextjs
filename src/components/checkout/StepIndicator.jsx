export default function StepIndicator({ currentStep }) {
    const steps = [
      { label: "Payment", number: 1 },
      { label: "Delivery", number: 2 },
      { label: "Confirmation", number: 3 },
    ];
  
    if (!currentStep) return null;
  
    return (
      <div className="flex justify-between items-center mb-3">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 text-xs rounded-full flex items-center justify-center font-semibold transition-colors duration-200 ${
                  step.number <= currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number}
              </div>
              <span className="text-xs mt-1 text-gray-600">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 transition-colors duration-200 ${
                  step.number < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  }