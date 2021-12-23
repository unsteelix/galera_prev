import Link  from 'next/link'
import Head from 'next/head'

export default function Admin() {
    return (
      <div>
        <Head>
          <title>Admin</title>
        </Head>
        <Link href="/admin/posts">
          <a>Posts</a>
        </Link>
      </div>
    )
}