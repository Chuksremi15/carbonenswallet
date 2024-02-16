import { CircularProgress } from "@material-ui/core";

export const PrimaryButton = ({ text, loading, action, disabled }) => {
  return (
    <div
      onClick={disabled ? () => {} : action}
      className={` ${
        disabled ? "bg-primaryDisabled" : "bg-primary"
      } flex items-center text-sm justify-center w-full   py-3  cursor-pointer rounded font-body text-white`}
    >
      {text}
    </div>
  );
};

export const SecondaryButton = ({ text, loading, action, disabled }) => {
  return (
    <div
      onClick={action}
      className="flex items-center text-sm justify-center w-full py-3 border border-primary text-textPrimary rounded cursor-pointer font-body "
    >
      {text}
    </div>
  );
};

export const CardPrimaryButton = ({ text, loading, action, disabled }) => {
  return (
    <div
      onClick={disabled ? () => {} : action}
      className={` ${
        disabled ? "bg-primaryDisabled" : "bg-primary"
      } flex items-center justify-center w-full  px-10 py-[9px]  cursor-pointer rounded font-body text-white text-sm hover:scale-[1.01]  transition-all duration-200`}
    >
      {loading ? <CircularProgress size={20} color="white" /> : text}
    </div>
  );
};

export const CardSecondaryButton = ({ text, loading, action, disabled }) => {
  return (
    <div
      onClick={action}
      className="flex items-center justify-center w-full  px-10 py-2 border border-primary text-textPrimary rounded cursor-pointer font-body text-sm hover:scale-[1.01]  transition-all duration-200"
    >
      {text}
    </div>
  );
};
