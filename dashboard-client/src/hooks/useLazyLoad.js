import { useCallback, useEffect, useState } from "react";

export function useLazyLoad(callback) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function callCallback() {
      const res = await callback();
      if ((res?.status && res?.status >= 400) || res?.data?.length === 0)
        removeScrollLazyLoad();
    }
    if (data.length) callCallback();
  }, [loader]);

  const listener = useCallback(() => {
    if (
      document.body.clientHeight <=
      document.documentElement.clientHeight + window.pageYOffset + 500
    )
      setLoader(true);
  }, []);

  const scrollLazyLoad = () => window.addEventListener("scroll", listener);

  const removeScrollLazyLoad = () =>
    window.removeEventListener("scroll", listener);

  useEffect(() => {
    scrollLazyLoad();
    callback();
  }, []);

  return [loader, setLoader, data, setData];
}
