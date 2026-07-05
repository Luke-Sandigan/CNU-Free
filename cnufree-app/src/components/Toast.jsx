import { useEffect, useState } from "react";
import {
    CheckCircle,
    XCircle,
    Info,
    AlertTriangle,
} from "lucide-react";

function Toast({ message, type }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 2700);

        return () => clearTimeout(timer);
    }, []);

    const colors = {
        success: "bg-green-600",
        error: "bg-red-600",
        warning: "bg-yellow-500",
        info: "bg-blue-600",
    };

    const icons = {
        success: <CheckCircle size={20} className="shrink-0" />,
        error: <XCircle size={20} className="shrink-0" />,
        warning: <AlertTriangle size={20} className="shrink-0" />,
        info: <Info size={20} className="shrink-0" />,
    };

    return (
        <div
            className={` fixed top-[max(1.25rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[99999] w-fit
                          max-w-[calc(100%-2rem)] text-white px-4 py-3 sm:px-5 rounded-xl shadow-xl flex items-center gap-3 font-bold text-sm
                          sm:text-base transition-all duration-300
                ${colors[type]}
                ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-10 opacity-0"
                }
            `}
        >
            {icons[type]}

            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {message}
            </span>
        </div>
    );
}

export default Toast;