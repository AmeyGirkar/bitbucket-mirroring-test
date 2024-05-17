import Resolver from "@forge/resolver";
import { getPullRequest, getRelatedPullRequests, getIssueKeys } from "./utils";
import { RelatedPullRequest, ResolverRequest } from "../types";

const resolver = new Resolver();

resolver.define(
  "getRelatedPrs",
  async (req: any): Promise<RelatedPullRequest[]> => {
    const { context } = req as ResolverRequest;
    const workspaceId = context.workspaceId;
    const repoId = context.extension.repository.uuid;
    const prId = context.extension.pullRequest.id;

    const pr = await getPullRequest(workspaceId, repoId, prId);
    const issueKeys = getIssueKeys(pr.title);
    // Don't query BBC API if there are no issue keys to match.
    return issueKeys.length > 0
      ? getRelatedPullRequests(
          workspaceId,
          repoId,
          prId,
          issueKeys as RegExpMatchArray,
        )
      : [];
  },
);

export const handler = resolver.getDefinitions();
