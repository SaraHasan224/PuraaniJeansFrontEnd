import { useRouter } from 'next/router'

export default function ALink({ children, className, tabindex, target, style, ...props }) {
    const router = useRouter()

    function defaultFunction(e) {
        e.preventDefault();
        router.push(props.href, undefined, { shallow: true })
    }

    return (
        <a className={className} style={style} onClick={defaultFunction} tabindex={tabindex} target={target}>
            {children}
        </a>
    )
}