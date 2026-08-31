# Quick start

This walkthrough connects a fictional Sentinel hub and confirms that its three sensors are reporting. No hardware is required; the commands are illustrative.

## Before you begin

You need a Sentinel hub, one temperature and humidity probe, one soil probe, and access to the greenhouse Wi-Fi network.

## Connect and verify

1. Place the hub above the irrigation line and away from direct spray.
2. Connect both probes before applying power.
3. Join the temporary network named `sentinel-setup`.
4. Open `http://sentinel.local` and choose the greenhouse network.
5. Select **Run sensor check**.

A successful check reports all three readings and changes the hub indicator from amber to green.

```text
temperature   24.1 C   ready
humidity      58 %     ready
soil          41 %     ready
```

## Understand the first result

The initial state should be **normal**. The controller waits for three consecutive samples before changing state, which prevents a single noisy reading from creating an alert. See [Decision states](architecture.md#decision-states) for the complete rule.

If a sensor remains unavailable, follow [A sensor reports no data](troubleshooting.md#a-sensor-reports-no-data).

!!! info "Feature in action: task-oriented linking"
    The link text names the reader's problem instead of saying “click here.” The validator rejects common context-free labels and verifies the stable troubleshooting anchor. This makes the reference clearer in the page, a screen reader's links list, Word, and PDF.

## Next step

Continue to the [daily operating routine](operations.md#daily-check).
