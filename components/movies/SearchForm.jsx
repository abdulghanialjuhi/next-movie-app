import React, { useRef } from 'react'
import { useRouter } from 'next/router';
import searchStyle from '../../styles/search.module.scss'
import { FaSearch } from 'react-icons/fa'
import { useEffect } from 'react';

export default function SearchForm({ openSearch, setOpenSearch }) {

    const SearchRef = useRef()
    const router = useRouter()

    useEffect(() => {
        SearchRef.current.value = ''
    }, [openSearch])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { value } = SearchRef.current

        if (value?.length > 0) {
            router.push(`/search/${value}`);
        }
    };

    const handleSvgClick = () => {
        setOpenSearch(!openSearch)
        SearchRef.current.value = ''
    }

    return (
        <form 
        className={`${searchStyle.form} ${openSearch ? searchStyle.open : ''}`}
        onSubmit={handleSubmit}>

            <div onClick={handleSvgClick}  
            className={searchStyle['svg-container']}>
                <FaSearch />
            </div>

            <input
            onClick={(e) => e.stopPropagation()}
            type="text"
            placeholder="Search by movie title"
            ref={SearchRef}
            />
        </form>
    )
}
