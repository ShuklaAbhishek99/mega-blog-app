import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
    const id = useId();

    return (
        <div className="w-full">
            {label && <label htmlFor={id}></label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {/* it may happen that there is no value received iniside option, this will crash the app */}
                {/* so mapping it optionally */}
                {options?.map((option) => (
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                ))}
            </select>
        </div>
    );
}

// this is another method of using forwardRef
export default React.forwardRef(Select);
