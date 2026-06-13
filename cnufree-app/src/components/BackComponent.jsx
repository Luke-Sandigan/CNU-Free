import { useNavigate } from "react-router-dom";

function BackButton({ to }) {
    const navigate = useNavigate();

    return (
        <button   className="flex items-center gap-3 text-blue-600 font-bold text-sm hover:underline mb-6" onClick={() => navigate(to)}>
            <span>←</span>
            Back
        </button>
    );
}

export default BackButton;