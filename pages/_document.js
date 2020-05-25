import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    // const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    // const sheet = new ServerStyleSheet();
    // const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    // const styleTags = sheet.getStyleElement();
    // return { ...page, styleTags };
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => ({
            ...sheet.collectStyles(<App {...props} />)
            // ...sheets.collect(<App {...props} />),
          })
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {/*{sheets.getStyleElement()}*/}
            {sheet.getStyleElement()}
            {flush() || null}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
