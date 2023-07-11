import Head from 'next/head';

const Meta = ({ title, keyword, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keyword" content={keyword} />
      <meta name="description" content={description} />
      <meta chartSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: '',
  keyword: '',
  description: '',
};
export default Meta;
