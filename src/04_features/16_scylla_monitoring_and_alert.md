# Scylla Monitoring Stack

## Installation Guide

For detailed installation steps, please refer to the official Scylla Monitoring Stack installation guide:

[Install Scylla Monitoring Stack](https://monitoring.docs.scylladb.com/stable/install/monitoring-stack.html)

## Installation Steps

1. **Download the monitoring stack:**

```bash
wget https://github.com/scylladb/scylla-monitoring/archive/4.11.0.tar.gz
tar -xvf 4.11.0.tar.gz
cd scylla-monitoring-4.11.0
```

Or clone from Git:

```bash
git clone https://github.com/scylladb/scylla-monitoring.git
cd scylla-monitoring
git checkout branch-4.11
```

## Configure Scylla Cluster Nodes

### 1. Create Scylla Servers Configuration

Create the file `prometheus/scylla_servers.yml`:

```yaml
- targets:
    - 172.17.0.2
    - 172.17.0.3
  labels:
    cluster: cluster1
    dc: dc1
```

## Start Monitoring Stack

### Basic Start

```bash
./start-all.sh -d prometheus_data
```

### With Localhost Access

If Scylla runs on the same host as monitoring:

```bash
./start-all.sh -l -d prometheus_data
```

### Using Scylla Manager Consul API

```bash
./start-all.sh -L 10.10.0.1 -d prometheus_data
```

Replace `10.10.0.1` with your Scylla Manager IP address.

### Multiple Versions

Load dashboards for multiple Scylla versions:

```bash
./start-all.sh -v 2020.1,2019.1 -M 2.1 -d prometheus_data
```

## Stop Monitoring Stack

```bash
./kill-all.sh
```

## Accessing the Monitoring Interfaces

After successfully installing the Scylla Monitoring Stack, you can access the following interfaces:

### Grafana

Access the Grafana dashboard by navigating to:

```
http://<monitoring_server_ip>:3000
```

**Default login credentials:**
- Username: `admin`
- Password: `admin` (you will be prompted to change this upon first login)

### Prometheus

Access the Prometheus web interface at:

```
http://<monitoring_server_ip>:9090
```

Edit this file `prometheus/prom_rules/prometheus.rules.yml` to change rules for alert.

### Alertmanager

Access the Alertmanager interface at:

```
http://<monitoring_server_ip>:9093
```

Edit this file `prometheus/rule_config.yml` to setup email config.

Example

```yaml
global:
  smtp_smarthost: 'smtp.example.com:587'      # Replace with your SMTP server
  smtp_from: 'alerts@example.com'            # Replace with sender email
  smtp_auth_username: 'username@example.com' # Replace with SMTP username
  smtp_auth_password: 'yourpassword'         # Replace with SMTP password
  smtp_require_tls: true

route:
  receiver: 'email-alert'
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 30s
  repeat_interval: 1h

receivers:
  - name: 'email-alert'
    email_configs:
      - to: 'user@example.com'   # Replace with recipient email
        send_resolved: true
```
