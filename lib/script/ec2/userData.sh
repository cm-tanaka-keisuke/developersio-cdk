#!/bin/bash
sudo yum -y install httpd
sudo systemctl enable httpd
sudo systemctl start httpd
