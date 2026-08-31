# Operating guide

The operating routine is designed for a volunteer who checks the greenhouse at opening and closing.

<a id="daily-check"></a>
## Daily check

1. Confirm the dashboard timestamp is less than two minutes old.
2. Review the current state and its explanation.
3. Compare soil moisture across the three most recent samples.
4. Acknowledge any completed response.
5. Record an observation only when local conditions differ from the sensor data.

## Respond to a state

### Normal

No intervention is required. Continue the scheduled check.

### Watch

Inspect the greenhouse within 30 minutes. Confirm the sensor is unobstructed and compare the reading with a handheld instrument when one is available.

### Act

Follow the response displayed with the alert. Ventilate for high temperature, inspect irrigation for low soil moisture, or check airflow for sustained high humidity. Never bypass a physical safety control.

## Acknowledge an alert

Acknowledgement records that a person saw the alert. It does not change the sensor reading or decision state. Add a short note that states what you observed and what you did.

Good: `Opened roof vent; temperature fell to 27 C within 12 minutes.`

Avoid: `Fixed.`

For the system behavior behind these states, see [Decision states](architecture.md#decision-states).

!!! info "Feature in action: stable cross-reference"
    This source link points to `architecture.md#decision-states`. The file path keeps the link useful in GitHub and other Markdown tools. Zensical rewrites it for the published site. The destination has an explicit `decision-states` anchor, so minor heading edits do not break the reference. The independent validator confirms that both the file and anchor exist before publication.
