import {useEffect, useState} from "react";

function useDebounce<T>(value: T, delay: number): T {

    const [debounced, setDebounced] = useState(value);


    useEffect(() => {
         const debounceCallback = setTimeout(() => {
             setDebounced(value)
         }, delay)

        return () => clearTimeout((debounceCallback))
    }, [value, delay])

    return debounced;
}

export default useDebounce;

//Usage

// function SearchInput() {
//     const [query, setQuery] = useState('');
//     const debounceQuery = useDebounce(query, 300);
//
//     useEffect(() => {
//         if(debounceQuery) search(debounceQuery)
//         },
//         [debounceQuery])
// }
