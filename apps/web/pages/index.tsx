import { Button, Group } from "@mantine/core";
import { Result } from "oxide.ts";
import { useContext, useEffect } from "react";
import { usePromiseHandler } from "../hooks";
import { TrackerContext } from "../providers/TrakerProvider";

export default function Page() {
  const [handleNormalFetch, loadingNormalFetch] = usePromiseHandler(
    async () => {
      const result = await fetch("http://localhost:8080/", {
        method: "POST",
      }).then((response) => response.json());

      console.log(result);
    }
  );

  const [handleCorsHeaderFetch, loadingCorsHeaderFetch] = usePromiseHandler(
    async () => {
      const result = await fetch("http://localhost:8080", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer 123123",
          endpoint: "companyname.riqra.com",
        },
      }).then((response) => response.json());

      console.log(result);
    }
  );

  const [handleCorsHeaderXHRFetch, loadingCorsHeaderXHRFetch] =
    usePromiseHandler(async () => {
      var url = "http://localhost:8080";
      var method = "POST";
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      xhr.onload = function () {
        console.log("onload");
      };

      xhr.onerror = function (error) {
        console.log("onerror", error.target);
      };

      xhr.withCredentials = true;
      xhr.setRequestHeader("endpoint", "companyname.riqra.com");
      xhr.setRequestHeader("authorization", "Bearer abcdefg");
      xhr.send();
    });

  const { initTracker, startTracking } = useContext(TrackerContext);

  useEffect(() => {
    const startOpenReplay = async () => {
      await initTracker();
      startTracking();
    };

    startOpenReplay();
  }, []);

  return (
    <Group position="center" h="100vh">
      <Button onClick={handleNormalFetch} loading={loadingNormalFetch}>
        NormalFetch
      </Button>

      <Button onClick={handleCorsHeaderFetch} loading={loadingCorsHeaderFetch}>
        With cors headers fetch
      </Button>

      <Button
        onClick={handleCorsHeaderXHRFetch}
        loading={loadingCorsHeaderXHRFetch}
      >
        With cors headers XHR
      </Button>
    </Group>
  );
}
