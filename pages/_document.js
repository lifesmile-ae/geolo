import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/dist/pages/_document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || 'en' };
  }

  render = () => (
    <Html
      dir={this.props.locale === 'ar' ? 'rtl' : 'ltr'}
      lang={this.props.locale}
    >
      <Head />
      <body className={this.props.locale === 'ar' ? 'rtlbody' : 'ltrbody'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
