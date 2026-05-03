import Link from 'next/link';
import { sidebarData } from '@/data/assets';
import { SidebarSection } from '@/components/JobPageTemplate';
import AdBanner from '@/components/AdBanner';
import CommentList from '@/components/CommentList';

export const metadata = {
    title: 'Disclaimer - SarkariJobSetu',
    description: 'Disclaimer for SarkariJobSetu. All information is for general informational purposes only.',
};

export default function DisclaimerPage() {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="max-w-screen-2xl mx-auto px-[40px] py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content Area */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-blue-600 pb-4 inline-block">
                        Disclaimer – SarkariJobSetu
                    </h1>

                    <div className="prose prose-blue max-w-none text-gray-700 space-y-8">
                        <section>
                            <p className="text-xl font-medium text-gray-800 leading-relaxed">
                                <strong>Welcome to SarkariJobSetu.com.</strong>
                            </p>
                            <p className="mt-4">
                                All the information on this website is published in good faith and for <strong>general informational purposes only</strong>. SarkariJobSetu does not make any warranties about the completeness, reliability, or accuracy of this information.
                            </p>
                        </section>

                        <hr className="border-gray-100" />

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">📌</span> Job Information Disclaimer
                            </h2>
                            <p className="mt-4 font-medium">SarkariJobSetu provides updates related to:</p>
                            
                            <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                {[
                                    'Government Jobs (Sarkari Naukri)',
                                    'Admit Cards',
                                    'Results',
                                    'Answer Keys',
                                    'Exam Notifications'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <span className="text-blue-600 font-bold">✔</span> {item}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-orange-50 p-6 rounded-xl mt-8 border border-orange-100 text-orange-900">
                                <p className="font-bold flex items-center gap-2 mb-2">
                                    <span>⚠️</span> Important Notice:
                                </p>
                                <p className="leading-relaxed">
                                    While we strive to provide <strong>accurate and up-to-date information</strong>, we do not guarantee that all details are always correct or complete. Users are strongly advised to <strong>always verify information from the official website or official notification</strong> before applying for any job.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">🔗</span> External Links Disclaimer
                            </h2>
                            <p className="mt-4">
                                Our website may contain links to external websites, including official government portals. While we aim to provide only quality links, we have <strong>no control over the content and nature of these external sites</strong>.
                            </p>
                        </section>

                        <section className="bg-red-50 p-8 rounded-2xl border border-red-100">
                            <h2 className="text-2xl font-bold text-red-900 flex items-center gap-2 mb-4">
                                <span className="text-red-600 text-3xl">❌</span> No Government Affiliation
                            </h2>
                            <p className="text-red-800 leading-relaxed font-bold">
                                SarkariJobSetu is NOT a government website and is not affiliated with any government organization.
                            </p>
                            <p className="mt-2 text-red-700">
                                We are an independent platform that collects and shares information from various official sources for user convenience.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">📢</span> Advertisement & Google AdSense
                            </h2>
                            <p className="mt-4">
                                This website uses third-party advertising services such as <strong>Google AdSense</strong>. Ads displayed may be personalized based on user interests. We do not control the content of advertisements shown.
                            </p>
                        </section>

                        <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <span className="text-gray-800 text-3xl">⚠️</span> Limitation of Liability
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Under no circumstances shall SarkariJobSetu be held liable for any loss or damage, including indirect or consequential loss, loss of data or profits, or any action taken based on the information available on this website.
                            </p>
                            <p className="font-bold text-gray-900">Your use of the website is solely at your own risk.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">📞</span> Contact Us
                            </h2>
                            <p className="mt-4">If you have any questions regarding this Disclaimer, you can contact us:</p>
                            <div className="mt-4 space-y-2">
                                <p className="flex items-center gap-2">
                                    <span className="font-bold">📧 Email:</span> 
                                    <a href="mailto:jobcareeracademy0728@gmail.com" className="text-blue-600 hover:underline">jobcareeracademy0728@gmail.com</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-bold">🌐 Website:</span> 
                                    <Link href="/" className="text-blue-600 hover:underline">www.sarkarijobsetu.com</Link>
                                </p>
                            </div>
                        </section>

                        <div className="pt-8 border-t border-gray-100 text-sm text-gray-400 italic">
                            📅 Last Updated: {today}
                        </div>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="w-full lg:w-80 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                        <div className="bg-gray-100 p-2 font-bold text-sm border-b border-gray-200 text-gray-800">Search Govt Jobs</div>
                        <div className="p-3">
                            <div className="flex">
                                <input type="text" placeholder="Search..." className="flex-1 border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-l" />
                                <button className="bg-black text-white px-3 py-1.5 rounded-r">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <SidebarSection title="Government Job vacancies" items={sidebarData.jobVacancies} />
                    <SidebarSection title="List of Jobs by Qualification" items={sidebarData.listByQualification} cols={2} />
                    
                    <AdBanner slot="disclaimer-sidebar" className="mt-6" />
                    <CommentList jobId="" />
                </div>
            </div>
        </div>
    );
}
