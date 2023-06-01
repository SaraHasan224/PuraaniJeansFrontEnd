import Link from "next/link";

export default function ALink ( { children, className, tabindex, target, style, ...props } ) {
    function defaultFunction ( e ) {
        if ( props.href == '#' ) {
            e.preventDefault();
        }
    }

    return (
        <Link { ...props }>
            <a className={ className } style={ style } onClick={ defaultFunction } tabindex={tabindex} target={target}>
                { children }
            </a>
        </Link>
    )
}