import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


const NotFound: React.FC = () => {
  return (
    <>
    <Helmet>
        <style>{`.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}`}</style>
        <meta charSet="utf-8" />
        <title>404 - Not Found</title>
        <meta content="404 - Not Found" property="og:title" />
        <meta content="404 - Not Found" property="twitter:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />
        <link
          href="https://assets-global.website-files.com/64f1a4c13c8ab83aab9bdbf6/css/ethos-fitness-sport-template.webflow.52d613d46.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}
            `,
          }}
        />
        <link
          href="https://assets-global.website-files.com/64f1a4c13c8ab83aab9bdbf6/64f751e57dec461ea3b956a7_ethos-favicon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link
          href="https://assets-global.website-files.com/64f1a4c13c8ab83aab9bdbf6/64fe03dd814f10bc8a69df0f_ethos-webclip.jpg"
          rel="apple-touch-icon"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__WEBFLOW_CURRENCY_SETTINGS = {"currencyCode":"USD","symbol":"$","decimal":".","fractionDigits":2,"group":",","template":"{{wf {\"path\":\"symbol\",\"type\":\"PlainText\"} }} {{wf {\"path\":\"amount\",\"type\":\"CommercePrice\"} }} {{wf {\"path\":\"currencyCode\",\"type\":\"PlainText\"} }}","hideDecimalForWholeNumbers":false};`,
          }}
        />
      </Helmet>
   
    <main className="main without-padding">
      <div className="hero is-fullscreen">
        <div className="hero-padding">
          <div className="container">
            <div className="vertical-flex with-gap-4em is-center">
              <div className="hero-title-block">
                <h1 className="heading is-hero-title">Page not found</h1>
              </div>
              <div className="hero-small-subtitle">
                <div className="hero-small-subtitle-line"></div>
                <p className="hero-small-subtitle-text">404</p>
                <div className="hero-small-subtitle-line"></div>
              </div>
              <div className="max-width-50 opacity-70">
                <p className="paragraph is-large">
                  Sorry, that page can't be found. Maybe the page has moved.
                </p>
              </div>
              <div className="hero-buttons">
                <Link to="/landingpage" className="button-1 w-inline-block">
                  <p className="button-1-text">Back to home</p>
                  <img
                    src="https://assets-global.website-files.com/64f1a4c13c8ab83aab9bdbf6/64f5e8c0cb1f1c2f324f35f5_arrow_downward_FILL0_wght700_GRAD0_opsz24-5.svg"
                    alt=""
                    className="button-1-icon"
                  />
                  <div className="button-1-full-bg"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bg-overlay"></div>
        <div className="image-3d-parallax">
          <div className="_3d-block">
            <div className="_3d-trigger">
              <div className="hero-image">
                <div className="hero-parallax-animation">
                  <div className="hero-animation-color-1"></div>
                  <div className="hero-animation-color-2"></div>
                  <img
                    src="https://assets-global.website-files.com/64f1a4c13c8ab83aab9bdbf6/64f3572971e6427a9c79344c_anastase-maragos-FP7cfYPPUKM-unsplash.webp"
                    alt=""
                    className="hero-cover-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default NotFound;
