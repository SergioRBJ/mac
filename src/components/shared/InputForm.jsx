import { twMerge } from "tailwind-merge";

const InputForm = ({
  onChange,
  type = "text",
  register = {},
  classNames = "",
  ...props
}) => {
  switch (type) {
    case "text":
      return (
        <input
          className={twMerge(
            "border border-gray-300 text-md rounded-lg block w-full p-lg shadow-xs",
            classNames
          )}
          autoComplete="off"
          {...register}
          {...props}
          onChange={onChange}
        />
      );

    case "numeric":
      return (
        <input
          className={twMerge(
            "border border-gray-300 text-md rounded-lg block w-full p-lg shadow-xs",
            classNames
          )}
          type="number"
          autoComplete="off"
          {...register}
          {...props}
          onChange={onChange}
        />
      );
    default:
      return (
        <input
          type={type}
          className={twMerge(
            "border border-gray-300 text-md rounded-lg block w-full p-lg shadow-xs",
            classNames
          )}
          autoComplete="off"
          {...register}
          {...props}
          onChange={onChange}
        />
      );
  }
};

export { InputForm };
