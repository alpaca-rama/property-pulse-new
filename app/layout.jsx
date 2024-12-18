import '@/assets/styles/globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import NextTopLoader from "nextjs-toploader";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';
import {GlobalProvider} from "@/context/GlobalContext";

export const metadata = {
    title: 'Property Pulse',
    keywords: 'real estate, property, buy, sell, rent, property pulse',
    description: 'Property Pulse is a real estate platform that allows users to buy, sell, and rent properties.',
}

export default function RootLayout({children}) {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html lang="en">
                <body>
                <NextTopLoader showSpinner={false} color={'#3B82F6'}/>
                <Navbar/>
                <main>{children}</main>
                <Footer/>
                <ToastContainer/>
                </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    )
}