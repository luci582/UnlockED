import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const CourseCardSkeleton = () => {
  return (
    <Card className="group relative overflow-hidden 
      min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] xl:min-h-[300px] 2xl:min-h-[280px]
      [@media(min-aspect-ratio:21/9)]:min-h-[260px]
      [@media(max-aspect-ratio:4/3)]:min-h-[340px]
      flex flex-col">
      <CardHeader className="pb-2 sm:pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <Skeleton className="h-5 w-20 sm:h-6 sm:w-24" />
              <Skeleton className="h-4 w-10 sm:h-5 sm:w-12" />
              <Skeleton className="h-4 w-12 sm:h-5 sm:w-16" />
            </div>
            <Skeleton className="h-3 w-24 sm:h-4 sm:w-32" />
          </div>
          <div className="flex flex-col items-end gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Skeleton className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full" />
              <Skeleton className="h-3 w-6 sm:h-4 sm:w-8" />
            </div>
            <Skeleton className="h-6 w-16 sm:h-7 sm:w-20 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-4 w-full sm:h-5 mt-1.5 sm:mt-2" />
      </CardHeader>

      <CardContent className="pb-2 sm:pb-3 flex-1 flex flex-col">
        <div className="flex items-center gap-3 sm:gap-4 text-sm mb-3 sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4 rounded-full" />
            <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4 rounded-full" />
            <Skeleton className="h-3 w-8 sm:h-4 sm:w-12" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-1 
          max-h-[60px] sm:max-h-[70px] lg:max-h-[80px] xl:max-h-[70px] 2xl:max-h-[60px]
          [@media(min-aspect-ratio:21/9)]:max-h-[50px]
          [@media(max-aspect-ratio:4/3)]:max-h-[100px]">
          <Skeleton className="h-6 w-12 sm:h-7 sm:w-16 rounded-full" />
          <Skeleton className="h-6 w-16 sm:h-7 sm:w-20 rounded-full" />
          <Skeleton className="h-6 w-10 sm:h-7 sm:w-14 rounded-full" />
          <Skeleton className="h-6 w-14 sm:h-7 sm:w-18 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex-shrink-0">
        <Skeleton className="h-7 w-full sm:h-8 sm:w-full rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default CourseCardSkeleton;
