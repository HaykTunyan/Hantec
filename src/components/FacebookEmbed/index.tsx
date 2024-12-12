"use client"; // Client component as we need to load SDK on the browser

import { useEffect } from "react";

const FacebookEmbed = ({ url }: { url: string }) => {
  useEffect(() => {
    // Load the Facebook SDK for JavaScript
    const loadFacebookSDK = () => {
      (window as any).fbAsyncInit = function () {
        (window as any).FB.init({
          appId: "8056220967790854", // Your App ID
          autoLogAppEvents: true,
          xfbml: true,
          version: "v20.0",
        });
      };

      // Load the Facebook SDK script
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      // Call XFBML parsing function
      script.onload = () => {
        (window as any).FB.XFBML.parse();
      };
    };

    loadFacebookSDK();
  }, [url]);

  return (
    <div>
      {/* Facebook Post embed element */}
      <div className="fb-post" data-href={url} data-width="500"></div>
    </div>
  );
};

export default FacebookEmbed;
