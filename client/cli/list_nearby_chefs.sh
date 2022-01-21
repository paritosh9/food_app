#!/bin/bash

LAT=18.9132656
LNG=72.8227037
GET  "http://localhost:10000/api/list_nearby_chefs?lat=$LAT&lng=$LNG" | python3 -m json.tool

