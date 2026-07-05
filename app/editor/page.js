import dynamic from 'next/dynamic';
import Editor from '@/components/Editor';
import ResumeSwitcher from '@/components/ResumeSwitcher';
import Tabs from '@/components/Tabs';

const Preview = dynamic(() => import('@/components/Resume/Preview'), {
    ssr: false,
    loading: () => (
        <div className="relative flex min-h-96 w-full animate-pulse items-center justify-center rounded-lg bg-gray-700/40 md:max-w-[24rem] 2xl:max-w-[28rem]">
            <div className="text-center text-sm text-gray-400">Loading preview…</div>
        </div>
    ),
});

const page = ({ searchParams: { tab = 'contact' } }) => {
    return (
        <div className="mx-auto mt-8 flex max-w-screen-xl flex-col-reverse gap-10 px-3 pb-8 md:mt-8 md:flex-row 2xl:mt-14 2xl:max-w-screen-2xl 2xl:gap-16">
            <Preview />
            <div className="flex-grow ">
                <div className="mb-4">
                    <ResumeSwitcher />
                </div>
                <Tabs activeTab={tab} />
                <Editor tab={tab} />
            </div>
        </div>
    );
};

export default page;
