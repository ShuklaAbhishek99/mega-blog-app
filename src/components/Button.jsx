import React from "react";

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    // we use ...rest above to take all attributes passed for button, we named a few,
    // if person enters more it will be handled
    return (
        <button
            className={`px-2 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
            {...props}
        > 
            {children}
        </button>
    );
}

export default Button;
