// faviconHook.js
import { useState, useEffect } from "react";

const useFavicon = (url: string) => {
  const [favicon, setFavicon] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchFavicon = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try the standard favicon.ico location first
        const domain = new URL(url).origin;
        const standardFaviconUrl = `${domain}/favicon.ico`;

        // Use a CORS proxy to avoid issues
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(
          standardFaviconUrl
        )}`;

        // Test if the standard favicon exists
        const exists = await testFavicon(proxyUrl);

        if (exists) {
          setFavicon(proxyUrl);
        } else {
          // If standard favicon doesn't exist, try to extract from HTML
          const htmlFavicon = await extractFaviconFromHtml(url);
          setFavicon(htmlFavicon);
        }
      } catch (err) {
        //@ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavicon();
  }, [url]);

  const testFavicon = (url: string) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const extractFaviconFromHtml = async (url: string): Promise<string> => {
    try {
      // Use a CORS proxy to fetch the HTML
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const html = await response.text();

      // Parse HTML to find favicon links
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Look for various favicon link patterns
      const iconSelectors = [
        'link[rel="icon"]',
        'link[rel="shortcut icon"]',
        'link[rel="apple-touch-icon"]',
        'link[rel="apple-touch-icon-precomposed"]',
        'link[rel="mask-icon"]',
        'link[rel="fluid-icon"]',
      ];

      let faviconUrl = null;

      for (const selector of iconSelectors) {
        const link = doc.querySelector(selector);
        //@ts-ignore
        if (link && link.href) {
          //@ts-ignore
          faviconUrl = link.href;
          break;
        }
      }

      // If we found a favicon, make sure it's an absolute URL
      if (faviconUrl) {
        try {
          // Handle relative URLs
          if (!faviconUrl.startsWith("http")) {
            const baseUrl = new URL(url).origin;
            faviconUrl = faviconUrl.startsWith("/")
              ? baseUrl + faviconUrl
              : baseUrl + "/" + faviconUrl;
          }

          // Test if this favicon exists
          const exists = await testFavicon(
            `https://corsproxy.io/?${encodeURIComponent(faviconUrl)}`
          );
          if (exists) {
            return `https://corsproxy.io/?${encodeURIComponent(faviconUrl)}`;
          }
        } catch (e) {
          console.error("Error processing favicon URL:", e);
        }
      }

      // If no favicon found, try the Google favicon service as fallback
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (err: any) {
      throw new Error(`Failed to extract favicon from HTML: ${err.message}`);
    }
  };

  return { favicon, loading, error };
};

export default useFavicon;
