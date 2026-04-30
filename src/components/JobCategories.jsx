import Link from 'next/link';
import { categories, educationVacancies, postWiseRecruitment, sarkariResultSections, sarkariResultInfo } from '@/data/assets';

const DefenceIcon = () => (
    <svg className="w-12 h-12 text-[#2196F3]" viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 4c-1.1 0-2 .9-2 2v2h-6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h6v6h-10c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10v6H20c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10v8c0 1.1.9 2 2 2s2-.9 2-2v-8h10c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H34v-6h10c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H34v-6h6c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-6V6c0-1.1-.9-2-2-2z" />
    </svg>
);

const JobCategories = () => {
    return (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-8xl mx-auto">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1976D2] text-center mb-4">
                    SabhiJobs.com Leading Portal for Sabhi Jobs in Govt Department in India
                </h1>
                <div className="border-2 border-[#FFB300] rounded-lg overflow-hidden bg-white">
                    <div className="bg-white py-3 border-b border-gray-100">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#FF9800] text-center">Government Jobs By Top Categories</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {categories.map((category, index) => (
                            <Link key={category.id} href={category.link} className={`flex flex-col items-center justify-center p-4 sm:p-6 hover:bg-blue-50 transition-colors duration-200 group ${index < 5 ? 'border-b border-gray-200' : ''} ${(index + 1) % 5 !== 0 ? 'lg:border-r border-gray-200' : ''} ${(index + 1) % 4 !== 0 ? 'md:border-r' : 'md:border-r-0'} ${(index + 1) % 3 !== 0 ? 'sm:border-r' : 'sm:border-r-0'} ${(index + 1) % 2 !== 0 ? 'border-r' : ''}`}>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                                    {category.useEmoji ? <DefenceIcon /> : (
                                        <img src={category.icon} alt={category.name} className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                                    )}
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center uppercase tracking-wide group-hover:text-[#1976D2] transition-colors">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-8 border border-[#E3F2FD] rounded-lg overflow-hidden bg-white shadow-sm">
                    <div className="bg-white py-3 border-b border-[#E3F2FD]">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1976D2] text-center">Education Wise Govt Vacancies</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {educationVacancies.map((item, index) => (
                            <Link key={item.id} href={item.link} className={`px-4 py-3 sm:px-6 sm:py-4 text-[#1976D2] hover:bg-[#E3F2FD] hover:text-[#1565C0] transition-colors duration-200 font-medium text-sm sm:text-base ${index < educationVacancies.length - 4 ? 'border-b border-gray-100' : ''} ${(index + 1) % 4 !== 0 ? 'lg:border-r border-gray-100' : ''} ${(index + 1) % 3 !== 0 ? 'md:border-r' : 'md:border-r-0'} ${(index + 1) % 2 !== 0 ? 'sm:border-r' : 'sm:border-r-0'}`}>{item.name}</Link>
                        ))}
                    </div>
                </div>
                <div className="mt-8 border border-[#E3F2FD] rounded-lg overflow-hidden bg-white shadow-sm">
                    <div className="bg-white py-3 border-b border-[#E3F2FD]">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#FF9800] text-center">Post Wise Recruitment List</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {postWiseRecruitment.map((item, index) => (
                            <Link key={item.id} href={item.link} className={`px-4 py-3 sm:px-6 sm:py-4 text-[#1976D2] hover:bg-[#E3F2FD] hover:text-[#1565C0] transition-colors duration-200 font-medium text-sm sm:text-base ${index < postWiseRecruitment.length - 4 ? 'border-b border-gray-100' : ''} ${(index + 1) % 4 !== 0 ? 'lg:border-r border-gray-100' : ''} ${(index + 1) % 3 !== 0 ? 'md:border-r' : 'md:border-r-0'} ${(index + 1) % 2 !== 0 ? 'sm:border-r' : 'sm:border-r-0'}`}>{item.name}</Link>
                        ))}
                    </div>
                </div>
                <div className="mt-8 space-y-6">
                    {sarkariResultSections.map((section) => (
                        <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <div className="bg-[#D32F2F] py-3 px-4"><h2 className="text-lg sm:text-xl font-semibold text-white text-center">{section.title}</h2></div>
                            <div className="p-4 sm:p-6">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">{section.content}</p>
                                {section.listItems && (<ul className="mt-4 space-y-2">{section.listItems.map((item, index) => (<li key={index} className="text-gray-700 text-sm sm:text-base leading-relaxed">{item}</li>))}</ul>)}
                            </div>
                        </div>
                    ))}
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        <div className="bg-[#D32F2F] py-3 px-4"><h2 className="text-lg sm:text-xl font-semibold text-white text-center">{sarkariResultInfo.title}</h2></div>
                        <div className="p-4 sm:p-6">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">{sarkariResultInfo.intro}</p>
                            <p className="mt-4 text-gray-800 text-sm sm:text-base font-semibold">{sarkariResultInfo.disclaimer}</p>
                            <div className="mt-6 space-y-4">
                                {sarkariResultInfo.faqs.map((faq, index) => (
                                    <div key={index}>
                                        <p className="text-gray-800 font-semibold text-sm sm:text-base">{faq.question}</p>
                                        <p className="text-gray-700 text-sm sm:text-base mt-1">
                                            {faq.answer.split('Government Jobs').map((part, i) => (
                                                i === 0 ? part : (<span key={i}><Link href="/" className="text-[#1976D2] hover:underline">Government Jobs</Link>{part}</span>)
                                            ))}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobCategories;
