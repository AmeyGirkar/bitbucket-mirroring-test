import { invoke } from "@forge/bridge";
import ForgeReconciler, {
  Link,
  Lozenge,
  Text,
  DynamicTable,
} from "@forge/react";
import React, { useEffect, useState } from "react";
import { RelatedPullRequest } from "../types";

const prStateAppearance = (state: string) => {
  switch (state) {
    case "OPEN":
      return "inprogress";
    case "MERGED":
      return "success";
    case "DECLINED":
      return "removed";
    default:
      return "default";
  }
};

const App = () => {
  const [relatedPrs, setRelatedPrs] = useState<RelatedPullRequest[]>();

  useEffect(() => {
    invoke("getRelatedPrs").then((res: any) =>
      setRelatedPrs(res as RelatedPullRequest[])
    );
  }, []);

  const head = {
    cells: [
      {
        key: "title",
        content: "Title",
      },
      {
        key: "state",
        content: "State",
      },
    ],
  };

  return relatedPrs ? (
    <>
      {relatedPrs.length > 0 ? (
        <>
          <Text>Here are some related pull requests:</Text>
          <DynamicTable
            head={head}
            rows={relatedPrs.map((pr) => ({
              key: `${pr.id}`,
              cells: [
                {
                  key: `${pr.id}-title`,
                  content: <Link href={pr.links.html.href}>{pr.title}</Link>,
                },
                {
                  key: `${pr.id}-state`,
                  content: (
                    <Lozenge appearance={prStateAppearance(pr.state)}>
                      {pr.state}
                    </Lozenge>
                  ),
                },
              ],
            }))}
          />
        </>
      ) : (
        <Text>No related pull requests</Text>
      )}
    </>
  ) : (
    <Text>Finding related pull requests...</Text>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
