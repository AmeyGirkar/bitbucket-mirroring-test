import { invoke } from "@forge/bridge";
import ForgeReconciler, {
  Cell,
  Code,
  Head,
  Link,
  Row,
  StatusLozenge,
  Table,
  Text,
} from "@forge/react";
import React, { useEffect, useState } from "react";
import { RelatedPullRequest } from "../types";
import { StatusLozengeAppearance } from "@forge/react/out/types";

const PrState = ({ state }: { state: string }) => {
  let appearance: StatusLozengeAppearance;
  switch (state) {
    case "OPEN":
      appearance = "inprogress";
      break;
    case "MERGED":
      appearance = "success";
      break;
    case "DECLINED":
      appearance = "removed";
      break;
    default:
      appearance = "default";
  }
  return <StatusLozenge appearance={appearance}>{state}</StatusLozenge>;
};

const App = () => {
  const [relatedPrs, setRelatedPrs] = useState<RelatedPullRequest[]>();

  useEffect(() => {
    invoke("getRelatedPrs").then((res: any) =>
      setRelatedPrs(res as RelatedPullRequest[])
    );
  }, []);

  return relatedPrs ? (
    <>
      {relatedPrs.length > 0 ? (
        <>
          <Text>Here are some related pull requests:</Text>
          <Table>
            <Head>
              <Cell>
                <Text>Title</Text>
              </Cell>
              <Cell>
                <Text>State</Text>
              </Cell>
            </Head>
            {relatedPrs.map((pr) => (
              <Row>
                <Cell>
                  <Text>
                    <Link href={pr.links.html.href}>{pr.title}</Link>
                  </Text>
                </Cell>
                <Cell>
                  <PrState state={pr.state} />
                </Cell>
              </Row>
            ))}
          </Table>
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
