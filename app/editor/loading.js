import { CgSpinner } from 'react-icons/cg';

const EditorLoading = () => {
    return (
        <div className="mx-auto mt-8 flex max-w-screen-xl flex-col-reverse gap-10 px-3 pb-8 md:mt-8 md:flex-row 2xl:mt-14 2xl:max-w-screen-2xl 2xl:gap-16">
            {/* Preview skeleton */}
            <div className="relative flex min-h-96 w-full animate-pulse items-center justify-center rounded-lg bg-gray-700/40 md:max-w-[24rem] 2xl:max-w-[28rem]">
                <CgSpinner className="animate-spin text-4xl text-primary-400" />
            </div>

            {/* Editor skeleton */}
            <div className="flex-grow space-y-4">
                {/* Resume switcher placeholder */}
                <div className="h-10 w-48 animate-pulse rounded-md bg-gray-700/60" />

                {/* Tabs placeholder */}
                <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-9 w-20 animate-pulse rounded-md bg-gray-700/50" />
                    ))}
                </div>

                {/* Editor card placeholder */}
                <div className="card my-8 space-y-6 animate-pulse">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-24 rounded bg-gray-600/50" />
                                <div className="h-10 rounded-md bg-gray-600/30" />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-3">
                        <div className="h-9 w-28 rounded-md bg-gray-600/40" />
                        <div className="h-9 w-24 rounded-md bg-primary-400/20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorLoading;
