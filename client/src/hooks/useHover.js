import {useState, useEffect} from 'react'

export default function useHover(ref){
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if(!ref.current){
            return;
        }

        const node = ref.current;

        node.addEventListener('mouseenter', () => {setHover(true)})
        node.addEventListener('mousemove', () => {setHover(true)})
        node.addEventListener('mouseleave', () => {setTimeout(() => {setHover(false)}, 1000);})

        return function(){
            node.removeEventListener('mouseenter', () => {setHover(true)})
            node.removeEventListener('mousemove', () => {setHover(true)})
            node.removeEventListener('mouseleave', () => {setHover(false)})
        }

    }, [])

    return hover;
}