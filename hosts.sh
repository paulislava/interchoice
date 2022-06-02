#!/bin/bash

sudo -- sh -c "echo \"\n\n127.0.0.1 local.interchoice.ru\" >>  /etc/hosts"
sudo service network-manager restart
/bin/systemctl restart systemd-hostnamed
sudo pkill -HUP dnsmasq