#!/bin/bash

GET 'http://localhost:10000/api/get_cards?chefIds=["ChIJs36LkdvR5zsRqZ1dNN_G34E","ChIJlyN7uN7R5zsRnDNSqIMd2ZI"]' | python3 -m json.tool

