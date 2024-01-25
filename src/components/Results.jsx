import ResultItem from "./ResultItem";
const Results = ({ data, isLoading }) => {
  return (
    <div className="relative z-10 mx-auto mt-5 flex min-h-[17rem] flex-col items-center justify-center gap-3 rounded-lg bg-white px-12 py-5 shadow-2xl m:relative m:justify-between md:min-h-32 md:max-w-[42rem] md:flex-row lg:max-w-[50rem]">
      {isLoading ? (
        <p className="font-bold">Loading data...</p>
      ) : (
        <>
          <ResultItem title="ip adress" content={data.ip} />
          <ResultItem
            className="text-center md:border-l-2 md:pl-5 md:text-left"
            title="location"
            content={`${data.location.city} ${data.location.postalCode}`}
          />
          <ResultItem
            className="md:border-l-2 md:pl-5"
            title="timezone"
            content={data.location.timezone}
          />
          <ResultItem
            className="text-center md:border-l-2 md:pl-5"
            title="isp"
            content={data.isp}
          />
        </>
      )}
    </div>
  );
};
export default Results;
