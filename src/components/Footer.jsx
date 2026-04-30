import Link from 'next/link';

const Footer = () => {
    const jobsByQualification = [
        { name: '10th Pass', link: '/10th-pass-govt-jobs' },
        { name: '12th Pass', link: '/12th-pass-govt-jobs' },
        { name: 'Graduate', link: '/graduate-jobs' },
        { name: 'Post Graduate', link: '/post-graduate-jobs' },
        { name: 'Diploma', link: '/diploma-govt-jobs' },
        { name: 'Engineering', link: '/engineering-jobs' },
        { name: 'Medical', link: '/medical-jobs' },
    ];
    const popularJobs = [
        { name: 'Bank Jobs', link: '/bank-jobs' },
        { name: 'Defence Jobs', link: '/defence-jobs' },
        { name: 'Police Jobs', link: '/police-jobs' },
        { name: 'Railway Jobs', link: '/railway-jobs' },
        { name: 'SSC Jobs', link: '/ssc-jobs' },
        { name: 'Teaching Jobs', link: '/teaching-jobs' },
        { name: 'UPSC Jobs', link: '/upsc-jobs' },
    ];
    const popularExams = [
        { name: 'IBPS PO', link: '/ibps-po' }, { name: 'RRB Group D', link: '/rrb-group-d' },
        { name: 'RRB JE', link: '/rrb-je' }, { name: 'RRB NTPC', link: '/rrb-ntpc' },
        { name: 'SSC CGL', link: '/ssc-cgl' }, { name: 'SSC GD', link: '/ssc-gd' },
        { name: 'UPP Constable', link: '/upp-constable' }, { name: 'UPSC IAS', link: '/upsc-ias' },
    ];
    const stateWiseJobs = [
        { name: 'Central Govt.', link: '/central-govt-jobs' }, { name: 'Bihar', link: '/bihar-jobs' },
        { name: 'Chhattisgarh', link: '/chhattisgarh-jobs' }, { name: 'Haryana', link: '/haryana-jobs' },
        { name: 'Jharkhand', link: '/jharkhand-jobs' }, { name: 'Madhya Pradesh', link: '/madhya-pradesh-jobs' },
        { name: 'Rajasthan', link: '/rajasthan-jobs' }, { name: 'Uttar Pradesh', link: '/uttar-pradesh-jobs' },
    ];

    return (
        <footer className="bg-[#F8F9FA] border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Jobs by Qualification</h3>
                        <ul className="space-y-2">
                            {jobsByQualification.map((item, index) => (
                                <li key={index}><Link href={item.link} className="text-gray-600 hover:text-blue-600 text-sm transition-colors">{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Jobs</h3>
                        <ul className="space-y-2">
                            {popularJobs.map((item, index) => (
                                <li key={index}><Link href={item.link} className="text-gray-600 hover:text-blue-600 text-sm transition-colors">{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Exams</h3>
                        <ul className="space-y-2">
                            {popularExams.map((item, index) => (
                                <li key={index}><Link href={item.link} className="text-gray-600 hover:text-blue-600 text-sm transition-colors">{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">State-wise Jobs</h3>
                        <ul className="space-y-2">
                            {stateWiseJobs.map((item, index) => (
                                <li key={index}><Link href={item.link} className="text-gray-600 hover:text-blue-600 text-sm transition-colors">{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-[#FFEBEE] border-l-4 border-red-500 mx-4 lg:mx-8 p-4 my-4">
                <p className="text-sm text-gray-700">
                    <span className="font-bold text-red-600">Disclaimer:</span>{' '}
                    SabhiJob.Com provides information for educational and informational purposes only. While we strive for accuracy, we make no warranties regarding the completeness or reliability of the information. Users are advised to verify details from official sources before making any decisions. If you have any issues or questions, please contact us at{' '}
                    <a href="mailto:help@sabhijob.com" className="text-blue-600 hover:underline font-medium">help@sabhijob.com</a>.
                </p>
            </div>
            <div className="border-t border-gray-300 bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm">
                            <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
                            <span className="text-gray-400">|</span>
                            <Link href="/disclaimer" className="text-gray-600 hover:text-blue-600 transition-colors">Disclaimer</Link>
                            <span className="text-gray-400">|</span>
                            <Link href="/trust-security" className="text-gray-600 hover:text-blue-600 transition-colors">Trust & Security</Link>
                            <span className="text-gray-400">|</span>
                            <Link href="/contact-us" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link>
                            <span className="text-gray-400">|</span>
                        </div>
                        <p className="text-sm text-gray-600">© 2025 <span className="text-red-500 font-medium">SabhiJob.Com</span>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
