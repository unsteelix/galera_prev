import Link  from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


export default function Admin() {
    const router = useRouter()
    
    useEffect(() => {
      router.push('/admin/posts')
    });

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