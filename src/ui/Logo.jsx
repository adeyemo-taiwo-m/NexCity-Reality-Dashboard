import useDarkMode from "../hooks/useDarkMode";

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <img
      className="h-8 lap:h-10"
      src={`/logo-${isDarkMode ? "dark" : "white"}.svg`}
      alt="NexCity Logo"
    />
  );
}

export default Logo;
