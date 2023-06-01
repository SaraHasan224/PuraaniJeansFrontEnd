import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

export default function InternetConnection() {
    // Online state
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Update network status
    const handleStatusChange = () => {
        setIsOnline(navigator.onLine);
        if(navigator.onLine){
            toast.success("You Are Online");
        }else {
            toast.error("You Are Offline!!");
        }
    };

    useEffect(() => {
        // Listen to the online status
        window.addEventListener('online', handleStatusChange);

        // Listen to the offline status
        window.addEventListener('offline', handleStatusChange);

        // Specify how to clean up after this effect for performance improvment
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);

    return (<></>)
}