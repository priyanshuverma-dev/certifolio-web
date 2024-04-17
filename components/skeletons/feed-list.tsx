import { Skeleton } from "../ui/skeleton";

const FeedLoading = () => {
  return (
    <div className="h-[100vh]">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="p-2">
          <div className="flex items-center justify-between py-2">
            <Skeleton className="w-40 h-6 mb-2" />
            <Skeleton className="w-10 h-10" />
          </div>
          <div className="w-full h-52">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="py-2 flex flex-col">
            <Skeleton className="w-20 h-4 mb-2" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedLoading;
