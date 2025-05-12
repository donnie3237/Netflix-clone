#!/bin/bash

cd /netflix

git pull origin main

if ! command -v docker &> /dev/null; then
    echo "Docker ไม่ถูกติดตั้ง. กำลังติดตั้ง Docker..."
    # ติดตั้ง Docker (ถ้ายังไม่ได้ติดตั้ง)
    curl -fsSL https://get.docker.com | bash
    sudo usermod -aG docker $USER
    sudo systemctl enable --now docker
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose ไม่ถูกติดตั้ง. กำลังติดตั้ง Docker Compose..."
    # ติดตั้ง Docker Compose (ถ้ายังไม่ได้ติดตั้ง)
    sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

docker-compose up -d