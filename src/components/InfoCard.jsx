const InfoCard = ({ label, value }) => (
    <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
);
export default InfoCard;