'use client';

import {FaBookmark} from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarksStatus from "@/app/actions/checkBookmarksStatus";
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

export default function BookmarkButton({property}) {
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);

            return;
        }

        checkBookmarksStatus(property._id).then((res) => {
            if (res.error) toast.error(res.error.message);

            if (res.isBookmarked) setIsBookmarked(res.isBookmarked);

            setLoading(false);
        });
    }, [property._id, userId, checkBookmarksStatus])

    async function handleBookmarkClick() {
        if (!userId) {
            toast.error('You need to be signed in to bookmark a listing');

            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) return toast.error(res.error.message);

            setIsBookmarked(res.isBookmarked);

            toast.success(res.message);
        })
    }

    if (loading) {
        return <p className={'text-center'}>Loading...</p>
    }

    return (
        isBookmarked ? (
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                onClick={handleBookmarkClick}
            >
                <FaBookmark className={'mr-2'} /> Remove Bookmark
            </button>
            ) : (
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                onClick={handleBookmarkClick}
            >
                <FaBookmark className={'mr-2'}/> Bookmark Property
            </button>
        )
    )
}