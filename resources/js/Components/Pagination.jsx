import { Link } from "@inertiajs/react"

export function Pagination({ links }) {
    return (
        <div className="mt-4 flex gap-4">
            {
                links.map((link, index) => (
                    <Link className={`bg-white h-10 px-4 leading-10 rounded hover:shadow-md text-gray-500 ${link.active ? 'bg-orange-400 text-white' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} key={index} href={link.url} disabled={link.active} />
                ))
            }
        </div>
    )
}
