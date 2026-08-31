# Troubleshooting

Start with the visible symptom. Preserve timestamps and exact messages when escalating a problem.

<a id="a-sensor-reports-no-data"></a>
## A Sensor Reports No Data

1. Confirm the cable is fully seated and dry.
2. Check whether the dashboard timestamp continues to advance for other sensors.
3. Disconnect power, reconnect the sensor, and restore power.
4. Wait three sampling intervals.

If the sensor is still unavailable, record its port, the last valid timestamp, and the hub status indicator.

## The Dashboard Is Unavailable

Confirm that your device and the hub are on the same network. Then open `http://sentinel.local` in a new browser window. If the page still does not load, restart the hub once and wait two minutes.

## A State Seems Incorrect

Review the three most recent samples and compare them with the [decision-state rule](architecture.md#decision-states). A state can lag a single new reading because Sentinel requires three consecutive samples.

!!! warning
    Troubleshooting the fictional dashboard never overrides physical greenhouse safety procedures.
