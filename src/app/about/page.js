"use client"
import { Select } from "antd";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";


export default function About() {
    const router = useRouter();
    const t = useTranslations('AboutPage');
    const localActive = useLocale();
    const cookieMiya = new Cookies();
    const [language, setLanguage] = useState("en"); // Default to 'en'

    useEffect(() => {
        const savedLang = cookieMiya.get("NEXT_LOCALE") || "en";
        setLanguage(savedLang);
    }, []);

    const handleChange = (lang) => {
        if (lang && lang !== language) {
            setLanguage(lang);
            cookieMiya.set("NEXT_LOCALE", lang, { path: "/" });
            router.refresh(); // Refresh the data and re-render the page content
        }
    };

    return (
        <div className=" container mx-auto py-8">
            <div className=" mx-4 md:mx-0 flex justify-between items-center h-[10vh] ">
                <Link className=" bg-slate-100 px-4 py-1" href={`/`}>Home</Link>
                <Select
                    defaultValue={localActive}
                    style={{ width: 120 }}
                    // disabled={isPending}
                    onChange={handleChange}
                    options={[
                        { value: 'en', label: 'English' },
                        { value: 'bn', label: 'Bangla' },
                    ]}
                />

            </div>
            <div className=" w-full h-[65vh] flex items-center justify-center">

                <div className=" mx-4 md:mx-0 w-auto 2xl:w-[60vw]">
                    <h1 className=" mb-10 text-4xl md:text-7xl lg:text-9xl font-bold">{t('title')}</h1>
                </div>
            </div>
        </div>
    );
}
