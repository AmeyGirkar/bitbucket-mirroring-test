export type ResolverContext = {
  extension: {
    pullRequest: {
      id: number;
    };
    repository: {
      uuid: string;
    };
  };
  installContext: string;
  workspaceId: string;
};

export type ResolverRequest = {
  payload: { [key: string]: any };
  context: ResolverContext;
};

export type PullRequest = {
  title: string;
};

export type RelatedPullRequest = {
  id: number;
  title: string;
  state: string;
  links: {
    html: {
      href: string;
    };
  };
};

export type PullRequestList = {
  values: RelatedPullRequest[];
  next: string | undefined;
};
