const ResultItem = ({ title, content,className }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="text-darkGray uppercase">{title}</span>
      <span className="text-veryDarkGray font-bold ">{content}</span>
    </div>
  );
};
export default ResultItem;
