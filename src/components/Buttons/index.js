export const PrimaryButton = ({ text, loading, action, disabled }) => {
  return (
    <div
      onClick={disabled ? () => {} : action}
      className={` ${
        disabled ? "bg-primaryDisabled" : "bg-primary"
      } flex items-center justify-center w-full  px-10 py-3  cursor-pointer rounded font-body text-white`}
    >
      {text}
    </div>
  );
};

export const SecondaryButton = ({ text, loading, action, disabled }) => {
  return (
    <div
      onClick={action}
      className="flex items-center justify-center w-full  px-10 py-3 border rounded cursor-pointer font-body text-base"
    >
      {text}
    </div>
  );
};
