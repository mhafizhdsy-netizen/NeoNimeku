import { Skeleton } from "../ui/Skeleton/Skeleton"
const SkeletonItems = ({ count, className }) => (
    [...Array(count)].map((_, index) => <Skeleton key={index} className={className} />)
);
function SpotlightLoader() {
    return (
        <section className="w-full h-[450px] max-[1390px]:h-[400px] max-[1300px]:h-[350px] max-md:h-[300px] relative rounded-2xl overflow-hidden mt-[20px]">
            {/* Background Skeleton */}
            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            
            {/* Dots Pattern Overlay */}
            <div className="absolute inset-0 z-[1]" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-[1]" style={{
                background: 'linear-gradient(to right, rgba(10, 10, 10, 0.98) 0%, rgba(10, 10, 10, 0.92) 25%, rgba(10, 10, 10, 0.75) 50%, rgba(10, 10, 10, 0.45) 75%, rgba(10, 10, 10, 0.15) 100%)'
            }}></div>
            
            <div className="absolute flex flex-col left-0 bottom-0 w-[55%] p-8 z-[2] max-[1390px]:w-[50%] max-[1300px]:w-[600px] max-[1120px]:w-[65%] max-md:w-[90%] max-md:p-6 max-[300px]:w-full">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-[150px] h-[32px] rounded-full" />
                    <Skeleton className="w-[60px] h-[32px] rounded-full" />
                </div>
                
                {/* Title */}
                <Skeleton className="w-[70%] h-[48px] mb-5 rounded-xl max-[1390px]:h-[45px] max-[1300px]:h-[36px] max-md:h-[28px] max-md:w-[80%]" />
                
                {/* Mobile Buttons */}
                <div className="hidden max-md:flex max-md:mt-4 max-md:gap-x-3 max-md:w-full">
                    <Skeleton className="flex-1 h-[40px] rounded-xl" />
                    <Skeleton className="w-[50px] h-[40px] rounded-xl" />
                </div>
                
                {/* Info Tags */}
                <div className="flex h-fit justify-start items-center flex-wrap gap-3 mt-5 max-[1300px]:mt-4 max-md:hidden">
                    <SkeletonItems count={5} className="w-[80px] h-[32px] rounded-xl" />
                </div>
                
                {/* Description */}
                <div className="mt-4 flex flex-col gap-y-2 max-md:hidden">
                    <Skeleton className="w-full h-[16px] rounded-xl" />
                    <Skeleton className="w-[90%] h-[16px] rounded-xl" />
                    <Skeleton className="w-[75%] h-[16px] rounded-xl" />
                </div>
            </div>
            
            {/* Desktop Action Buttons */}
            <div className="absolute bottom-[50px] right-[40px] flex gap-x-4 z-[2] max-md:hidden">
                <Skeleton className="w-[150px] h-[48px] rounded-xl" />
                <Skeleton className="w-[130px] h-[48px] rounded-xl" />
            </div>
        </section >
    )
}

export default SpotlightLoader