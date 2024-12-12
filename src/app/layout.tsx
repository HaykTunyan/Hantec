import type {Metadata} from "next";
import "./globals.scss";
import ReduxProvider from "@/lib/ReduxProvider";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import I18nProvider from "@/components/i18nProvider";
import {DemoProvider} from "@/context/DemoContext";
import RateModal from "@/components/rateModal";
import AgreementModal from "@/components/agreementModal";
import OverView from "@/components/overView";
import Script from "next/script";
// import CheckApplicationStatus from "@/components/checkApplicationStatus";

const metaTitle =
    "Start Trading with Hantec Financial in 3 Simple Steps: Register, Fund, and Trade - Fast and Easy!";
const description =
    "Open a trading account with Hantec Financial in just 5 minutes. Register, fund your account, and start trading today with our user-friendly platform.";

export const metadata: Metadata = {
    title: metaTitle,
    description: description,
    icons: {
        icon: "/favicons/favicon_32.svg",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />
            <meta property="og:title" content={metaTitle}/>
            <meta property="og:description" content={description}/>
        </Head>
        <Script
            id="google-tag-manager"
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({"gtm.start":
                new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=
                "https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-WK89KWCC');`,
            }}
        />
        <Script
            id="livechat"
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
              window.__lc = window.__lc || {};
              window.__lc.license = 14690442;
              (function(n, t, c) {
                function i(n) {
                  return e._h ? e._h.apply(null, n) : e._q.push(n);
                }
                var e = { _q: [], _h: null, _v: "2.0", on: function () {
                  i(["on", c.call(arguments)]);
                }, once: function () {
                  i(["once", c.call(arguments)]);
                }, off: function () {
                  i(["off", c.call(arguments)]);
                }, get: function () {
                  if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
                  return i(["get", c.call(arguments)]);
                }, call: function () {
                  i(["call", c.call(arguments)]);
                }, init: function () {
                  var n = t.createElement("script");
                  n.async = !0;
                  n.type = "text/javascript";
                  n.src = "https://cdn.livechatinc.com/tracking.js";
                  t.head.appendChild(n);
                }};
                !n.__lc.asyncInit && e.init();
                n.LiveChatWidget = n.LiveChatWidget || e;
              })(window, document, [].slice);
            `,
            }}
        />
        <body className={`font-aeonik`}>
        <noscript>
            <a href="https://www.livechat.com/chat-with/14690442/" rel="nofollow">
                Chat with us
            </a>
            , powered by{" "}
            <a
                href="https://www.livechat.com/?welcome"
                rel="noopener nofollow"
                target="_blank"
            >
                LiveChat
            </a>
        </noscript>
        <I18nProvider>
            <ReduxProvider>
                <RateModal/>
                <AgreementModal/>
                {/*<CheckApplicationStatus/>*/}
            </ReduxProvider>
        </I18nProvider>
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WK89KWCC"
                    height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe>
        </noscript>
        <DemoProvider>
            <I18nProvider>
                <ReduxProvider>
                    <OverView/>
                    {children}
                    <ToastContainer/>
                </ReduxProvider>
            </I18nProvider>
        </DemoProvider>
        </body>
        </html>
    );
}
