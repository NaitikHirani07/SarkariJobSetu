import Link from 'next/link';
import { sidebarData } from '@/data/assets';
import { SidebarSection } from '@/components/JobPageTemplate';
import AdBanner from '@/components/AdBanner';
import CommentList from '@/components/CommentList';

export const metadata = {
    title: 'About Us - SarkariJobSetu',
    description: 'Learn more about SarkariJobSetu, India’s trusted government job portal for the latest updates on recruitment, results, and admit cards.',
};

export default function AboutUsPage() {
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
                        About Us – SarkariJobSetu
                    </h1>

                    <div className="prose prose-blue max-w-none text-gray-700 space-y-8">
                        <section>
                            <p className="text-xl font-medium text-gray-800 leading-relaxed">
                                <strong>Welcome to SarkariJobSetu.com – India’s Trusted Government Job Portal</strong>
                            </p>
                            <p className="mt-4">
                                SarkariJobSetu is a fast-growing platform dedicated to providing the latest updates on <strong>government jobs (Sarkari Naukri), admit cards, results, answer keys, and exam notifications</strong> across India.
                            </p>
                            <p className="mt-2">
                                Our goal is to make job searching simple, reliable, and accessible for every aspirant—whether you are a <strong>10th pass, 12th pass, graduate, or postgraduate candidate</strong>.
                            </p>
                        </section>

                        <hr className="border-gray-100" />

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">🎯</span> Our Mission
                            </h2>
                            <p className="mt-4">
                                Our mission is to deliver <strong>accurate, fast, and verified government job information</strong> to help users stay ahead in their career journey.
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2 font-medium">
                                <li>Providing real-time job alerts</li>
                                <li>Sharing official notifications without misleading information</li>
                                <li>Making job search easy for everyone</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">📌</span> What SarkariJobSetu Offers
                            </h2>
                            <p className="mt-4">At SarkariJobSetu, we cover a wide range of job-related updates:</p>
                            
                            <div className="grid sm:grid-cols-2 gap-6 mt-6">
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                        <span className="bg-blue-600 w-2 h-2 rounded-full"></span> 🔹 Govt Job Updates
                                    </h3>
                                    <ul className="space-y-1 text-sm text-blue-800">
                                        <li>• Central Government Jobs</li>
                                        <li>• State Government Jobs</li>
                                        <li>• PSU Jobs</li>
                                        <li>• Contract & Apprentice Jobs</li>
                                    </ul>
                                </div>
                                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                                    <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                                        <span className="bg-orange-600 w-2 h-2 rounded-full"></span> 🔹 Popular Categories
                                    </h3>
                                    <ul className="space-y-1 text-sm text-orange-800">
                                        <li>• Railway Jobs</li>
                                        <li>• Banking Jobs</li>
                                        <li>• SSC Jobs</li>
                                        <li>• Defense & Teaching Jobs</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">⭐</span> Why Choose SarkariJobSetu?
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                                {[
                                    '100% Free Info', 'Daily Updates', 'User Friendly',
                                    'Official Links', 'No Registration', 'SEO Optimized'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <span className="text-green-500 font-bold">✔</span> {item}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-red-50 p-8 rounded-2xl border border-red-100">
                            <h2 className="text-2xl font-bold text-red-900 flex items-center gap-2 mb-4">
                                <span className="text-red-600 text-3xl">🔐</span> Data Accuracy & Transparency
                            </h2>
                            <p className="text-red-800 leading-relaxed">
                                We do not publish fake or misleading information. Every job update is verified from <strong>official government sources</strong>. However, users are advised to always check the official notification before applying.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">📞</span> Contact Us
                            </h2>
                            <p className="mt-4">For any queries, suggestions, or business inquiries:</p>
                            <div className="mt-4 space-y-2">
                                <p className="flex items-center gap-2">
                                    <span className="font-bold">📧 Email:</span> 
                                    <a href="mailto:jobcareeracademy0728@gmail.com" className="text-blue-600 hover:underline">jobcareeracademy0728@gmail.com</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-bold">🌐 Website:</span> 
                                    <a href="https://www.sarkarijobsetu.com" className="text-blue-600 hover:underline">https://www.sarkarijobsetu.com</a>
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
                    
                    <AdBanner slot="about-sidebar" className="mt-6" />
                    <CommentList jobId="" />
                </div>
            </div>
        </div>
    );
}
