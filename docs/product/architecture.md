# Architecture

Greenhouse Sentinel separates measurement, evaluation, presentation, and response guidance so each part can be tested and explained independently.

<a id="system-boundary"></a>
## System Boundary

The hub receives local sensor readings and produces a recommendation. It does not operate pumps, vents, heaters, locks, or other physical equipment. A person remains responsible for any physical action.

```text
Sensors -> sample normalizer -> rule engine -> local event store -> dashboard
                                  |
                                  +-> response guidance
```

## Components

- **Sample normalizer:** converts each supported sensor value to a consistent unit and marks stale data.
- **Rule engine:** evaluates the most recent valid samples against versioned thresholds.
- **Event store:** retains 30 days of readings, state changes, and acknowledgements on the hub.
- **Dashboard:** presents current conditions, recent trends, and the reason for the current state.

<a id="decision-states"></a>
## Decision States

The engine assigns one of three states after three consecutive samples meet the same condition.

| State | Example condition | Operator expectation |
| --- | --- | --- |
| Normal | All readings are inside target ranges | Continue scheduled checks |
| Watch | One reading is near a threshold | Inspect within 30 minutes |
| Act | One reading exceeds a threshold | Follow the displayed response |

!!! info "Feature in action: portable table"
    This is a semantic Markdown table because the content has repeated, comparable fields. Zensical renders it responsively. The export script maps it to a real Word table with a header row. Ordinary explanatory prose remains outside tables for readability and accessibility.

The three-sample rule reduces noise without hiding sustained change. Thresholds in this demo are illustrative, not horticultural advice.

<a id="data-retention"></a>
## Data Retention

The hub stores 30 days of samples and event history. An export contains timestamps, normalized readings, state transitions, acknowledgements, and the rule-set version. It does not contain names unless an operator voluntarily enters one in a note.

## Failure Behavior

If one sensor becomes stale, the dashboard reports **sensor unavailable** and does not infer a replacement value. The last valid measurement remains visible with its timestamp. See [Troubleshooting](troubleshooting.md#a-sensor-reports-no-data).
