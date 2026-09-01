(() => {
  const container = document.querySelector("#test-results");
  if (!container) return;

  const repository = "SignalPocket/greenhouse-sentinel-docs";
  const workflowUrl = `https://github.com/${repository}/actions/workflows/docs.yml`;
  const runsApi = `https://api.github.com/repos/${repository}/actions/workflows/docs.yml/runs?branch=main&status=completed&per_page=1`;

  const label = (value) => value ? value.replaceAll("_", " ") : "unknown";

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const link = (text, href) => {
    const node = element("a", "", text);
    node.href = href;
    return node;
  };

  const renderError = () => {
    container.replaceChildren(
      element("p", "", "Live results are temporarily unavailable. "),
      link("View the latest workflow run on GitHub.", workflowUrl)
    );
    container.setAttribute("aria-busy", "false");
  };

  fetch(runsApi, { headers: { Accept: "application/vnd.github+json" } })
    .then((response) => {
      if (!response.ok) throw new Error("Unable to load workflow runs");
      return response.json();
    })
    .then(async ({ workflow_runs: runs }) => {
      const run = runs?.[0];
      if (!run) throw new Error("No completed workflow run found");

      const jobsResponse = await fetch(run.jobs_url, {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!jobsResponse.ok) throw new Error("Unable to load workflow jobs");
      const { jobs = [] } = await jobsResponse.json();

      const summary = element("section", "test-results__summary");
      summary.append(
        element("p", `test-status test-status--${run.conclusion}`,
          `Overall result: ${label(run.conclusion)}`),
        element("h2", "", run.display_title || "Docs checks")
      );

      const details = element("dl", "test-results__details");
      const fields = [
        ["Completed", new Date(run.updated_at).toLocaleString()],
        ["Branch", run.head_branch],
        ["Commit", run.head_sha.slice(0, 7)]
      ];
      for (const [term, value] of fields) {
        details.append(element("dt", "", term), element("dd", "", value));
      }
      const runItem = element("dd");
      runItem.append(link(`Run #${run.run_number}`, run.html_url));
      details.append(element("dt", "", "Workflow"), runItem);
      summary.append(details);

      const heading = element("h2", "", "Job results");
      const list = element("ul", "test-results__jobs");
      for (const job of jobs) {
        const item = element("li", "test-results__job");
        item.append(
          element("span", "test-results__job-name", job.name),
          element("span", `test-status test-status--${job.conclusion}`,
            label(job.conclusion))
        );
        list.append(item);
      }

      container.replaceChildren(summary, heading, list);
      container.setAttribute("aria-busy", "false");
    })
    .catch(renderError);
})();
