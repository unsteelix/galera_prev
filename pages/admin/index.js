import Link  from 'next/link'

export default function Admin() {
    return <div>
        <Link href="/admin/pages">
          <a>Pages</a>
        </Link>    
    </div>
}