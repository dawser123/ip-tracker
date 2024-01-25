const Input = ({ inputValue, setInputValue, onSubmit }) => {
  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center md:mt-10 "
    >
      <input
        value={inputValue}
        onChange={inputHandler}
        className="block h-10 w-full rounded-l-lg border-none p-2 text-sm  m:max-w-[35%] "
        placeholder="Searh for any IP adress"
      />
      <button className="h-10 rounded-r-lg bg-black px-4 text-white">
        <span>&gt;</span>
      </button>
    </form>
  );
};
export default Input;
