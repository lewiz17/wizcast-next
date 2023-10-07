export const SkeletonCard = () => {
  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center  px-20">
        <div className="mt-12 w-[195px] animate-pulse flex-row items-center justify-center">
          <div className="flex flex-col space-y-2">
            <div className="h-[280px] w-full bg-gray"></div>
            <div className="h-3 w-full bg-gray"></div>
            <div className="h-3 w-full bg-gray"></div>
          </div>
        </div>
      </div>
    </>
  );
};
