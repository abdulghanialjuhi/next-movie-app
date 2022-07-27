import Head from 'next/head'

export default function Meta({ title, description, keywords }) {
  return (
    <Head>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" 
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
        <title>{ title }</title>
    </Head>
  )
}

Meta.defaultProps = {
    title: 'Movie DB',
    description: 'get the latest movies',
    keywords: 'movie db'
}
