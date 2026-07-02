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
        success: <CheckCircle size={20} />,
        error: <XCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        info: <Info size={20} />,
    };

    return (
        <div
            className={`
                fixed
                top-5
                left-1/2
                -translate-x-1/2
                z-[99999]
                text-white
                px-5
                py-3
                rounded-xl
                shadow-xl
                flex
                items-center
                gap-3
                font-bold
                transition-all
                duration-300
                ${colors[type]}
                ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-10 opacity-0"
                }
            `}
        >
            {icons[type]}

            <span>{message}</span>
        </div>
    );
}

export default Toast;