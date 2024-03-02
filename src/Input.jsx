import React, { useId } from "react";

// => forwardRef() API in react is a way to take reference

// suppose there is a login form (which a single component)
// which has 3 components (inside) email field, password field, and a button,
// we will use these three components elsehwhere too other than our form,
// for that we can't send one type of data to take it back to our main component,
// for that we will use forwardRef() which will take the reference of the data to
// send it the DB, and actual main state will be present in our page which is form component

const Input = React.forwardRef(function Input(
    { label, type = "text", className = "", ...props },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1" htmlFor={id}>
                    {label}{" "}
                </label>
            )}

            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;
