import Link from 'next/link';
import { sidebarData } from '@/data/assets';
import { SidebarSection } from '@/components/JobPageTemplate';
import AdBanner from '@/components/AdBanner';
import CommentList from '@/components/CommentList';

export const metadata = {
    title: 'Privacy Policy - SarkariJobSetu',
    description: 'Privacy Policy for SarkariJobSetu. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicyPage() {
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
                        Privacy Policy – SarkariJobSetu
                    </h1>

                    <div className="prose prose-blue max-w-none text-gray-700 space-y-8">
                        <section>
                            <p className="text-xl font-medium text-gray-800 leading-relaxed">
                                <strong>Welcome to SarkariJobSetu.com. Your privacy is extremely important to us.</strong>
                            </p>
                            <p className="mt-4">
                                This Privacy Policy document outlines the types of information that is collected and recorded by SarkariJobSetu and how we use it. By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                            </p>
                        </section>

                        <hr className="border-gray-100" />

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">📌</span> Information We Collect
                            </h2>
                            <p className="mt-4 font-medium">We may collect personal and non-personal information in various ways:</p>
                            
                            <div className="grid sm:grid-cols-2 gap-6 mt-6">
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                        <span className="bg-blue-600 w-2 h-2 rounded-full"></span> 🔹 Personal Information
                                    </h3>
                                    <ul className="space-y-1 text-sm text-blue-800">
                                        <li>• Name (only if provided voluntarily)</li>
                                        <li>• Email address (via contact forms or subscriptions)</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <span className="bg-gray-400 w-2 h-2 rounded-full"></span> 🔹 Non-Personal Information
                                    </h3>
                                    <ul className="space-y-1 text-sm text-gray-800">
                                        <li>• IP address & Browser type</li>
                                        <li>• ISP & Date/time stamp</li>
                                        <li>• Referring/exit pages</li>
                                        <li>• Number of clicks</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">🍪</span> Cookies and Web Beacons
                            </h2>
                            <p className="mt-4">
                                Like any other website, SarkariJobSetu uses "cookies" to store information including visitors' preferences and the pages on the website that the visitor accessed or visited.
                            </p>
                            <div className="bg-blue-50/50 p-6 rounded-xl mt-4 border border-blue-50">
                                <p className="font-bold text-blue-900 mb-2">These cookies help us:</p>
                                <ul className="list-disc pl-6 space-y-1 text-blue-800 font-medium">
                                    <li>Improve website functionality</li>
                                    <li>Customize user experience</li>
                                    <li>Serve relevant advertisements</li>
                                </ul>
                            </div>
                        </section>

                        <section className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                            <h2 className="text-2xl font-bold text-orange-900 flex items-center gap-2 mb-4">
                                <span className="text-orange-600 text-3xl">📢</span> Google AdSense & Advertising Partners
                            </h2>
                            <p className="text-orange-800 leading-relaxed">
                                We use third-party advertising services such as <strong>Google AdSense</strong> to display ads. Google uses technologies like cookies (such as the <strong>DoubleClick cookie</strong>) to serve ads based on your visit to our website and other websites.
                            </p>
                            <div className="mt-4">
                                <a href="https://www.google.com/settings/ads" target="_blank" className="text-orange-600 font-bold hover:underline">Opt out of personalized advertising →</a>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">🤝</span> Third-Party Privacy Policies
                            </h2>
                            <p className="mt-4">
                                SarkariJobSetu's Privacy Policy does not apply to other advertisers or websites. We advise users to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">🔐</span> How We Protect Your Data
                            </h2>
                            <p className="mt-4">
                                We implement appropriate security measures to safeguard your personal information. However, no method of transmission over the Internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-3xl">👶</span> Children's Information
                            </h2>
                            <p className="mt-4">
                                SarkariJobSetu does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child provided this information, please contact us immediately.
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-6 mt-12">
                            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                                <h2 className="text-xl font-bold text-indigo-900 mb-3">🇪🇺 GDPR Rights</h2>
                                <p className="text-sm text-indigo-800 leading-relaxed">
                                    You have the right to access, correct, delete, restrict, and object to the processing of your data.
                                </p>
                            </div>
                            <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100">
                                <h2 className="text-xl font-bold text-teal-900 mb-3">🇺🇸 CCPA Rights</h2>
                                <p className="text-sm text-teal-800 leading-relaxed">
                                    California users have the right to request disclosure of collected data and deletion. We do not sell user data.
                                </p>
                            </div>
                        </div>

                        <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <span className="text-blue-600 text-3xl">📞</span> Contact Us
                            </h2>
                            <p className="mb-4">If you have any questions or suggestions about our Privacy Policy, contact us:</p>
                            <div className="space-y-2">
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
                    
                    <AdBanner slot="privacy-sidebar" className="mt-6" />
                    <CommentList jobId="" />
                </div>
            </div>
        </div>
    );
}
